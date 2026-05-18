import { NextRequest, NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { getStripe } from '@/lib/stripe/client'
import { createServiceClient } from '@/lib/supabase/service'
import { logger } from '@/lib/logger'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Stripe webhook receiver.
 *
 * Verifies the Stripe-Signature header against STRIPE_WEBHOOK_SECRET, then
 * processes events idempotently. We persist every event in `stripe_events`
 * keyed by event.id; on conflict we treat it as already-processed and
 * ack 200 (Stripe retries on non-200).
 *
 * Events we care about:
 *   - checkout.session.completed   → upsert scout, record onboarding charge
 *   - invoice.payment_succeeded    → record recurring charge
 *   - invoice.payment_failed       → flag scout for follow-up
 *   - customer.subscription.deleted → mark scout cancelled
 *
 * Everything else is logged + acked.
 */
export async function POST(request: NextRequest) {
  const sig = request.headers.get('stripe-signature')
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!sig || !secret) {
    logger.warn('[Stripe Webhook] Missing signature or secret')
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  const rawBody = await request.text()
  let event: Stripe.Event
  try {
    event = getStripe().webhooks.constructEvent(rawBody, sig, secret)
  } catch (err: any) {
    logger.error('[Stripe Webhook] Signature verification failed:', err?.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = createServiceClient()

  // Idempotency: insert event row first. Unique on event_id → duplicate replays no-op.
  const { error: insertErr } = await supabase.from('stripe_events').insert({
    event_id: event.id,
    type: event.type,
    livemode: event.livemode,
    payload: event as unknown as Record<string, unknown>,
  })
  if (insertErr) {
    if (insertErr.code === '23505') {
      // duplicate — already processed
      return NextResponse.json({ received: true, duplicate: true })
    }
    logger.error('[Stripe Webhook] stripe_events insert failed:', insertErr)
    // Fall through and still try to process — but log it.
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event, supabase)
        break
      case 'invoice.payment_succeeded':
        await handleInvoicePaid(event, supabase)
        break
      case 'invoice.payment_failed':
        await handleInvoiceFailed(event, supabase)
        break
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event, supabase)
        break
      default:
        logger.info('[Stripe Webhook] Unhandled event type', { type: event.type })
    }
  } catch (err: any) {
    logger.error('[Stripe Webhook] Handler failed:', err)
    // Persist the error so we can replay manually. Still ack 200 — we don't
    // want Stripe to retry indefinitely if the bug is in our handler.
    await supabase
      .from('stripe_events')
      .update({ error: err?.message ?? String(err) })
      .eq('event_id', event.id)
  }

  return NextResponse.json({ received: true })
}

type ServiceClient = ReturnType<typeof createServiceClient>

async function resolvePartnerId(
  supabase: ServiceClient,
  ref: string | null | undefined
): Promise<string | null> {
  if (!ref) return null
  const slug = ref.trim().toLowerCase()
  if (!slug) return null
  const { data } = await supabase
    .from('partners')
    .select('id, commission_rate')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle()
  return data?.id ?? null
}

async function getPartnerSnapshot(
  supabase: ServiceClient,
  partnerId: string | null
): Promise<{ id: string; rate: number } | null> {
  if (!partnerId) return null
  const { data } = await supabase
    .from('partners')
    .select('id, commission_rate')
    .eq('id', partnerId)
    .maybeSingle()
  if (!data) return null
  return { id: data.id, rate: Number(data.commission_rate) }
}

async function handleCheckoutCompleted(event: Stripe.Event, supabase: ServiceClient) {
  const session = event.data.object as Stripe.Checkout.Session

  // We only care about our onboarding payments (mode=payment). Subscriptions
  // (if we ever flip to mode=subscription) are handled by invoice.* events.
  if (session.mode !== 'payment') {
    logger.info('[Stripe Webhook] checkout.session.completed ignored (non-payment mode)', {
      session_id: session.id,
      mode: session.mode,
    })
    return
  }
  if (session.payment_status !== 'paid') {
    logger.warn('[Stripe Webhook] checkout.session.completed but not paid', {
      session_id: session.id,
      status: session.payment_status,
    })
    return
  }

  const tier = session.metadata?.praecora_tier as string | undefined
  const billingCycle = session.metadata?.billing_cycle as string | undefined
  const ref = (session.metadata?.ref as string | undefined) || null

  if (!tier || !billingCycle) {
    logger.warn('[Stripe Webhook] Session missing metadata', {
      session_id: session.id,
      metadata: session.metadata,
    })
    return
  }
  if (!['starter', 'growth', 'pro', 'whale'].includes(tier)) return
  if (!['monthly', 'annual'].includes(billingCycle)) return

  const customerId =
    typeof session.customer === 'string' ? session.customer : session.customer?.id ?? null
  const email = session.customer_details?.email ?? session.customer_email ?? null
  const fullName = session.customer_details?.name ?? null

  if (!customerId || !email) {
    logger.warn('[Stripe Webhook] Missing customer/email on session', {
      session_id: session.id,
    })
    return
  }

  const partnerId = await resolvePartnerId(supabase, ref)
  const partnerSnapshot = await getPartnerSnapshot(supabase, partnerId)
  const now = new Date().toISOString()

  // Upsert scout by stripe_customer_id
  const { data: scout, error: upsertErr } = await supabase
    .from('scouts')
    .upsert(
      {
        email,
        full_name: fullName,
        stripe_customer_id: customerId,
        subscription_tier: tier,
        billing_cycle: billingCycle,
        status: 'onboarding',
        onboarding_paid_at: now,
        commission_partner_id: partnerId,
        referral_code: ref,
      },
      { onConflict: 'stripe_customer_id' }
    )
    .select('id')
    .single()

  if (upsertErr) {
    logger.error('[Stripe Webhook] scout upsert failed:', upsertErr)
    throw upsertErr
  }

  // Record charge for commission ledger
  const amountTotal = session.amount_total ?? 0
  const piId =
    typeof session.payment_intent === 'string'
      ? session.payment_intent
      : session.payment_intent?.id ?? null

  const { error: chargeErr } = await supabase.from('scout_charges').insert({
    scout_id: scout.id,
    stripe_event_id: event.id,
    stripe_payment_intent_id: piId,
    kind: 'onboarding',
    amount_cents: amountTotal,
    currency: session.currency ?? 'usd',
    occurred_at: now,
    commission_partner_id: partnerSnapshot?.id ?? null,
    commission_rate: partnerSnapshot?.rate ?? null,
  })
  if (chargeErr && chargeErr.code !== '23505') {
    logger.error('[Stripe Webhook] scout_charges insert failed:', chargeErr)
  }

  // Link event to scout for audit
  await supabase
    .from('stripe_events')
    .update({ related_scout_id: scout.id })
    .eq('event_id', event.id)

  logger.info('[Stripe Webhook] Onboarding paid', {
    scout_id: scout.id,
    tier,
    billing_cycle: billingCycle,
    ref,
    amount_cents: amountTotal,
  })
}

async function handleInvoicePaid(event: Stripe.Event, supabase: ServiceClient) {
  const invoice = event.data.object as Stripe.Invoice
  // Only recurring subscription invoices — skip $0 / one-off invoices that don't
  // belong to a subscription.
  // Stripe types use `(invoice as any).subscription` — the field is on the API
  // but not on all SDK type variants.
  const subscriptionId =
    typeof (invoice as any).subscription === 'string'
      ? ((invoice as any).subscription as string)
      : ((invoice as any).subscription?.id as string | undefined) ?? null
  if (!subscriptionId) return

  const customerId =
    typeof invoice.customer === 'string' ? invoice.customer : invoice.customer?.id ?? null
  if (!customerId) return

  const { data: scout } = await supabase
    .from('scouts')
    .select('id, commission_partner_id')
    .eq('stripe_customer_id', customerId)
    .maybeSingle()
  if (!scout) {
    logger.warn('[Stripe Webhook] invoice.payment_succeeded but no matching scout', {
      customer: customerId,
    })
    return
  }

  const partnerSnapshot = await getPartnerSnapshot(supabase, scout.commission_partner_id)

  await supabase.from('scout_charges').insert({
    scout_id: scout.id,
    stripe_event_id: event.id,
    stripe_invoice_id: invoice.id,
    kind: 'subscription',
    amount_cents: invoice.amount_paid ?? 0,
    currency: invoice.currency ?? 'usd',
    occurred_at: new Date().toISOString(),
    commission_partner_id: partnerSnapshot?.id ?? null,
    commission_rate: partnerSnapshot?.rate ?? null,
  })

  await supabase
    .from('stripe_events')
    .update({ related_scout_id: scout.id })
    .eq('event_id', event.id)
}

async function handleInvoiceFailed(event: Stripe.Event, supabase: ServiceClient) {
  const invoice = event.data.object as Stripe.Invoice
  const customerId =
    typeof invoice.customer === 'string' ? invoice.customer : invoice.customer?.id ?? null
  if (!customerId) return
  const { data: scout } = await supabase
    .from('scouts')
    .select('id, email, subscription_tier')
    .eq('stripe_customer_id', customerId)
    .maybeSingle()
  if (!scout) return
  logger.error('[Stripe Webhook] Invoice payment failed', {
    scout_id: scout.id,
    email: scout.email,
    tier: scout.subscription_tier,
    invoice_id: invoice.id,
    amount_due: invoice.amount_due,
  })
  await supabase
    .from('stripe_events')
    .update({ related_scout_id: scout.id })
    .eq('event_id', event.id)
  // Surface alert hook later (Slack / email). For now: logged + audited.
}

async function handleSubscriptionDeleted(event: Stripe.Event, supabase: ServiceClient) {
  const sub = event.data.object as Stripe.Subscription
  const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer?.id ?? null
  if (!customerId) return
  const { data: scout } = await supabase
    .from('scouts')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .maybeSingle()
  if (!scout) return
  await supabase
    .from('scouts')
    .update({ status: 'cancelled', cancelled_at: new Date().toISOString() })
    .eq('id', scout.id)
  await supabase
    .from('stripe_events')
    .update({ related_scout_id: scout.id })
    .eq('event_id', event.id)
}
