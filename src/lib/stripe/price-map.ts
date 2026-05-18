import type { Tier } from '@/components/marketing/pricing-data'

export type TierId = Tier['id']
export type BillingCycle = 'monthly' | 'annual'

/**
 * Maps tier → { onboarding, monthly, annual } Stripe Price IDs.
 *
 * Price IDs live in env vars (NOT in pricing-data.ts) so the same code runs
 * against TEST and LIVE Stripe accounts by swapping the env. Run
 * `scripts/setup-stripe-products.ts` to provision Prices in a given account
 * and emit the env var block.
 */
export type TierPriceIds = {
  onboarding: string | undefined
  monthly: string | undefined
  annual: string | undefined
}

export function getPriceIdsForTier(tierId: TierId): TierPriceIds {
  switch (tierId) {
    case 'starter':
      return {
        onboarding: process.env.STRIPE_PRICE_STARTER_ONBOARDING,
        monthly: process.env.STRIPE_PRICE_STARTER_MONTHLY,
        annual: process.env.STRIPE_PRICE_STARTER_ANNUAL,
      }
    case 'growth':
      return {
        onboarding: process.env.STRIPE_PRICE_GROWTH_ONBOARDING,
        monthly: process.env.STRIPE_PRICE_GROWTH_MONTHLY,
        annual: process.env.STRIPE_PRICE_GROWTH_ANNUAL,
      }
    case 'pro':
      return {
        onboarding: process.env.STRIPE_PRICE_PRO_ONBOARDING,
        monthly: process.env.STRIPE_PRICE_PRO_MONTHLY,
        annual: process.env.STRIPE_PRICE_PRO_ANNUAL,
      }
    case 'whale':
      return {
        onboarding: process.env.STRIPE_PRICE_WHALE_ONBOARDING,
        monthly: process.env.STRIPE_PRICE_WHALE_MONTHLY,
        annual: process.env.STRIPE_PRICE_WHALE_ANNUAL,
      }
  }
}

export function requireOnboardingPriceId(tierId: TierId): string {
  const id = getPriceIdsForTier(tierId).onboarding
  if (!id) {
    throw new Error(`Missing STRIPE_PRICE_${tierId.toUpperCase()}_ONBOARDING env var`)
  }
  return id
}

export function requireRecurringPriceId(tierId: TierId, cycle: BillingCycle): string {
  const prices = getPriceIdsForTier(tierId)
  const id = cycle === 'annual' ? prices.annual : prices.monthly
  if (!id) {
    throw new Error(
      `Missing STRIPE_PRICE_${tierId.toUpperCase()}_${cycle.toUpperCase()} env var`
    )
  }
  return id
}
