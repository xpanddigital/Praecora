import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe/client'
import { requireOnboardingPriceId } from '@/lib/stripe/price-map'
import { TIERS } from '@/components/marketing/pricing-data'
import { logger } from '@/lib/logger'

/**
 * Create a Stripe Checkout session for the one-time onboarding fee.
 *
 * Mode is `payment`, NOT `subscription` — the recurring subscription is
 * created later by POST /api/admin/scouts/[id]/go-live when ops marks the
 * scout as live (~4 weeks after onboarding).
 *
 * The chosen billing_cycle is stored in session metadata so the go-live
 * step knows which recurring Price ID to attach.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const tierId = body.tier as string | undefined
    const billingCycle = body.billing_cycle as string | undefined
    const ref = (body.ref as string | null | undefined) ?? null
    const email = (body.email as string | undefined) ?? undefined

    const tier = TIERS.find(t => t.id === tierId)
    if (!tier) {
      return NextResponse.json({ error: 'Unknown tier' }, { status: 400 })
    }
    if (tier.id === 'whale') {
      return NextResponse.json(
        { error: 'Whale is demo-led — not available via self-serve checkout' },
        { status: 400 }
      )
    }
    if (billingCycle !== 'monthly' && billingCycle !== 'annual') {
      return NextResponse.json({ error: 'Invalid billing_cycle' }, { status: 400 })
    }

    const priceId = requireOnboardingPriceId(tier.id)

    const stripe = getStripe()
    const origin = request.nextUrl.origin

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
      customer_creation: 'always',
      customer_email: email,
      allow_promotion_codes: true,
      metadata: {
        praecora_tier: tier.id,
        billing_cycle: billingCycle,
        ref: ref ?? '',
      },
      payment_intent_data: {
        // Mirror to PI for accountancy / Stripe reports
        metadata: {
          praecora_tier: tier.id,
          billing_cycle: billingCycle,
          ref: ref ?? '',
          kind: 'onboarding',
        },
        description: `Praecora ${tier.name} onboarding`,
      },
    })

    return NextResponse.json({ url: session.url, session_id: session.id })
  } catch (err: any) {
    logger.error('[Checkout] create-session failed:', err)
    return NextResponse.json(
      { error: err?.message ?? 'Checkout session failed' },
      { status: 500 }
    )
  }
}
