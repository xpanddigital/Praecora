'use client'

import { useState } from 'react'
import { ArrowRight, Check, Loader2 } from 'lucide-react'
import { Eyebrow } from '@/components/marketing/Ornament'
import type { Tier } from '@/components/marketing/pricing-data'

type Props = {
  tier: Tier
  initialRef: string | null
  initialEmail: string | null
  initialCycle: 'monthly' | 'annual'
}

export function CheckoutClient({ tier, initialRef, initialEmail, initialCycle }: Props) {
  const [cycle, setCycle] = useState<'monthly' | 'annual'>(initialCycle)
  const [email, setEmail] = useState(initialEmail ?? '')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const annualSavings = tier.monthly * 12 - tier.annual
  const recurringDisplay =
    cycle === 'annual'
      ? `$${tier.annual.toLocaleString()}/yr`
      : `$${tier.monthly.toLocaleString()}/mo`

  async function handleSubmit() {
    setError(null)
    setSubmitting(true)
    try {
      const res = await fetch('/api/checkout/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: tier.id,
          billing_cycle: cycle,
          ref: initialRef,
          email: email.trim() || undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) {
        setError(data.error ?? 'Could not create checkout session.')
        setSubmitting(false)
        return
      }
      window.location.href = data.url
    } catch (err: any) {
      setError(err?.message ?? 'Something went wrong.')
      setSubmitting(false)
    }
  }

  return (
    <>
      {/* HERO */}
      <section className="marketing-hero-bg px-4 pt-20 pb-12 md:px-6 md:pt-24 md:pb-16">
        <div className="mx-auto w-full max-w-3xl text-center">
          <div className="mb-6 flex justify-center">
            <Eyebrow>Checkout</Eyebrow>
          </div>
          <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight text-[#0f0d08] md:text-5xl">
            Reserve your {tier.name} build slot.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-neutral-600 md:text-lg">
            You're paying the <strong>{tier.name} onboarding fee</strong> today.
            Your monthly subscription begins ~4 weeks from now, when your accounts go
            live — we'll email you before any monthly charge.
          </p>
        </div>
      </section>

      {/* CHECKOUT BODY */}
      <section className="border-t border-black/5 bg-white px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto grid w-full max-w-5xl gap-10 md:grid-cols-[1.1fr_1fr]">
          {/* Summary */}
          <div className="rounded-xl border border-black/10 bg-white p-6 md:p-8">
            <div className="flex items-baseline justify-between">
              <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
                {tier.name}
              </p>
              {tier.badge ? (
                <span className="inline-flex items-center rounded-full bg-[#e8ff47] px-2.5 py-0.5 text-xs font-semibold text-neutral-950">
                  {tier.badge}
                </span>
              ) : null}
            </div>

            <p className="mt-4 text-sm text-neutral-600">{tier.bestFor}</p>

            <div className="mt-8 border-t border-black/5 pt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Today
              </p>
              <div className="mt-2 flex items-baseline gap-3">
                <p className="font-mono text-4xl font-medium tracking-tight text-neutral-950">
                  ${tier.onboarding.toLocaleString()}
                </p>
                <p className="font-mono text-lg text-neutral-400 line-through">
                  ${tier.onboardingOriginal.toLocaleString()}
                </p>
              </div>
              <p className="mt-1 text-xs text-neutral-500">
                One-time onboarding fee · founding partner pricing
              </p>
            </div>

            <div className="mt-6 border-t border-black/5 pt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Recurring (begins when live)
              </p>
              <div className="mt-3 inline-flex rounded-lg border border-black/10 bg-neutral-50 p-1">
                <button
                  type="button"
                  onClick={() => setCycle('monthly')}
                  className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                    cycle === 'monthly'
                      ? 'bg-white text-neutral-950 shadow-sm'
                      : 'text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setCycle('annual')}
                  className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                    cycle === 'annual'
                      ? 'bg-white text-neutral-950 shadow-sm'
                      : 'text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  Annual <span className="text-[10px] text-neutral-400">save ${annualSavings.toLocaleString()}</span>
                </button>
              </div>
              <p className="mt-3 font-mono text-2xl tracking-tight text-neutral-950">
                {recurringDisplay}
              </p>
              <p className="mt-1 text-xs text-neutral-500">
                Not charged today. First charge ≈4 weeks after onboarding payment.
              </p>
            </div>

            <div className="mt-8 border-t border-black/5 pt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                What you get
              </p>
              <ul className="mt-4 space-y-3 text-sm text-neutral-700">
                <li className="flex gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-neutral-950" />
                  <span>
                    <strong>{tier.igAccounts}</strong> Instagram alias
                    {tier.igAccounts === 1 ? '' : 'es'} provisioned and warmed
                  </span>
                </li>
                <li className="flex gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-neutral-950" />
                  <span>
                    <strong>{tier.dmsPerDay.toLocaleString()}</strong> DMs/day · {' '}
                    <strong>{tier.emailsPerDay.toLocaleString()}</strong> emails/day
                  </span>
                </li>
                <li className="flex gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-neutral-950" />
                  <span>
                    <strong>{tier.totalTouchesPerMonth.toLocaleString()}</strong> total
                    touches/month
                  </span>
                </li>
                <li className="flex gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-neutral-950" />
                  <span>Unified inbox, AI reply drafting, pipeline tracking</span>
                </li>
                <li className="flex gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-neutral-950" />
                  <span>Expected: {tier.expectedDealsMo} deals/month after ramp</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div>
            <div className="rounded-xl border border-black/10 bg-white p-6 md:p-8">
              <p className="text-sm font-semibold text-neutral-950">
                Pay onboarding fee
              </p>
              <p className="mt-1 text-sm text-neutral-600">
                ${tier.onboarding.toLocaleString()} due today. We'll redirect you to
                Stripe to enter your card.
              </p>

              <label className="mt-6 block text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Email (optional)
              </label>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-2 w-full rounded-lg border border-black/15 bg-white px-3 py-2.5 text-sm text-neutral-950 placeholder:text-neutral-400 focus:border-neutral-950 focus:outline-none"
              />
              <p className="mt-1.5 text-xs text-neutral-500">
                If left blank you can enter it in the next step.
              </p>

              {initialRef ? (
                <div className="mt-4 rounded-lg border border-black/5 bg-neutral-50 px-3 py-2 text-xs text-neutral-600">
                  Referred by <strong className="text-neutral-950">{initialRef}</strong>
                </div>
              ) : null}

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Redirecting…
                  </>
                ) : (
                  <>
                    Pay ${tier.onboarding.toLocaleString()} & start onboarding{' '}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              {error ? (
                <p className="mt-3 text-xs text-red-600">{error}</p>
              ) : null}

              <p className="mt-6 text-xs leading-relaxed text-neutral-500">
                Powered by Stripe. Onboarding fee is non-refundable since it covers
                real labor delivered (account provisioning, voice tuning, warm-up).
                Monthly subscription is month-to-month — cancel anytime once active.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
