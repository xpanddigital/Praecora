import Link from 'next/link'
import {
  ArrowRight,
  Sparkles,
  Inbox,
  ShieldCheck,
  Calendar,
  CheckCircle2,
} from 'lucide-react'

export const metadata = {
  title: 'How it works — CrateHQ',
  description:
    'A deeper look at how CrateHQ delivers managed Instagram outreach for music catalog scouts.',
}

export default function HowItWorksPage() {
  return (
    <>
      <section className="border-b border-border/40 px-4 pt-16 pb-12 md:px-6 md:pt-24 md:pb-16">
        <div className="mx-auto w-full max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            How it works
          </p>
          <h1 className="font-[var(--font-heading)] text-5xl italic leading-tight md:text-6xl">
            What happens after you sign up.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            From the day you pay onboarding to the day your first deal closes — here's
            exactly what you can expect, and on what timeline.
          </p>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto w-full max-w-4xl">
          <div className="relative space-y-12 border-l-2 border-primary/30 pl-8">
            {[
              {
                week: 'Day 0',
                title: 'You pay onboarding',
                body: 'Pick your tier, complete the brief intake, pay onboarding fee. We confirm receipt within minutes and your build slot is reserved.',
                icon: CheckCircle2,
              },
              {
                week: 'Week 1',
                title: 'Account preparation begins',
                body: 'We provision your dedicated outreach presence, configure your AI voice from your inputs, and begin the 21-day account preparation that protects your accounts long-term.',
                icon: ShieldCheck,
              },
              {
                week: 'Week 2',
                title: 'Brand identity + content seed',
                body: 'Your AI voice is tuned. Your initial content is generated and queued. The infrastructure that supports your outreach is built and tested.',
                icon: Sparkles,
              },
              {
                week: 'Week 3',
                title: 'Onboarding wrap-up',
                body: 'Final account warm-up. Quality checks. Your CrateHQ inbox is set up and ready. You receive credentials + a recorded walkthrough of your dashboard.',
                icon: Calendar,
              },
              {
                week: 'Week 4',
                title: 'Outreach goes live',
                body: 'Your first cold DMs go out. Your monthly subscription begins billing today. Replies start landing in your CrateHQ inbox within hours.',
                icon: Inbox,
              },
              {
                week: 'Week 5+',
                title: 'Your daily rhythm',
                body: '~30 min/day in CrateHQ — review AI-classified replies, send AI-suggested responses, book calls. The outreach engine runs on its own.',
                icon: Inbox,
              },
            ].map((step, i) => {
              const Icon = step.icon
              return (
                <div key={i} className="relative">
                  <div className="absolute -left-[42px] flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="font-mono text-xs uppercase tracking-wider text-primary">
                    {step.week}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* WHAT YOU OWN */}
      <section className="border-t border-border/40 bg-card/20 px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto w-full max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Ownership
          </p>
          <h2 className="font-[var(--font-heading)] text-4xl italic md:text-5xl">
            What you own. What we manage.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                You own
              </p>
              <ul className="mt-4 space-y-3 text-sm text-foreground">
                {[
                  'Your AI voice configuration',
                  'Your contact database',
                  'Your conversation history',
                  'Your deal pipeline data',
                  'All content generated for your personas',
                  'Full export rights at any time',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-border/40 bg-card p-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                We manage
              </p>
              <ul className="mt-4 space-y-3 text-sm text-foreground">
                {[
                  'Account preparation + safety',
                  'AI prompting + tuning',
                  'Outreach delivery infrastructure',
                  'Daily account hygiene',
                  'Reply routing into your inbox',
                  'Replacement accounts if needed',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/40 px-4 py-24 md:px-6">
        <div className="mx-auto w-full max-w-3xl text-center">
          <h2 className="font-[var(--font-heading)] text-4xl italic md:text-5xl">
            Ready to start?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Pick a tier or book a demo. Your outreach goes live in ~4 weeks either way.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              See pricing <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent/10"
            >
              Book a 20-min demo
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
