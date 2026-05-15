import Link from 'next/link'
import { ArrowRight, Instagram, Mail, ShieldCheck, Inbox, Sparkles, TrendingUp } from 'lucide-react'
import { TIERS } from '@/components/marketing/pricing-data'
import { UnifiedInboxMockup } from '@/components/marketing/UnifiedInboxMockup'
import { AiDrafterMockup } from '@/components/marketing/AiDrafterMockup'
import { PipelineMockup } from '@/components/marketing/PipelineMockup'

export const metadata = {
  title: 'CrateHQ — Done-for-you Instagram + email outreach for music catalog scouts',
  description:
    'AI sends the DMs and the emails. Replies route into one inbox. You close the deals. Built for music catalog financing scouts.',
}

export default function MarketingHome() {
  return (
    <>
      {/* HERO */}
      <section className="marketing-hero-bg relative px-4 pt-20 pb-12 md:px-6 md:pt-32 md:pb-16">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              For music catalog financing scouts
            </p>
            <h1 className="text-balance text-5xl font-bold leading-[1.05] tracking-tight text-neutral-950 md:text-7xl">
              We send the DMs.
              <br />
              We send the emails.
              <br />
              <span className="text-neutral-500">You close the deals.</span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-balance text-lg text-neutral-600 md:text-xl">
              Multi-channel outreach for music catalog scouts. Personalized at scale by AI.
              Replies routed into one inbox. You stay focused on the only thing that matters.
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

          {/* Hero product mockup */}
          <div className="mx-auto mt-16 max-w-3xl md:mt-20">
            <UnifiedInboxMockup />
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="border-y border-black/5 bg-white px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto w-full max-w-5xl">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Built for serious volume
          </p>
          <div className="mt-8 grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {[
              { value: '~140', unit: '/day', label: 'Personalized cold DMs' },
              { value: '~500', unit: '/day', label: 'AI-drafted cold emails' },
              { value: '~30', unit: 'min', label: 'Of your time per day' },
              { value: '~4', unit: 'wks', label: 'Signed → first DM' },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-mono text-5xl font-medium tracking-tight text-neutral-950 md:text-6xl">
                  {s.value}
                  <span className="text-2xl text-neutral-400 md:text-3xl">{s.unit}</span>
                </p>
                <p className="mt-3 text-xs uppercase tracking-wider text-neutral-500">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="px-4 py-24 md:px-6 md:py-32">
        <div className="mx-auto w-full max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Why scouts come to us
          </p>
          <h2 className="text-balance text-4xl font-bold tracking-tight text-neutral-950 md:text-5xl">
            You didn't get into catalog finance to babysit Instagram and write cold emails all day.
          </h2>
          <p className="mt-8 text-lg leading-relaxed text-neutral-600">
            Every serious scout we talk to says the same thing:
          </p>

          <div className="mt-12 space-y-10">
            {[
              {
                title: 'My accounts keep getting banned.',
                body: 'You spent months building 5 IG accounts. Three got nuked the same week. Now you\'re back to square one with no plan to make the next set last longer.',
              },
              {
                title: 'I don\'t have time to send 140 DMs and 500 emails a day.',
                body: 'Personalized outreach takes 5+ minutes per touch. Doing real volume across both channels is a full-time job. So you do less, your pipeline stays thin, and scaling feels impossible.',
              },
              {
                title: 'AI-written outreach sounds robotic and gets me flagged.',
                body: 'You tried the bots. The replies were either zero or "stop spamming me." You\'re convinced the only way is manual — but you\'ve got no time for that either.',
              },
            ].map((item) => (
              <div key={item.title} className="border-l-2 border-neutral-300 pl-6">
                <h3 className="text-xl font-semibold text-neutral-950 md:text-2xl">
                  "{item.title}"
                </h3>
                <p className="mt-3 text-base leading-relaxed text-neutral-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MULTI-CHANNEL FEATURE */}
      <section className="border-t border-black/5 bg-white px-4 py-24 md:px-6 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid gap-16 md:grid-cols-2 md:items-center md:gap-12">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Multi-channel outreach
              </p>
              <h2 className="text-balance text-4xl font-bold tracking-tight text-neutral-950 md:text-5xl">
                Two channels. One inbox.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-neutral-600">
                Indie artists live on Instagram. Their managers and labels live in email. We
                run both, in parallel, on every artist we touch.
              </p>

              <div className="mt-10 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-pink-100 via-orange-50 to-yellow-50">
                    <Instagram className="h-5 w-5 text-pink-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-950">Instagram DMs</p>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                      Reach the artists themselves. Personalized to their bio, recent posts,
                      and Spotify catalog. Up to 140 cold DMs per day.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-950">Cold email at scale</p>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                      Reach managers, labels, and business contacts. Up to 600 personalized
                      emails per day with deliverability built in.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100">
                    <Inbox className="h-5 w-5 text-neutral-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-950">Unified inbox</p>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                      Every reply from every channel lands in one place, AI-classified
                      and ready for your one-click response.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:order-first">
              <UnifiedInboxMockup />
            </div>
          </div>
        </div>
      </section>

      {/* AI DRAFTER FEATURE */}
      <section className="px-4 py-24 md:px-6 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid gap-16 md:grid-cols-2 md:items-center md:gap-12">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                AI cold opener drafter
              </p>
              <h2 className="text-balance text-4xl font-bold tracking-tight text-neutral-950 md:text-5xl">
                Personalized openers that don't sound like a bot.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-neutral-600">
                Our AI reads each artist's bio, recent posts, follower trajectory, and
                Spotify catalog before drafting. Every opener references something specific
                about them.
              </p>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                Then a quality pass before send. Then delivery via the right channel.
                You see what's queued, nothing goes out without standards.
              </p>
            </div>
            <div>
              <AiDrafterMockup />
            </div>
          </div>
        </div>
      </section>

      {/* PIPELINE FEATURE */}
      <section className="border-t border-black/5 bg-white px-4 py-24 md:px-6 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid gap-16 md:grid-cols-2 md:items-center md:gap-12">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Deal pipeline
              </p>
              <h2 className="text-balance text-4xl font-bold tracking-tight text-neutral-950 md:text-5xl">
                Built for scouts. Not for generic SaaS.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-neutral-600">
                Every conversation lives next to its deal. Every artist has their full
                catalog data, follower trajectory, and contact graph. Drag-and-drop kanban
                from contacted → replied → call booked → closed.
              </p>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                Your commission dashboard updates the moment a deal moves to closed.
              </p>
            </div>
            <div className="md:order-first">
              <PipelineMockup />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-black/5 px-4 py-24 md:px-6 md:py-32">
        <div className="mx-auto w-full max-w-5xl">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              How it works
            </p>
            <h2 className="text-balance text-4xl font-bold tracking-tight text-neutral-950 md:text-5xl">
              Three steps. About 30 minutes a day.
            </h2>
          </div>

          <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
            {[
              {
                step: '01',
                title: 'Setup (one-time, ~4 weeks)',
                body: 'We provision your dedicated outreach presence across Instagram and email, configure your AI voice, and prepare your accounts for safe, sustainable operation.',
              },
              {
                step: '02',
                title: 'Outreach (every day)',
                body: 'AI drafts personalized cold openers — one per artist, referencing real specifics. We handle delivery across both channels. You never touch the send button.',
              },
              {
                step: '03',
                title: 'Close (your part)',
                body: 'Replies route into your CrateHQ inbox. AI classifies them, suggests responses. You reply with one click and book the call.',
              },
            ].map((s) => (
              <div key={s.step}>
                <p className="font-mono text-5xl font-medium text-neutral-300">{s.step}</p>
                <h3 className="mt-6 text-xl font-semibold text-neutral-950">{s.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-neutral-600">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className="border-t border-black/5 bg-white px-4 py-24 md:px-6 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Pricing
            </p>
            <h2 className="text-balance text-4xl font-bold tracking-tight text-neutral-950 md:text-5xl">
              Pick your volume. Grow when ready.
            </h2>
            <p className="mt-6 text-lg text-neutral-600">
              Pay onboarding upfront. Subscription begins when your outreach goes
              live — never before.
            </p>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {TIERS.map((t) => (
              <div
                key={t.id}
                className={`relative rounded-xl border p-6 ${
                  t.highlight
                    ? 'border-neutral-950 bg-white ring-2 ring-neutral-950'
                    : 'border-black/10 bg-white'
                }`}
              >
                {t.badge && (
                  <span
                    className={`absolute -top-3 left-6 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                      t.id === 'growth'
                        ? 'bg-neutral-950 text-white'
                        : 'bg-[#e8ff47] text-neutral-950'
                    }`}
                  >
                    ★ {t.badge}
                  </span>
                )}
                <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
                  {t.name}
                </p>
                <p className="mt-1 text-xs text-neutral-500">{t.bestFor}</p>

                <p className="mt-6 font-mono text-4xl font-medium tracking-tight text-neutral-950">
                  ${t.monthly.toLocaleString()}
                  <span className="font-sans text-base font-normal text-neutral-500">
                    /mo
                  </span>
                </p>
                <p className="mt-2 text-xs text-neutral-500">
                  + ${t.onboarding} onboarding{' '}
                  <span className="text-neutral-400 line-through">${t.onboardingOriginal}</span>
                </p>

                <div className="mt-6 space-y-2 border-t border-black/5 pt-6 text-sm text-neutral-700">
                  <p>
                    <strong className="text-neutral-950">{t.dmsPerDay}</strong>/day IG DMs
                  </p>
                  <p>
                    <strong className="text-neutral-950">{t.emailsPerDay}</strong>/day cold emails
                  </p>
                  <p>
                    <strong className="text-neutral-950">{t.expectedDealsMo}</strong> deals/mo (typical)
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-lg bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
            >
              See full feature comparison <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* DAY IN THE LIFE */}
      <section className="px-4 py-24 md:px-6 md:py-32">
        <div className="mx-auto w-full max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            A day in the life
          </p>
          <h2 className="text-balance text-4xl font-bold tracking-tight text-neutral-950 md:text-5xl">
            What your day actually looks like.
          </h2>

          <div className="mt-16 space-y-8">
            {[
              {
                time: '6:00',
                meridiem: 'AM',
                title: 'Outreach goes out — without you',
                body: 'Today\'s ~140 IG DMs and ~500 cold emails begin sending across all your active outreach. You\'re still asleep.',
              },
              {
                time: '9:00',
                meridiem: 'AM',
                title: 'Morning inbox check',
                body: 'You open CrateHQ. AI has already classified overnight replies into "interested," "needs response," and "noise." 12 minutes to triage.',
              },
              {
                time: '11:00',
                meridiem: 'AM',
                title: 'AI-suggested replies, one-click sends',
                body: 'Three artists asked for the deck. You hit "send suggested reply" on each. Two more want a call — book them straight from the inbox.',
              },
              {
                time: '2:00',
                meridiem: 'PM',
                title: 'Discovery call',
                body: 'Conversation context, recent message thread, and artist enrichment data sit in the deal panel. No tab-switching.',
              },
              {
                time: '4:00',
                meridiem: 'PM',
                title: 'Pipeline review',
                body: 'Move two artists to "proposal sent." Notes auto-saved. Tomorrow\'s outreach is already queued — no lifting required.',
              },
            ].map((entry) => (
              <div
                key={entry.time}
                className="grid grid-cols-[80px_1fr] gap-6 md:grid-cols-[100px_1fr] md:gap-8"
              >
                <div className="font-mono text-sm text-neutral-500">
                  <span className="text-neutral-950">{entry.time}</span>
                  <span className="ml-1">{entry.meridiem}</span>
                </div>
                <div>
                  <p className="font-semibold text-neutral-950">{entry.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                    {entry.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HONEST READ */}
      <section className="border-t border-black/5 bg-white px-4 py-24 md:px-6 md:py-32">
        <div className="mx-auto w-full max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Honest read
          </p>
          <h2 className="text-balance text-4xl font-bold tracking-tight text-neutral-950 md:text-5xl">
            What can still go wrong.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-neutral-600">
            We won't pretend outreach at this volume is risk-free. Anyone who tells
            you that is either lying or new. Here's what we know:
          </p>

          <div className="mt-12 space-y-8">
            {[
              {
                q: 'Bans happen.',
                a: 'Even with months of careful preparation, Instagram\'s ML changes weekly. Periodic account loss is a cost of doing business in this category. Our job is to make those losses isolated and replaceable, not to pretend they won\'t happen. Replacement accounts are included.',
              },
              {
                q: 'Email deliverability isn\'t free.',
                a: 'We invest in domain warm-up, sender reputation, and inbox-placement infrastructure. But no email platform on earth guarantees the inbox. We optimize aggressively; we don\'t over-promise.',
              },
              {
                q: 'You won\'t close every interested reply.',
                a: 'AI-drafted openers and reply triage make outreach efficient — they don\'t replace your closing skill. We\'re the top of your funnel. You\'re still the closer.',
              },
            ].map((item) => (
              <div key={item.q} className="border-l-2 border-neutral-300 pl-6">
                <p className="text-lg font-semibold text-neutral-950">{item.q}</p>
                <p className="mt-2 text-base leading-relaxed text-neutral-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER NOTE — the one place Cormorant Garamond italic shines */}
      <section className="border-t border-black/5 px-4 py-24 md:px-6 md:py-32">
        <div className="mx-auto w-full max-w-3xl">
          <p className="mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Founder note
          </p>
          <blockquote className="font-[var(--font-heading)] text-3xl italic leading-relaxed text-neutral-950 md:text-4xl">
            "The music catalog financing industry is one of the few where Instagram and
            email are the only channels that consistently produce deals. The scouts who
            scale share one playbook. The ones who don't share a different pattern: their
            accounts get banned, their outreach gets flagged, their inboxes turn into
            chaos. CrateHQ is the platform we wish existed when we started."
          </blockquote>
          <p className="mt-8 text-sm font-medium text-neutral-500">
            — The CrateHQ team
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-black/5 bg-white px-4 py-24 md:px-6 md:py-32">
        <div className="mx-auto w-full max-w-3xl text-center">
          <h2 className="text-balance text-5xl font-bold tracking-tight text-neutral-950 md:text-6xl">
            Stop sending DMs and writing emails yourself.
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg text-neutral-600">
            Pick a tier, pay onboarding, and we'll have your first cold outreach going
            out in ~4 weeks. Subscription doesn't bill until you're live.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
