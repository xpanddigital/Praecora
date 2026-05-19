import { notFound, redirect } from 'next/navigation'
import { TIERS } from '@/components/marketing/pricing-data'
import { CheckoutClient } from './CheckoutClient'

type Params = { tier: string }
type SearchParams = { ref?: string; email?: string; cycle?: string }

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { tier } = await params
  const found = TIERS.find(t => t.id === tier)
  if (!found) return { title: 'Checkout — Praecora' }
  return {
    title: `Checkout — ${found.name} — Praecora`,
    description: `Reserve your ${found.name} build slot. Pay the onboarding fee today; monthly subscription begins when your accounts go live (~4 weeks).`,
  }
}

export default async function CheckoutTierPage({
  params,
  searchParams,
}: {
  params: Promise<Params>
  searchParams: Promise<SearchParams>
}) {
  const { tier } = await params
  const sp = await searchParams

  const found = TIERS.find(t => t.id === tier)
  if (!found) notFound()

  // Whale is a demo-led sale — never collects payment via /checkout
  if (found.id === 'whale') {
    redirect('/demo?tier=whale')
  }

  return (
    <CheckoutClient
      tier={found}
      initialRef={sp.ref ?? null}
      initialEmail={sp.email ?? null}
      initialCycle={sp.cycle === 'annual' ? 'annual' : 'monthly'}
    />
  )
}
