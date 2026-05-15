import Link from 'next/link'
import {
  ArrowRight,
  ShieldCheck,
  Inbox,
  Sparkles,
  Clock,
  Users,
  TrendingUp,
  MessageSquare,
} from 'lucide-react'
import { TIERS } from '@/components/marketing/PricingTable'

export const metadata = {
  title: 'CrateHQ — Done-for-you Instagram outreach for music catalog scouts',
  description:
    'AI-drafted personalized cold openers, smart reply triage, and a unified inbox — fully managed and built to keep your accounts safe.',
}

export default function MarketingHome() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border/40 px-4 pt-20 pb-24 md:px-6 md:pt-28 md:pb-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(232,255,71,0.06),_transparent_60%)]" />
        <div className="mx-auto w-full max-w-5xl text-center">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            For music catalog financing scouts
          </p>
          <h1 className="text-balance font-[var(--font-heading)] text-5xl italic leading-[1.05] tracking-tight md:text-7xl">
            We run your Instagram outreach.
            <br />
            <span className="text-primary">You close the deals.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-balance text-lg text-muted-foreground md:text-xl">
            AI-drafted personalized cold openers, smart reply triage, and a unified inbox —
            fully managed and built to keep your accounts safe.
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

      {/* STATS / PROOF BAR */}
      <section className="border-b border-border/40 bg-card/30 px-4 py-12 md:px-6">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-8 text-center md:grid-cols-4">
          {[
            { value: '~140', label: 'cold DMs / day, fully managed' },
            { value: '~30 min', label: 'of your time per day' },
            { value: '~4 weeks', label: 'signed → first cold DM' },
            { value: '0', label: 'phones to manage' },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-[var(--font-heading)] text-4xl italic text-primary md:text-5xl">
                {s.value}
              </p>
              <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="border-b border-border/40 px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto w-full max-w-5xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Why scouts come to us
          </p>
          <h2 className="font-[var(--font-heading)] text-4xl italic md:text-5xl">
            You didn't get into catalog finance to babysit Instagram.
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Every serious scout we talk to says the same three things.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: '"My accounts keep getting banned."',
                body: 'You spent months building 5 IG accounts. Three got nuked the same week. Now you\'re back to square one with no plan to make the next set last longer.',
              },
              {
                title: '"I don\'t have time to send 140 DMs a day."',
                body: 'Personalized cold openers take 5+ minutes each. Doing 140/day is a full-time job. So you do 20, your pipeline stays thin, and you wonder why scaling feels impossible.',
              },
              {
                title: '"AI DMs sound robotic."',
                body: 'You tried the bots. The replies were either zero or "stop spamming me." You\'re convinced the only way is manual — but you\'ve got no time for that either.',
              },
            ].map((p) => (
              <div
                key={p.title}
                className="rounded-xl border border-border/40 bg-card p-6"
              >
                <h3 className="text-lg font-semibold leading-snug text-foreground">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="border-b border-border/40 px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto w-full max-w-5xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            What you get
          </p>
          <h2 className="font-[var(--font-heading)] text-4xl italic md:text-5xl">
            A complete outreach engine. Run for you.
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Everything below is included in every plan. The only thing that scales between
            tiers is volume.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Sparkles,
                title: 'AI-drafted cold openers',
                body: 'Our AI reads each artist\'s bio, recent posts, and Spotify catalog before drafting. Every opener references something specific. Zero generic templates.',
              },
              {
                icon: ShieldCheck,
                title: 'Account safety, baked in',
                body: 'Account longevity is built into our setup. We invest 4 weeks of preparation per account so they last 12+ months instead of weeks.',
              },
              {
                icon: Inbox,
                title: 'Unified reply inbox',
                body: 'Every IG reply, every email, every channel — routed into one CrateHQ inbox. AI auto-classifies. Suggested responses ready in one click.',
              },
              {
                icon: MessageSquare,
                title: 'Email outreach included',
                body: 'Multi-channel by default. AI-drafted email campaigns with deliverability built in. Same inbox handles replies.',
              },
              {
                icon: TrendingUp,
                title: 'Deal pipeline + CRM',
                body: 'Drag-and-drop kanban from contact → conversation → call booked → deal signed. Real-time. Built for scouts, not generic SaaS users.',
              },
              {
                icon: Users,
                title: 'Alias Generator wizard',
                body: 'Spin up a new outreach persona in 30 minutes — brand identity, voice profile, content seed, all auto-generated. (Growth tier and above.)',
              },
            ].map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="rounded-xl border border-border/40 bg-card p-6"
                >
                  <Icon className="h-6 w-6 text-primary" />
                  <h3 className="mt-4 text-base font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.body}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-b border-border/40 bg-card/20 px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto w-full max-w-5xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            How it works
          </p>
          <h2 className="font-[var(--font-heading)] text-4xl italic md:text-5xl">
            Three steps. About 30 minutes a day.
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Setup (one-time)',
                body: 'We provision your dedicated Instagram presence, configure your AI voice from your inputs, and prepare your accounts for safe, sustainable outreach.',
                meta: 'Takes ~4 weeks',
              },
              {
                step: '02',
                title: 'Outreach (every day)',
                body: 'AI drafts personalized cold openers based on each artist\'s profile, recent posts, and Spotify catalog. We handle delivery so you never touch the send button.',
                meta: 'Runs in the background',
              },
              {
                step: '03',
                title: 'Close (your part)',
                body: 'Replies route into your CrateHQ inbox. AI classifies them, suggests responses. You reply with one click and book the call.',
                meta: '~30 min/day of your time',
              },
            ].map((s) => (
              <div key={s.step}>
                <p className="font-[var(--font-heading)] text-6xl italic text-primary">{s.step}</p>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                <p className="mt-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary">
                  <Clock className="h-3 w-3" />
                  {s.meta}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className="border-b border-border/40 px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Pricing
            </p>
            <h2 className="font-[var(--font-heading)] text-4xl italic md:text-5xl">
              Pick your volume. Grow when ready.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Pay onboarding upfront. Subscription begins the day your outreach goes live —
              not before.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {TIERS.map((t) => (
              <div
                key={t.id}
                className={`relative rounded-xl border p-6 ${
                  t.highlight
                    ? 'border-primary/40 bg-primary/5 ring-1 ring-primary/30'
                    : 'border-border/40 bg-card'
                }`}
              >
                {t.badge && (
                  <span
                    className={`absolute -top-3 left-6 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                      t.id === 'growth'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-foreground text-background'
                    }`}
                  >
                    ★ {t.badge}
                  </span>
                )}
                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {t.name}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{t.bestFor}</p>

                <p className="mt-6 text-4xl font-semibold tracking-tight text-foreground">
                  ${t.monthly.toLocaleString()}
                  <span className="text-base font-normal text-muted-foreground">/mo</span>
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  + ${t.onboarding} onboarding{' '}
                  <span className="text-primary">(was ${t.onboardingOriginal})</span>
                </p>

                <div className="mt-6 space-y-2 border-t border-border/40 pt-6 text-sm">
                  <p className="text-foreground">
                    <span className="text-muted-foreground">Personas:</span>{' '}
                    <strong>{t.igAccounts}</strong>
                  </p>
                  <p className="text-foreground">
                    <span className="text-muted-foreground">DMs/day:</span>{' '}
                    <strong>{t.dmsPerDay}</strong>
                  </p>
                  <p className="text-foreground">
                    <span className="text-muted-foreground">Deals/mo (typical):</span>{' '}
                    <strong>{t.expectedDealsMo}</strong>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              See full feature comparison <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* A DAY IN THE LIFE */}
      <section className="border-b border-border/40 bg-card/20 px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto w-full max-w-4xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            A day in the life
          </p>
          <h2 className="font-[var(--font-heading)] text-4xl italic md:text-5xl">
            What your day actually looks like.
          </h2>

          <div className="mt-12 space-y-6">
            {[
              {
                time: '6:00 AM',
                title: 'Outreach goes out — without you',
                body: 'Today\'s ~140 personalized cold openers begin sending across your active personas. You\'re still asleep.',
              },
              {
                time: '9:00 AM',
                title: 'Morning inbox check',
                body: 'You open CrateHQ. AI has already classified overnight replies into "interested," "needs response," and "noise." 12 minutes to triage.',
              },
              {
                time: '11:00 AM',
                title: 'AI-suggested replies, one-click sends',
                body: 'Three artists asked for the deck. You hit "send suggested reply" on each. Two more want a call — book them straight from the inbox.',
              },
              {
                time: '2:00 PM',
                title: 'Discovery call',
                body: 'Conversation context, recent message thread, and artist enrichment data sit in the deal panel. No tab-switching.',
              },
              {
                time: '4:00 PM',
                title: 'Pipeline review',
                body: 'Move two artists to "proposal sent." Notes auto-saved. Tomorrow\'s outreach is already queued — no lifting required.',
              },
            ].map((entry) => (
              <div
                key={entry.time}
                className="flex flex-col gap-2 border-l-2 border-primary/30 pl-6 md:flex-row md:items-baseline md:gap-8"
              >
                <p className="w-24 shrink-0 font-mono text-sm text-primary">{entry.time}</p>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{entry.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{entry.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ANNUAL PREPAY CALLOUT */}
      <section className="border-b border-border/40 px-4 py-16 md:px-6">
        <div className="mx-auto w-full max-w-4xl rounded-2xl border border-primary/30 bg-primary/5 p-8 md:p-12">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Annual prepay
              </p>
              <h3 className="text-2xl font-semibold text-foreground md:text-3xl">
                Pay yearly, save 2 months.
              </h3>
              <p className="mt-3 max-w-lg text-sm text-muted-foreground">
                Lock in your rate, simplify cash flow, and save up to $5,600/year on Whale tier.
              </p>
            </div>
            <Link
              href="/pricing#annual"
              className="inline-flex items-center gap-2 rounded-lg border border-primary/40 bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-primary/10"
            >
              See annual pricing <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* HONEST RISK */}
      <section className="border-b border-border/40 px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto w-full max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Honest read
          </p>
          <h2 className="font-[var(--font-heading)] text-4xl italic md:text-5xl">
            What can still go wrong.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            We won't pretend Instagram outreach is risk-free. Anyone who tells you that is
            either lying or new. Here's what we know, what we do about it, and what we
            don't promise.
          </p>

          <div className="mt-10 space-y-6">
            {[
              {
                q: 'Bans happen.',
                a: 'Even with months of careful preparation, Instagram\'s ML changes weekly. Periodic account loss is a cost of doing business in this category. Our job is to make those losses isolated and replaceable, not to pretend they won\'t happen. Replacement accounts are included in your subscription.',
              },
              {
                q: 'You won\'t close every interested reply.',
                a: 'AI-drafted openers and reply triage make outreach efficient — they don\'t replace your closing skill. We\'re the top of your funnel. You\'re still the closer.',
              },
              {
                q: 'Onboarding takes ~4 weeks.',
                a: 'Skipping account preparation is exactly why most outreach services blow up. We\'d rather lose an impatient customer than ship a fragile setup that gets nuked in week two.',
              },
            ].map((item) => (
              <div key={item.q} className="rounded-xl border border-border/40 bg-card p-6">
                <p className="font-semibold text-foreground">{item.q}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/faq"
              className="text-sm text-primary hover:underline"
            >
              Read all 12 FAQs →
            </Link>
          </div>
        </div>
      </section>

      {/* FOUNDER NOTE */}
      <section className="border-b border-border/40 bg-card/20 px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto w-full max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Founder note
          </p>
          <h2 className="font-[var(--font-heading)] text-4xl italic md:text-5xl">
            Why we built this.
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-foreground/90">
            <p>
              The music catalog financing industry is one of the few where Instagram is the
              only channel that consistently produces deals. Indie artists live there.
              They don't open cold emails. They don't pick up unknown calls.
            </p>
            <p>
              The scouts who scale in this category all share the same playbook: dozens of
              accounts, hundreds of personalized DMs daily, every reply triaged in minutes.
              The ones who don't scale share a different pattern: their accounts get banned,
              their VAs cost a fortune, and their inboxes turn into chaos.
            </p>
            <p>
              CrateHQ is the platform we wish existed when we started. AI does the
              repetitive work. Humans do what only humans can. The infrastructure that
              keeps it all running stays out of your way.
            </p>
            <p className="pt-4 font-[var(--font-heading)] text-2xl italic text-primary">
              — The CrateHQ team
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-4 py-24 md:px-6 md:py-32">
        <div className="mx-auto w-full max-w-3xl text-center">
          <h2 className="font-[var(--font-heading)] text-5xl italic leading-tight md:text-6xl">
            Ready to stop sending DMs yourself?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Pick a tier, pay onboarding, and we'll have your first cold DMs going out in
            ~4 weeks. Subscription doesn't bill until you're live.
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
