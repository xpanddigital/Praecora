import Link from 'next/link'
import { ArrowRight, Calendar, Eye, MessageSquare } from 'lucide-react'
import { Eyebrow } from '@/components/marketing/Ornament'
import { HeroVideoPlayer } from '@/components/marketing/HeroVideoPlayer'

export const metadata = {
  title: 'Book a demo — Praecora',
  description:
    'See the platform with a real (anonymized) scout\'s inbox. 20 minutes, no slides.',
}

export default function DemoPage() {
  return (
    <>
      {/* HERO — split layout: text left, video right */}
      <section className="marketing-hero-bg px-4 pt-16 pb-20 md:px-6 md:pt-20 md:pb-24 lg:pt-24">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-12 lg:gap-16">
            {/* LEFT — text */}
            <div className="text-center md:text-left">
              <div className="mb-6 flex justify-center md:justify-start">
                <Eyebrow>Demo</Eyebrow>
              </div>
              <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight text-[#0f0d08] sm:text-5xl md:text-5xl lg:text-6xl">
                See it live. 20 minutes. No slides.
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-balance text-base leading-relaxed text-neutral-600 md:mx-0 md:mt-8 md:text-lg">
                We'll walk through a real (anonymized) scout's inbox so you can see exactly
                what your day-to-day looks like inside Praecora.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:mt-10 md:justify-start">
                <a
                  href="mailto:demo@praecora.com?subject=Praecora%20Demo%20Request"
                  className="cta-primary"
                >
                  Email to schedule <ArrowRight className="h-4 w-4" />
                </a>
                <Link href="/pricing" className="cta-secondary">
                  See pricing first
                </Link>
              </div>
            </div>

            {/* RIGHT — Demo Experience video teaser */}
            <div className="mx-auto w-full max-w-xl md:max-w-none">
              <HeroVideoPlayer
                teaserSrc="/videos/demo-experience-teaser.mp4"
                fullSrc="/videos/demo-experience.mp4"
                posterSrc="/videos/demo-experience-poster.jpg"
                caption="Watch — Before your demo"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-black/5 bg-white px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto w-full max-w-4xl">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Eye,
                title: 'Live platform tour',
                body: 'You see the actual Praecora inbox, AI reply suggestions, and pipeline. Not screenshots.',
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
                <div key={item.title}>
                  <Icon className="h-6 w-6 text-neutral-950" />
                  <h3 className="mt-4 text-base font-semibold text-neutral-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                    {item.body}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CALENDAR PLACEHOLDER */}
      <section className="border-t border-black/5 px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto w-full max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-neutral-950 md:text-4xl">
            Pick a time
          </h2>
          <p className="mt-4 text-sm text-neutral-500">
            (Calendar embed loads here once configured.)
          </p>

          <div className="mx-auto mt-10 max-w-md rounded-xl border border-dashed border-neutral-300 bg-white p-12">
            <Calendar className="mx-auto h-10 w-10 text-neutral-400" />
            <p className="mt-4 text-sm font-medium text-neutral-950">
              Demo booking integration coming soon.
            </p>
            <p className="mt-2 text-xs text-neutral-500">
              In the meantime, email us directly to schedule.
            </p>
            <a
              href="mailto:demo@praecora.com?subject=Praecora%20Demo%20Request"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
            >
              Email to schedule <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-black/5 bg-white px-4 py-16 md:px-6">
        <div className="mx-auto w-full max-w-3xl text-center">
          <p className="text-sm text-neutral-500">Already know what you need?</p>
          <Link
            href="/pricing"
            className="mt-4 inline-flex items-center gap-2 text-base font-medium text-neutral-950 hover:underline"
          >
            Skip the call and pick a tier <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
