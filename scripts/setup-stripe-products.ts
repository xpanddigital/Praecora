#!/usr/bin/env npx ts-node
/**
 * Provision Stripe Products + Prices for Praecora's 4 tiers.
 *
 * For each tier, creates ONE Product (so all three prices roll up into one
 * "Starter" / "Growth" / "Pro" / "Whale" line in your Stripe dashboard) and
 * THREE Prices: onboarding (one-time), monthly (recurring), annual (recurring).
 *
 * Idempotent: looks up Products by `metadata.praecora_tier` first; if found,
 * skips creation and reuses. Re-runnable.
 *
 * Usage:
 *   STRIPE_SECRET_KEY=sk_test_... npx ts-node scripts/setup-stripe-products.ts
 *
 * Output: prints a block of env vars to paste into .env.local (or Vercel).
 *
 * Source of truth for amounts: src/components/marketing/pricing-data.ts.
 * This script will throw if those numbers ever change without a re-run.
 */

import Stripe from 'stripe'
import { TIERS } from '../src/components/marketing/pricing-data'

const stripeKey = process.env.STRIPE_SECRET_KEY
if (!stripeKey) {
  console.error('STRIPE_SECRET_KEY is required')
  process.exit(1)
}
if (!stripeKey.startsWith('sk_test_') && !stripeKey.startsWith('sk_live_')) {
  console.error('STRIPE_SECRET_KEY does not look like a Stripe secret key')
  process.exit(1)
}

const stripe = new Stripe(stripeKey, {
  apiVersion: '2026-04-22.dahlia',
  typescript: true,
})

const MODE = stripeKey.startsWith('sk_live_') ? 'LIVE' : 'TEST'

type PriceKind = 'onboarding' | 'monthly' | 'annual'
type PriceResult = { kind: PriceKind; tier: string; priceId: string; amount: number }

async function findExistingProduct(tierId: string): Promise<Stripe.Product | null> {
  // Stripe Products don't have a metadata index, so we list and filter.
  // 4 tiers × at-most-a-few-runs = small enough to scan.
  const list = await stripe.products.list({ active: true, limit: 100 })
  return list.data.find(p => p.metadata.praecora_tier === tierId) ?? null
}

async function findExistingPrice(
  productId: string,
  kind: PriceKind,
  expectedAmount: number,
  recurring: { interval: 'month' | 'year' } | null
): Promise<Stripe.Price | null> {
  const list = await stripe.prices.list({ product: productId, active: true, limit: 100 })
  return (
    list.data.find(p => {
      if (p.metadata.praecora_kind !== kind) return false
      if (p.unit_amount !== expectedAmount * 100) return false
      if (recurring && (!p.recurring || p.recurring.interval !== recurring.interval)) return false
      if (!recurring && p.recurring) return false
      return true
    }) ?? null
  )
}

async function provisionTier(tier: typeof TIERS[number]): Promise<PriceResult[]> {
  console.log(`\n--- ${tier.name} (${tier.id}) ---`)

  let product = await findExistingProduct(tier.id)
  if (product) {
    console.log(`  Product exists: ${product.id}`)
  } else {
    product = await stripe.products.create({
      name: `Praecora ${tier.name}`,
      description: tier.bestFor,
      metadata: {
        praecora_tier: tier.id,
        ig_accounts: String(tier.igAccounts),
      },
    })
    console.log(`  Product created: ${product.id}`)
  }

  const results: PriceResult[] = []

  const specs: Array<{
    kind: PriceKind
    amount: number
    recurring: { interval: 'month' | 'year' } | null
    nickname: string
  }> = [
    {
      kind: 'onboarding',
      amount: tier.onboarding,
      recurring: null,
      nickname: `${tier.name} Onboarding (one-time)`,
    },
    {
      kind: 'monthly',
      amount: tier.monthly,
      recurring: { interval: 'month' },
      nickname: `${tier.name} Monthly`,
    },
    {
      kind: 'annual',
      amount: tier.annual,
      recurring: { interval: 'year' },
      nickname: `${tier.name} Annual`,
    },
  ]

  for (const spec of specs) {
    let price = await findExistingPrice(product.id, spec.kind, spec.amount, spec.recurring)
    if (price) {
      console.log(`  ${spec.kind.padEnd(11)} exists  $${spec.amount.toLocaleString().padStart(7)} — ${price.id}`)
    } else {
      price = await stripe.prices.create({
        product: product.id,
        currency: 'usd',
        unit_amount: spec.amount * 100,
        nickname: spec.nickname,
        ...(spec.recurring ? { recurring: spec.recurring } : {}),
        metadata: {
          praecora_tier: tier.id,
          praecora_kind: spec.kind,
        },
      })
      console.log(`  ${spec.kind.padEnd(11)} created $${spec.amount.toLocaleString().padStart(7)} — ${price.id}`)
    }
    results.push({ kind: spec.kind, tier: tier.id, priceId: price.id, amount: spec.amount })
  }

  return results
}

async function main() {
  console.log(`Provisioning Stripe Products + Prices in ${MODE} mode…`)

  const all: PriceResult[] = []
  for (const tier of TIERS) {
    const tierResults = await provisionTier(tier)
    all.push(...tierResults)
  }

  // Emit env var block
  console.log('\n\n=== Paste into .env.local (or Vercel project env) ===\n')
  for (const r of all) {
    const varName = `STRIPE_PRICE_${r.tier.toUpperCase()}_${r.kind.toUpperCase()}`
    console.log(`${varName}=${r.priceId}`)
  }
  console.log('\nDone.')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
