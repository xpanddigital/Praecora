import Link from 'next/link'
import { Check, Minus, Instagram, Mail, TrendingUp, LayoutDashboard, Sparkles, LifeBuoy, Rocket } from 'lucide-react'
import { TIERS, type Tier } from './pricing-data'

export { TIERS, type Tier }

type GroupColor = {
  bg: string
  text: string
  dot: string
  Icon: typeof Instagram
}

type Row = {
  label: string
  values: (string | boolean)[]
  group?: GroupColor & { name: string }
}

const GROUPS = {
  ig: { bg: 'bg-pink-50/60', text: 'text-pink-900', dot: 'bg-pink-400', Icon: Instagram, name: 'INSTAGRAM OUTREACH' },
  email: { bg: 'bg-blue-50/60', text: 'text-blue-900', dot: 'bg-blue-400', Icon: Mail, name: 'EMAIL OUTREACH' },
  outcomes: { bg: 'bg-emerald-50/60', text: 'text-emerald-900', dot: 'bg-emerald-400', Icon: TrendingUp, name: 'EXPECTED OUTCOMES (typical)' },
  platform: { bg: 'bg-neutral-100/80', text: 'text-neutral-900', dot: 'bg-neutral-400', Icon: LayoutDashboard, name: 'PLATFORM' },
  ai: { bg: 'bg-amber-50/60', text: 'text-amber-900', dot: 'bg-amber-400', Icon: Sparkles, name: 'AI TOOLS' },
  support: { bg: 'bg-neutral-100/80', text: 'text-neutral-900', dot: 'bg-neutral-400', Icon: LifeBuoy, name: 'SUPPORT' },
  onboarding: { bg: 'bg-neutral-100/80', text: 'text-neutral-900', dot: 'bg-neutral-400', Icon: Rocket, name: 'ONBOARDING (one-time)' },
}

const ROWS: Row[] = [
  { label: 'Best for', values: TIERS.map((t) => t.bestFor) },

  { label: '', values: ['', '', '', ''], group: GROUPS.ig },
  { label: 'IG aliases (active personas)', values: TIERS.map((t) => String(t.igAccounts)) },
  { label: 'IG cold DMs / day', values: TIERS.map((t) => String(t.dmsPerDay)) },
  { label: 'IG cold DMs / month', values: TIERS.map((t) => `~${t.dmsPerMonth.toLocaleString()}`) },

  { label: '', values: ['', '', '', ''], group: GROUPS.email },
  { label: 'Cold emails / day', values: TIERS.map((t) => String(t.emailsPerDay)) },
  { label: 'Cold emails / month', values: TIERS.map((t) => `~${t.emailsPerMonth.toLocaleString()}`) },
  { label: 'Sender domains warmed', values: TIERS.map((t) => t.id === 'starter' ? '1' : t.id === 'growth' ? '2' : t.id === 'pro' ? '3' : '4') },

  { label: '', values: ['', '', '', ''], group: GROUPS.outcomes },
  { label: 'Total touches / month', values: TIERS.map((t) => `~${t.totalTouchesPerMonth.toLocaleString()}`) },
  { label: 'Replies / month', values: TIERS.map((t) => t.expectedRepliesMo) },
  { label: 'Calls booked / month', values: TIERS.map((t) => t.expectedCallsMo) },
  { label: 'Deals / month', values: TIERS.map((t) => t.expectedDealsMo) },

  { label: '', values: ['', '', '', ''], group: GROUPS.platform },
  { label: 'Praecora dashboard (CRM, pipeline, deals)', values: [true, true, true, true] },
  { label: 'Artist database + auto-research', values: [true, true, true, true] },
  { label: 'Multi-channel unified inbox', values: [true, true, true, true] },
  { label: 'Analytics + reporting', values: [true, true, true, true] },
  { label: 'Mobile-friendly inbox', values: [true, true, true, true] },

  { label: '', values: ['', '', '', ''], group: GROUPS.ai },
  { label: 'AI cold opener drafter (IG + email)', values: [true, true, true, true] },
  { label: 'AI reply classifier (auto-triage)', values: [true, true, true, true] },
  { label: 'AI reply suggester (1-click send)', values: [true, true, true, true] },
  { label: 'AI artist enrichment', values: [true, true, true, true] },
  { label: 'AI content studio (post drafts)', values: [true, true, true, true] },
  { label: 'Alias Generator wizard', values: [false, true, true, true] },
  { label: 'Custom AI voice tuning', values: [false, false, false, true] },

  { label: '', values: ['', '', '', ''], group: GROUPS.support },
  { label: 'Email support response', values: ['48 hr', '24 hr', 'Same-day', 'Same-day'] },
  { label: 'Monthly strategy call', values: [false, false, true, true] },
  { label: 'Weekly strategy call', values: [false, false, false, true] },
  { label: 'Dedicated account manager', values: [false, false, false, true] },

  { label: '', values: ['', '', '', ''], group: GROUPS.onboarding },
  { label: 'Account preparation', values: [true, true, true, true] },
  { label: 'Persona + voice configuration', values: [true, true, true, true] },
  { label: 'Email sender domains setup + warm-up', values: [true, true, true, true] },
  { label: 'Initial content seeding', values: [true, true, true, true] },
  { label: 'Onboarding timeline', values: ['~4 weeks', '~4 weeks', '~4 weeks', '~4 weeks'] },
]

function formatPrice(n: number) {
  return `$${n.toLocaleString()}`
}

function Cell({ value }: { value: string | boolean }) {
  if (value === true) {
    return <Check className="h-4 w-4 text-neutral-950" aria-label="Included" />
  }
  if (value === false) {
    return <Minus className="h-4 w-4 text-neutral-300" aria-label="Not included" />
  }
  return <span className="text-sm text-neutral-700">{value}</span>
}

export function PricingTable() {
  return (
    <div className="w-full">
      {/* Wrapped in a card-style container with shadow for depth */}
      <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_2px_4px_rgba(0,0,0,0.04),_0_24px_48px_-16px_rgba(0,0,0,0.08)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 w-[280px] bg-white pb-4 pl-5 pt-6 text-left align-bottom"></th>
                {TIERS.map((t) => (
                  <th
                    key={t.id}
                    className={`w-[170px] border-l border-black/10 px-4 pb-5 pt-6 text-left align-top ${
                      t.highlight
                        ? 'bg-gradient-to-b from-[#fffceb] to-white'
                        : 'bg-white'
                    }`}
                  >
                    {/* Reserved space for badge so all columns align */}
                    <div className="mb-3 h-6">
                      {t.badge && (
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                            t.id === 'growth'
                              ? 'bg-neutral-950 text-white'
                              : 'bg-[#e8ff47] text-neutral-950'
                          }`}
                        >
                          ★ {t.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-base font-semibold text-neutral-950">{t.name}</p>
                    <p className="mt-2 font-mono text-3xl font-medium tracking-tight text-neutral-950">
                      {formatPrice(t.monthly)}
                      <span className="font-sans text-sm font-normal text-neutral-500">
                        /mo
                      </span>
                    </p>
                    <p className="mt-2 text-xs text-neutral-500">
                      or {formatPrice(t.annual)}/yr
                      <br />
                      <span className="font-medium text-neutral-950">save 2 mo</span>
                    </p>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {ROWS.map((row, i) => {
                if (row.group) {
                  const G = row.group
                  const Icon = G.Icon
                  return (
                    <tr key={i}>
                      <td
                        colSpan={5}
                        className={`border-t border-black/10 ${G.bg} px-5 pb-2.5 pt-6`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`flex h-5 w-5 items-center justify-center rounded-md ${G.bg}`}>
                            <Icon className={`h-3.5 w-3.5 ${G.text}`} />
                          </span>
                          <p className={`text-[10px] font-bold uppercase tracking-[0.15em] ${G.text}`}>
                            {G.name}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )
                }
                return (
                  <tr key={i} className="transition-colors hover:bg-neutral-50/40">
                    <td className="sticky left-0 z-10 border-t border-black/10 bg-white px-5 py-3 text-sm text-neutral-700">
                      {row.label}
                    </td>
                    {row.values.map((v, j) => (
                      <td
                        key={j}
                        className={`border-l border-t border-black/10 px-4 py-3 ${
                          TIERS[j].highlight ? 'bg-[#fffdf2]' : 'bg-white'
                        }`}
                      >
                        <Cell value={v} />
                      </td>
                    ))}
                  </tr>
                )
              })}

              {/* Onboarding fee row — special emphasis */}
              <tr className="bg-neutral-50/60">
                <td className="sticky left-0 z-10 border-t border-black/10 bg-neutral-50/60 px-5 py-4 text-sm font-semibold text-neutral-950">
                  Onboarding fee (one-time)
                </td>
                {TIERS.map((t) => (
                  <td
                    key={t.id}
                    className={`border-l border-t border-black/10 px-4 py-4 ${
                      t.highlight ? 'bg-[#fffdf2]' : 'bg-neutral-50/60'
                    }`}
                  >
                    <div>
                      <span className="font-mono text-base font-medium text-neutral-950">
                        {formatPrice(t.onboarding)}
                      </span>
                      <span className="ml-2 text-xs text-neutral-400 line-through">
                        {formatPrice(t.onboardingOriginal)}
                      </span>
                    </div>
                    <p className="mt-1 inline-flex items-center rounded-full bg-[#e8ff47] px-2 py-0.5 text-[10px] font-bold text-neutral-950">
                      20% OFF
                    </p>
                  </td>
                ))}
              </tr>

              {/* Day 0 cost */}
              <tr>
                <td className="sticky left-0 z-10 border-t border-black/10 bg-white px-5 py-3 text-sm font-medium text-neutral-950">
                  Day 0 cost{' '}
                  <span className="text-xs font-normal text-neutral-500">(onboarding only)</span>
                </td>
                {TIERS.map((t) => (
                  <td
                    key={t.id}
                    className={`border-l border-t border-black/10 px-4 py-3 ${
                      t.highlight ? 'bg-[#fffdf2]' : 'bg-white'
                    }`}
                  >
                    <span className="font-mono text-base font-semibold text-neutral-950">
                      {formatPrice(t.onboarding)}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Monthly subscription */}
              <tr>
                <td className="sticky left-0 z-10 border-t border-black/10 bg-white px-5 py-3 text-sm font-medium text-neutral-950">
                  Monthly subscription{' '}
                  <span className="text-xs font-normal text-neutral-500">(begins ~Day 28)</span>
                </td>
                {TIERS.map((t) => (
                  <td
                    key={t.id}
                    className={`border-l border-t border-black/10 px-4 py-3 ${
                      t.highlight ? 'bg-[#fffdf2]' : 'bg-white'
                    }`}
                  >
                    <span className="font-mono text-base text-neutral-950">
                      {formatPrice(t.monthly)}
                    </span>
                    <span className="text-sm text-neutral-500">/mo</span>
                  </td>
                ))}
              </tr>

              {/* CTA */}
              <tr>
                <td className="sticky left-0 z-10 border-t border-black/10 bg-white px-5 py-6"></td>
                {TIERS.map((t) => (
                  <td
                    key={t.id}
                    className={`border-l border-t border-black/10 px-4 py-6 ${
                      t.highlight ? 'bg-[#fffdf2]' : 'bg-white'
                    }`}
                  >
                    <Link
                      href={t.ctaHref}
                      className={`block w-full rounded-lg px-4 py-2.5 text-center text-sm font-semibold transition-colors ${
                        t.highlight
                          ? 'bg-neutral-950 text-white hover:bg-neutral-800'
                          : 'border border-neutral-300 bg-white text-neutral-950 hover:bg-neutral-50'
                      }`}
                    >
                      {t.ctaLabel}
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
