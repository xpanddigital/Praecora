import Link from 'next/link'
import { ArrowRight, Calendar, Eye, MessageSquare } from 'lucide-react'

export const metadata = {
  title: 'Book a demo — CrateHQ',
  description:
    'See the platform with a real (anonymized) scout\'s inbox. 20 minutes, no slides.',
}

export default function DemoPage() {
  return (
    <>
      <section className="border-b border-border/40 px-4 pt-16 pb-12 md:px-6 md:pt-24 md:pb-16">
        <div className="mx-auto w-full max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Demo
          </p>
          <h1 className="font-[var(--font-heading)] text-5xl italic leading-tight md:text-6xl">
            See it live. 20 minutes. No slides.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            We'll walk through a real (anonymized) scout's inbox so you can see exactly
            what your day-to-day looks like inside CrateHQ.
          </p>
        </div>
      </section>

      {/* WHAT TO EXPECT */}
      <section className="px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto w-full max-w-4xl">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Eye,
                title: 'Live platform tour',
                body: 'You see the actual CrateHQ inbox, AI reply suggestions, and pipeline. Not screenshots.',
              },
              {
                icon: MessageSquare,
                title: 'Your specific use case',
                body: 'Bring your numbers. We\'ll talk through volume, current pipeline, and which tier makes sense.',
              },
              {
                icon: Calendar,
                title: 'No pressure, no follow-up spam',
                body: 'You decide on the call or email us when ready. We won\'t hound you with sequences.',
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-border/40 bg-card p-6"
                >
                  <Icon className="h-6 w-6 text-primary" />
                  <h3 className="mt-4 text-base font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CALENDAR EMBED PLACEHOLDER */}
      <section className="border-t border-border/40 bg-card/20 px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto w-full max-w-3xl text-center">
          <h2 className="font-[var(--font-heading)] text-3xl italic md:text-4xl">
            Pick a time
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            (Calendar embed loads here once configured.)
          </p>

          <div className="mx-auto mt-10 max-w-md rounded-xl border border-dashed border-border/60 bg-card p-12">
            <Calendar className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="mt-4 text-sm font-medium text-foreground">
              Demo booking integration coming soon.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              In the meantime, email us directly to schedule.
            </p>
            <a
              href="mailto:demo@cratehq.io?subject=CrateHQ%20Demo%20Request"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Email to schedule <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* SECONDARY CTA */}
      <section className="border-t border-border/40 px-4 py-16 md:px-6">
        <div className="mx-auto w-full max-w-3xl text-center">
          <p className="text-sm text-muted-foreground">
            Already know what you need?
          </p>
          <Link
            href="/pricing"
            className="mt-4 inline-flex items-center gap-2 text-base font-medium text-primary hover:underline"
          >
            Skip the call and pick a tier <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
