import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { PricingTable, TIERS } from '@/components/marketing/PricingTable'

export const metadata = {
  title: 'Pricing — CrateHQ',
  description:
    'Four tiers of done-for-you Instagram outreach for music catalog scouts. Pay onboarding upfront, monthly subscription begins when services go live.',
}

export default function PricingPage() {
  return (
    <>
      {/* HERO */}
      <section className="border-b border-border/40 px-4 pt-16 pb-12 md:px-6 md:pt-24 md:pb-16">
        <div className="mx-auto w-full max-w-4xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Pricing
          </p>
          <h1 className="font-[var(--font-heading)] text-5xl italic leading-tight md:text-6xl">
            Pick your volume.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Four tiers, scaled by outreach volume. Same platform, same AI, same managed
            delivery — just more of it as you grow.
          </p>

          <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-4 rounded-xl border border-border/40 bg-card p-6 text-left sm:flex-row sm:items-start">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Check className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">
                Onboarding now, subscription later.
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Pay your one-time onboarding fee at signup. Your monthly subscription
                doesn't begin billing until your outreach is live (~4 weeks). You're never
                paying for service you haven't received.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING TABLE */}
      <section className="px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto w-full max-w-7xl">
          <PricingTable />
        </div>
      </section>

      {/* ANNUAL ANCHOR */}
      <section
        id="annual"
        className="border-t border-border/40 bg-card/20 px-4 py-20 md:px-6 md:py-24"
      >
        <div className="mx-auto w-full max-w-5xl">
          <div className="text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Annual prepay
            </p>
            <h2 className="font-[var(--font-heading)] text-4xl italic md:text-5xl">
              Pay yearly, save 2 months.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Same product, same volume, same support — billed yearly with a meaningful
              discount.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {TIERS.map((t) => {
              const monthlyTotal = t.monthly * 12
              const savings = monthlyTotal - t.annual
              return (
                <div
                  key={t.id}
                  className={`rounded-xl border p-6 ${
                    t.highlight
                      ? 'border-primary/40 bg-primary/5'
                      : 'border-border/40 bg-card'
                  }`}
                >
                  <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    {t.name}
                  </p>
                  <p className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
                    ${t.annual.toLocaleString()}
                    <span className="text-sm font-normal text-muted-foreground">/yr</span>
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    vs ${monthlyTotal.toLocaleString()} billed monthly
                  </p>
                  <p className="mt-4 inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                    Save ${savings.toLocaleString()}/yr
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ MINI */}
      <section className="border-t border-border/40 px-4 py-20 md:px-6 md:py-24">
        <div className="mx-auto w-full max-w-3xl">
          <h2 className="font-[var(--font-heading)] text-3xl italic md:text-4xl">
            Common pricing questions
          </h2>

          <div className="mt-10 space-y-6">
            {[
              {
                q: 'Why is there an onboarding fee?',
                a: 'The first 4 weeks are real work — provisioning your dedicated outreach presence, configuring your AI voice, preparing your accounts for safe operation, and seeding your initial content. The onboarding fee covers that work. Charging it upfront also keeps both sides committed.',
              },
              {
                q: 'When does the monthly subscription start?',
                a: 'The day your outreach goes live — typically ~4 weeks after onboarding payment. You\'ll get an email confirmation when billing begins, and your card is charged from that date forward.',
              },
              {
                q: 'Can I cancel anytime?',
                a: 'Yes. Month-to-month, no long-term contracts. Cancel any time and we hand off the assets we\'ve built for you.',
              },
              {
                q: 'Can I upgrade or downgrade tiers?',
                a: 'Yes. Upgrading is instant — you pick up additional personas at next billing cycle. Downgrading takes effect at your next renewal so you don\'t lose paid-for capacity.',
              },
              {
                q: 'Do you offer refunds?',
                a: 'The onboarding fee is non-refundable since it covers real labor delivered. Monthly subscription is month-to-month — cancel any time. We\'d rather lose a customer than fight over a refund.',
              },
              {
                q: 'How do I pick the right tier?',
                a: 'If you\'re testing whether IG outreach works for you, start with Starter. If you\'re already producing deals and want to scale, Growth or Pro is right. Whale is for scouts running serious volume with team support. You can upgrade as you grow.',
              },
            ].map((item) => (
              <div key={item.q} className="border-b border-border/40 pb-6 last:border-0">
                <p className="font-semibold text-foreground">{item.q}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              See all FAQs <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/40 px-4 py-24 md:px-6">
        <div className="mx-auto w-full max-w-3xl text-center">
          <h2 className="font-[var(--font-heading)] text-4xl italic md:text-5xl">
            Still deciding?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Book a 20-minute call with us. We'll walk through the platform with a real
            (anonymized) scout's inbox so you can see what your day looks like.
          </p>
          <div className="mt-10">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Book a 20-min demo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
