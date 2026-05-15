import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export const metadata = {
  title: 'How it works — CrateHQ',
  description:
    'A deeper look at how CrateHQ delivers managed Instagram and email outreach for music catalog scouts.',
}

const TIMELINE = [
  {
    week: 'Day 0',
    title: 'You pay onboarding',
    body: 'Pick your tier, complete the brief intake, pay onboarding fee. We confirm receipt within minutes and your build slot is reserved.',
  },
  {
    week: 'Week 1',
    title: 'Account preparation begins',
    body: 'We provision your dedicated outreach presence across both Instagram and email, configure your AI voice from your inputs, and begin the 21-day account preparation that protects your accounts long-term.',
  },
  {
    week: 'Week 2',
    title: 'Brand identity + content seed',
    body: 'Your AI voice is tuned. Your initial content is generated and queued. Your email sender domains are warming up. The infrastructure that supports your outreach is built and tested.',
  },
  {
    week: 'Week 3',
    title: 'Onboarding wrap-up',
    body: 'Final account warm-up. Quality checks across IG and email. Your CrateHQ inbox is set up and ready. You receive credentials + a recorded walkthrough of your dashboard.',
  },
  {
    week: 'Week 4',
    title: 'Outreach goes live',
    body: 'Your first cold DMs and emails go out. Your monthly subscription begins billing today. Replies start landing in your CrateHQ inbox within hours.',
  },
  {
    week: 'Week 5+',
    title: 'Your daily rhythm',
    body: '~30 min/day in CrateHQ — review AI-classified replies, send AI-suggested responses, book calls. The outreach engine runs on its own.',
  },
]

export default function HowItWorksPage() {
  return (
    <>
      <section className="marketing-hero-bg px-4 pt-20 pb-12 md:px-6 md:pt-28 md:pb-16">
        <div className="mx-auto w-full max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            How it works
          </p>
          <h1 className="text-balance text-5xl font-bold tracking-tight text-neutral-950 md:text-7xl">
            What happens after you sign up.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-600">
            From the day you pay onboarding to the day your first deal closes — here's
            exactly what you can expect, and on what timeline.
          </p>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="border-t border-black/5 bg-white px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto w-full max-w-3xl">
          <div className="space-y-12">
            {TIMELINE.map((step) => (
              <div
                key={step.week}
                className="grid grid-cols-[100px_1fr] gap-6 md:grid-cols-[140px_1fr] md:gap-12"
              >
                <div className="font-mono text-sm uppercase tracking-wider text-neutral-500">
                  {step.week}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-neutral-950">{step.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-neutral-600">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OWNERSHIP */}
      <section className="border-t border-black/5 px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto w-full max-w-4xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Ownership
          </p>
          <h2 className="text-balance text-4xl font-bold tracking-tight text-neutral-950 md:text-5xl">
            What you own. What we manage.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-neutral-950 bg-white p-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-neutral-950">
                You own
              </p>
              <ul className="mt-6 space-y-3 text-sm text-neutral-700">
                {[
                  'Your AI voice configuration',
                  'Your contact database',
                  'Your conversation history',
                  'Your deal pipeline data',
                  'All content generated for your personas',
                  'Full export rights at any time',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-neutral-950" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-black/10 bg-white p-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
                We manage
              </p>
              <ul className="mt-6 space-y-3 text-sm text-neutral-700">
                {[
                  'Account preparation + safety',
                  'Email sender domains + warm-up',
                  'AI prompting + tuning',
                  'Outreach delivery infrastructure',
                  'Daily account hygiene',
                  'Reply routing into your inbox',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-neutral-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-black/5 bg-white px-4 py-24 md:px-6">
        <div className="mx-auto w-full max-w-3xl text-center">
          <h2 className="text-balance text-4xl font-bold tracking-tight text-neutral-950 md:text-5xl">
            Ready to start?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-neutral-600">
            Pick a tier or book a demo. Your outreach goes live in ~4 weeks either way.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-lg bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
            >
              See pricing <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition-colors hover:bg-neutral-50"
            >
              Book a 20-min demo
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
