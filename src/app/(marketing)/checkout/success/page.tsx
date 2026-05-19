import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { Eyebrow } from '@/components/marketing/Ornament'
import { getStripe } from '@/lib/stripe/client'

export const metadata = {
  title: 'Welcome — Praecora',
  description: 'Your build slot is reserved.',
}

const WEEKS = [
  { n: 'Week 1', title: 'Account provisioning', body: 'Cloud phones spun up, alias FB persona created, Business Portfolio warming begins.' },
  { n: 'Week 2', title: 'Voice tuning', body: 'Your AI voice profile gets calibrated to your niche. Content batch generated and approved.' },
  { n: 'Week 3', title: 'QA + warm-up', body: 'IG aliases attached to GHL, 7-day warm-up runs in parallel. Final checks before send.' },
  { n: 'Week 4', title: 'Outreach goes live', body: 'First cold openers go out. Monthly subscription begins billing from this date.' },
]

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id } = await searchParams

  let paid = false
  let tier: string | null = null
  let customerEmail: string | null = null
  let lookupError: string | null = null

  if (session_id) {
    try {
      const stripe = getStripe()
      const session = await stripe.checkout.sessions.retrieve(session_id)
      paid = session.payment_status === 'paid'
      tier = (session.metadata?.praecora_tier as string | undefined) ?? null
      customerEmail = session.customer_details?.email ?? null
    } catch (err: any) {
      lookupError = err?.message ?? 'Could not verify your payment.'
    }
  } else {
    lookupError = 'Missing session reference.'
  }

  if (!paid) {
    return (
      <section className="marketing-hero-bg px-4 pt-24 pb-32 md:px-6 md:pt-32">
        <div className="mx-auto w-full max-w-2xl text-center">
          <div className="mb-6 flex justify-center">
            <Eyebrow>Checkout</Eyebrow>
          </div>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-[#0f0d08] md:text-5xl">
            Something went wrong.
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-base text-neutral-600">
            We couldn't verify your payment.{' '}
            {lookupError ? <span className="text-neutral-500">({lookupError})</span> : null}
            {' '}If you've been charged, email{' '}
            <a href="mailto:joel@xpanddigital.io" className="underline">
              joel@xpanddigital.io
            </a>{' '}
            and we'll sort it manually.
          </p>
          <div className="mt-8">
            <Link href="/pricing" className="cta-secondary">
              Back to pricing
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      {/* HERO */}
      <section className="marketing-hero-bg px-4 pt-20 pb-12 md:px-6 md:pt-28 md:pb-16">
        <div className="mx-auto w-full max-w-3xl text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e8ff47]">
              <Check className="h-6 w-6 text-neutral-950" />
            </div>
          </div>
          <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight text-[#0f0d08] md:text-5xl">
            Welcome. Your build slot is reserved.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-neutral-600 md:text-lg">
            We'll email{' '}
            {customerEmail ? <strong>{customerEmail}</strong> : 'you'} within 24 hours
            to kick off your 4-week prep. Your monthly subscription doesn't start
            billing until your outreach goes live.
          </p>
          {tier ? (
            <p className="mt-4 text-xs uppercase tracking-wider text-neutral-500">
              Tier reserved: <strong>{tier}</strong>
            </p>
          ) : null}
        </div>
      </section>

      {/* 4-WEEK TIMELINE */}
      <section className="border-t border-black/5 bg-white px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto w-full max-w-5xl">
          <div className="text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              The next four weeks
            </p>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-neutral-950 md:text-4xl">
              Here's what we're doing.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {WEEKS.map(w => (
              <div
                key={w.n}
                className="rounded-xl border border-black/10 bg-white p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  {w.n}
                </p>
                <p className="mt-3 font-semibold text-neutral-950">{w.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {w.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEXT */}
      <section className="border-t border-black/5 px-4 py-20 md:px-6 md:py-24">
        <div className="mx-auto w-full max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-neutral-950 md:text-4xl">
            What happens next.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-neutral-600">
            You'll get a welcome email today with a short intake form (your niche,
            target artist profile, voice notes). After that, you don't need to do
            anything until we tell you outreach is live.
          </p>
          <div className="mt-10">
            <Link href="/" className="cta-secondary">
              Back to home <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
