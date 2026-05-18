import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'
import { getStripe } from '@/lib/stripe/client'
import { requireRecurringPriceId } from '@/lib/stripe/price-map'
import type { TierId, BillingCycle } from '@/lib/stripe/price-map'
import { logger } from '@/lib/logger'

/**
 * Mark a scout as live → create their Stripe subscription, billing today.
 *
 * Preconditions:
 *   - Caller is an admin
 *   - Scout exists, status='onboarding', has stripe_customer_id, no
 *     existing stripe_subscription_id
 *
 * Effects:
 *   - Creates Stripe Subscription with billing_cycle_anchor=now (charges
 *     immediately AND anchors future monthly/annual cycles to today)
 *   - Updates scout: stripe_subscription_id, subscription_started_at, status='live'
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: scoutId } = await params

  // Auth — must be admin
  const supabaseUser = await createClient()
  const {
    data: { user },
  } = await supabaseUser.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { data: profile } = await supabaseUser
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  if (profile?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const supabase = createServiceClient()
  const { data: scout, error: fetchErr } = await supabase
    .from('scouts')
    .select('id, email, status, stripe_customer_id, stripe_subscription_id, subscription_tier, billing_cycle')
    .eq('id', scoutId)
    .maybeSingle()

  if (fetchErr) {
    logger.error('[Go-Live] scout fetch failed:', fetchErr)
    return NextResponse.json({ error: 'Lookup failed' }, { status: 500 })
  }
  if (!scout) {
    return NextResponse.json({ error: 'Scout not found' }, { status: 404 })
  }
  if (scout.status !== 'onboarding') {
    return NextResponse.json(
      { error: `Scout status is '${scout.status}', expected 'onboarding'` },
      { status: 409 }
    )
  }
  if (!scout.stripe_customer_id) {
    return NextResponse.json(
      { error: 'Scout has no Stripe customer (onboarding may not have completed)' },
      { status: 409 }
    )
  }
  if (scout.stripe_subscription_id) {
    return NextResponse.json(
      { error: 'Subscription already exists for this scout' },
      { status: 409 }
    )
  }

  const priceId = requireRecurringPriceId(
    scout.subscription_tier as TierId,
    scout.billing_cycle as BillingCycle
  )

  try {
    const stripe = getStripe()
    const subscription = await stripe.subscriptions.create({
      customer: scout.stripe_customer_id,
      items: [{ price: priceId }],
      // billing_cycle_anchor=now charges immediately AND anchors future cycles to today.
      // Omitting it would still bill immediately but anchor to the start of next month.
      billing_cycle_anchor: Math.floor(Date.now() / 1000),
      payment_behavior: 'error_if_incomplete',
      proration_behavior: 'none',
      metadata: {
        praecora_scout_id: scout.id,
        praecora_tier: scout.subscription_tier,
        billing_cycle: scout.billing_cycle,
      },
    })

    const now = new Date().toISOString()
    const { error: updErr } = await supabase
      .from('scouts')
      .update({
        stripe_subscription_id: subscription.id,
        subscription_started_at: now,
        status: 'live',
      })
      .eq('id', scout.id)

    if (updErr) {
      logger.error('[Go-Live] scout update failed AFTER subscription create:', {
        scout_id: scout.id,
        subscription_id: subscription.id,
        error: updErr,
      })
      return NextResponse.json(
        {
          error:
            'Subscription created in Stripe but failed to record in DB. Check stripe_subscription_id: ' +
            subscription.id,
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      subscription_id: subscription.id,
      scout_id: scout.id,
    })
  } catch (err: any) {
    logger.error('[Go-Live] Stripe subscription create failed:', err)
    return NextResponse.json(
      { error: err?.message ?? 'Subscription create failed' },
      { status: 500 }
    )
  }
}
