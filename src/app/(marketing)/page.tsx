import Link from 'next/link'
import { ArrowRight, Instagram, Mail, Inbox, X, Check } from 'lucide-react'
import { TIERS } from '@/components/marketing/pricing-data'
import { UnifiedInboxMockup } from '@/components/marketing/UnifiedInboxMockup'
import { AiDrafterMockup } from '@/components/marketing/AiDrafterMockup'
import { PipelineMockup } from '@/components/marketing/PipelineMockup'

export const metadata = {
  title: 'Praecora — Outreach that doesn\'t feel like outreach',
  description:
    'Praecora carries personalized Instagram and email outreach to every artist worth knowing — at a volume no human can match, with the care no bot can fake. Built for music catalog scouts.',
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
              Outreach that doesn't feel like outreach.
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-balance text-lg text-neutral-600 md:text-xl">
              Praecora carries personalized Instagram and email outreach to every artist
              worth knowing — at a volume no human can match, with the care no bot can fake.
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

      {/* THE PROBLEM — name the villain */}
      <section className="px-4 py-24 md:px-6 md:py-32">
        <div className="mx-auto w-full max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            The drudgery problem
          </p>
          <h2 className="text-balance text-4xl font-bold tracking-tight text-neutral-950 md:text-5xl">
            You didn't get into catalog finance to type "hey love your sound" 200 times a day.
          </h2>
          <p className="mt-8 text-lg leading-relaxed text-neutral-600">
            You went into this work because you're good at judgment, relationships, and the
            close. But outreach is math: more conversations = more deals = more commissions.
            So you grind. And the grind grinds you back.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-neutral-600">
            The villain isn't AI. It isn't Instagram. It's <strong className="text-neutral-950">the drudgery</strong> — the
            mechanical work that scales linearly with your effort and burns out everything
            around it.
          </p>

          <div className="mt-12 space-y-10">
            {[
              {
                title: 'My accounts keep getting banned.',
                body: 'Because nobody told you accounts need 4 weeks of careful preparation before they can survive real volume. Without that, your fleet has a 90-day half-life.',
              },
              {
                title: "I don't have time to send 140 DMs and 500 emails a day.",
                body: "And you shouldn't — that work doesn't need you. It needs a herald who pays attention to each artist before sending. That's a different job entirely.",
              },
              {
                title: 'AI-written outreach sounds robotic and gets me flagged.',
                body: 'Most AI does. The lazy kind that templates "hope this finds you well" across 10,000 contacts. Praecora doesn\'t.',
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

      {/* GUIDE INTRO — Praecora as the herald with empathy + authority */}
      <section className="border-t border-black/5 bg-white px-4 py-24 md:px-6 md:py-32">
        <div className="mx-auto w-full max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Your herald
          </p>
          <h2 className="text-balance text-4xl font-bold tracking-tight text-neutral-950 md:text-5xl">
            We carry your message. With care.
          </h2>
          <p className="mt-8 text-lg leading-relaxed text-neutral-700">
            Praecora was built by operators who'd watched too many scouts burn through
            accounts, burn through nights, and burn out — all while their actual skill
            (closing deals) sat unused.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-neutral-700">
            We named the platform after the Latin{' '}
            <em className="font-[var(--font-heading)] italic text-neutral-950">praeco</em>{' '}
            — the herald who carried important messages on behalf of others — paired with{' '}
            <em className="font-[var(--font-heading)] italic text-neutral-950">cor</em>,
            meaning heart. Because outreach without care is spam. And spam is what got the
            last generation of scouts banned.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-neutral-700">
            Every cold opener Praecora drafts is read against the artist's bio, recent
            posts, and Spotify catalog before it goes out. Every reply is classified,
            suggested, and ready for your one-click response. The volume happens on its
            own. <strong className="text-neutral-950">The closing — still you.</strong>
          </p>
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
                Indie artists live on Instagram. Their managers and labels live in email.
                Praecora carries your message on both, in parallel, on every artist you touch.
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
                You see what's queued. Nothing goes out without standards.
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

      {/* THE PLAN — explicit 3-step path */}
      <section className="border-t border-black/5 px-4 py-24 md:px-6 md:py-32">
        <div className="mx-auto w-full max-w-5xl">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              The plan
            </p>
            <h2 className="text-balance text-4xl font-bold tracking-tight text-neutral-950 md:text-5xl">
              Three steps. Four weeks to live.
            </h2>
          </div>

          <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
            {[
              {
                step: '01',
                title: 'Pick your tier',
                body: 'Pay onboarding upfront. Pick your volume. Subscription doesn\'t start until you\'re live.',
              },
              {
                step: '02',
                title: 'We build your herald',
                body: 'Four weeks of careful account preparation across Instagram and email. You don\'t lift a finger.',
              },
              {
                step: '03',
                title: 'Close from one inbox',
                body: '~30 min/day in your Praecora inbox. AI classifies replies, suggests responses, queues your next move.',
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

      {/* STAKES — two paths */}
      <section className="border-t border-black/5 px-4 py-24 md:px-6 md:py-32">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              The stakes
            </p>
            <h2 className="text-balance text-4xl font-bold tracking-tight text-neutral-950 md:text-5xl">
              Two paths from here.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-600">
              You're 90 days from a meaningfully different operation. Which version of it
              do you want?
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {/* Without */}
            <div className="rounded-xl border border-black/10 bg-white p-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
                Without Praecora
              </p>
              <ul className="mt-6 space-y-4">
                {[
                  '6 hours/day on outreach grind',
                  'Accounts banned every quarter',
                  'Pipeline tied to your typing speed',
                  'Stuck at your current ceiling',
                  'Nights and weekends gone',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-neutral-600">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* With */}
            <div className="rounded-xl border border-neutral-950 bg-white p-8 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.15)]">
              <p className="text-sm font-semibold uppercase tracking-wider text-neutral-950">
                With Praecora
              </p>
              <ul className="mt-6 space-y-4">
                {[
                  '~30 minutes/day on closing',
                  'Accounts lasting 12+ months',
                  'Pipeline compounding while you sleep',
                  '5–15 deals/month, predictable',
                  'Your time back where it belongs',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-neutral-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-neutral-950" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* DAY IN THE LIFE */}
      <section className="border-t border-black/5 bg-white px-4 py-24 md:px-6 md:py-32">
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
                body: 'You open Praecora. AI has already classified overnight replies into "interested," "needs response," and "noise." 12 minutes to triage.',
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
      <section className="border-t border-black/5 px-4 py-24 md:px-6 md:py-32">
        <div className="mx-auto w-full max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Honest read
          </p>
          <h2 className="text-balance text-4xl font-bold tracking-tight text-neutral-950 md:text-5xl">
            What can still go wrong.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-neutral-600">
            We won't pretend outreach at this volume is risk-free. Anyone who tells you
            that is either lying or new. Here's what we know:
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

      {/* FOUNDER NOTE — etymology + signed personally */}
      <section className="border-t border-black/5 bg-white px-4 py-24 md:px-6 md:py-32">
        <div className="mx-auto w-full max-w-3xl">
          <p className="mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Founder note
          </p>
          <blockquote className="space-y-6 font-[var(--font-heading)] text-2xl italic leading-relaxed text-neutral-950 md:text-3xl">
            <p>
              "Praecora" comes from the Latin praeco — the herald who carried important
              messages on behalf of others — and cor, meaning heart.
            </p>
            <p>
              I named it that because the music industry doesn't need another generic
              outreach bot. It needs a herald who actually pays attention to the artist
              on the other end. Who reads the bio. Who notices the latest release. Who
              carries your message with the care you'd give it yourself, at a volume
              you never could alone.
            </p>
            <p>
              I built Praecora because I'd watched too many scouts in this industry burn
              through accounts, burn through nights, and burn out — all while their actual
              skill (closing deals) sat unused. The mechanical work was eating the
              meaningful work.
            </p>
            <p>
              Praecora is what I wish had existed when I was inside this playbook myself.
            </p>
          </blockquote>
          <p className="mt-10 text-sm font-medium text-neutral-500">
            — Joel House, Founder
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-black/5 px-4 py-24 md:px-6 md:py-32">
        <div className="mx-auto w-full max-w-3xl text-center">
          <h2 className="text-balance text-5xl font-bold tracking-tight text-neutral-950 md:text-6xl">
            Let Praecora carry it for you.
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg text-neutral-600">
            Pick a tier. Pay onboarding. We'll have your herald live in ~4 weeks.
            Subscription doesn't bill until you're live.
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
