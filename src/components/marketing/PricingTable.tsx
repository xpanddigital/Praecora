import Link from 'next/link'
import { Check, Minus } from 'lucide-react'
import { TIERS, type Tier } from './pricing-data'

export { TIERS, type Tier }

type Row = {
  label: string
  values: (string | boolean)[]
  group?: string
}

const ROWS: Row[] = [
  // Best for
  { label: 'Best for', values: TIERS.map((t) => t.bestFor) },

  // Volume group — INSTAGRAM
  { label: 'INSTAGRAM OUTREACH', values: ['', '', '', ''], group: 'header' },
  { label: 'IG aliases (active personas)', values: TIERS.map((t) => String(t.igAccounts)) },
  { label: 'IG cold DMs / day', values: TIERS.map((t) => String(t.dmsPerDay)) },
  { label: 'IG cold DMs / month', values: TIERS.map((t) => `~${t.dmsPerMonth.toLocaleString()}`) },

  // Volume group — EMAIL
  { label: 'EMAIL OUTREACH', values: ['', '', '', ''], group: 'header' },
  { label: 'Cold emails / day', values: TIERS.map((t) => String(t.emailsPerDay)) },
  { label: 'Cold emails / month', values: TIERS.map((t) => `~${t.emailsPerMonth.toLocaleString()}`) },
  { label: 'Sender domains warmed', values: TIERS.map((t) => t.id === 'starter' ? '1' : t.id === 'growth' ? '2' : t.id === 'pro' ? '3' : '4') },

  // Combined outcomes
  { label: 'EXPECTED OUTCOMES (typical)', values: ['', '', '', ''], group: 'header' },
  { label: 'Total touches / month', values: TIERS.map((t) => `~${t.totalTouchesPerMonth.toLocaleString()}`) },
  { label: 'Replies / month', values: TIERS.map((t) => t.expectedRepliesMo) },
  { label: 'Calls booked / month', values: TIERS.map((t) => t.expectedCallsMo) },
  { label: 'Deals / month', values: TIERS.map((t) => t.expectedDealsMo) },

  // Platform
  { label: 'PLATFORM', values: ['', '', '', ''], group: 'header' },
  { label: 'CrateHQ dashboard (CRM, pipeline, deals)', values: [true, true, true, true] },
  { label: 'Artist database + auto-research', values: [true, true, true, true] },
  { label: 'Multi-channel unified inbox', values: [true, true, true, true] },
  { label: 'Analytics + reporting', values: [true, true, true, true] },
  { label: 'Mobile-friendly inbox', values: [true, true, true, true] },

  // AI Tools
  { label: 'AI TOOLS', values: ['', '', '', ''], group: 'header' },
  { label: 'AI cold opener drafter (IG + email)', values: [true, true, true, true] },
  { label: 'AI reply classifier (auto-triage)', values: [true, true, true, true] },
  { label: 'AI reply suggester (1-click send)', values: [true, true, true, true] },
  { label: 'AI artist enrichment', values: [true, true, true, true] },
  { label: 'AI content studio (post drafts)', values: [true, true, true, true] },
  { label: 'Alias Generator wizard', values: [false, true, true, true] },
  { label: 'Custom AI voice tuning', values: [false, false, false, true] },

  // Support
  { label: 'SUPPORT', values: ['', '', '', ''], group: 'header' },
  { label: 'Email support response', values: ['48 hr', '24 hr', 'Same-day', 'Same-day'] },
  { label: 'Monthly strategy call', values: [false, false, true, true] },
  { label: 'Weekly strategy call', values: [false, false, false, true] },
  { label: 'Dedicated account manager', values: [false, false, false, true] },

  // Onboarding
  { label: 'ONBOARDING (one-time)', values: ['', '', '', ''], group: 'header' },
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

export function PricingTable({ showRoiBand = true }: { showRoiBand?: boolean }) {
  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="sticky left-0 w-[280px] bg-[#fafaf9] pb-4 pl-4 text-left align-bottom"></th>
              {TIERS.map((t) => (
                <th
                  key={t.id}
                  className={`relative w-[160px] border-x border-t border-black/10 bg-white px-4 pb-5 pt-7 text-left align-top first:rounded-tl-xl last:rounded-tr-xl ${
                    t.highlight ? 'ring-2 ring-neutral-950 ring-inset' : ''
                  }`}
                >
                  {t.badge && (
                    <span
                      className={`absolute -top-3 left-4 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                        t.id === 'growth'
                          ? 'bg-neutral-950 text-white'
                          : 'bg-[#e8ff47] text-neutral-950'
                      }`}
                    >
                      ★ {t.badge}
                    </span>
                  )}
                  <p className="text-base font-semibold text-neutral-950">{t.name}</p>
                  <p className="mt-2 font-mono text-3xl font-medium tracking-tight text-neutral-950">
                    {formatPrice(t.monthly)}
                    <span className="font-sans text-sm font-normal text-neutral-500">/mo</span>
                  </p>
                  <p className="mt-2 text-xs text-neutral-500">
                    or {formatPrice(t.annual)}/yr
                    <span className="ml-1 font-medium text-neutral-950">(save 2 mo)</span>
                  </p>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {ROWS.map((row, i) => {
              if (row.group === 'header') {
                return (
                  <tr key={i}>
                    <td
                      colSpan={5}
                      className="border-x border-black/10 bg-neutral-50/50 px-4 pb-2 pt-7 text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-500"
                    >
                      {row.label}
                    </td>
                  </tr>
                )
              }
              return (
                <tr key={i}>
                  <td className="sticky left-0 border-x border-t border-black/10 bg-[#fafaf9] px-4 py-3 text-sm text-neutral-600">
                    {row.label}
                  </td>
                  {row.values.map((v, j) => (
                    <td
                      key={j}
                      className={`border-x border-t border-black/10 bg-white px-4 py-3 ${
                        TIERS[j].highlight ? 'bg-neutral-50/40' : ''
                      }`}
                    >
                      <Cell value={v} />
                    </td>
                  ))}
                </tr>
              )
            })}

            {/* Onboarding row */}
            <tr>
              <td className="sticky left-0 border-x border-t border-black/10 bg-[#fafaf9] px-4 py-4 text-sm font-medium text-neutral-950">
                Onboarding fee (one-time)
              </td>
              {TIERS.map((t) => (
                <td
                  key={t.id}
                  className={`border-x border-t border-black/10 bg-white px-4 py-4 ${
                    t.highlight ? 'bg-neutral-50/40' : ''
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
                  <p className="mt-1 text-[11px] font-medium text-neutral-700">
                    20% off — Onboarding pricing
                  </p>
                </td>
              ))}
            </tr>

            {/* Day 0 cost */}
            <tr>
              <td className="sticky left-0 border-x border-t border-black/10 bg-[#fafaf9] px-4 py-3 text-sm font-medium text-neutral-950">
                Day 0 cost{' '}
                <span className="text-xs text-neutral-500">(onboarding only)</span>
              </td>
              {TIERS.map((t) => (
                <td
                  key={t.id}
                  className={`border-x border-t border-black/10 bg-white px-4 py-3 font-mono text-base font-medium text-neutral-950 ${
                    t.highlight ? 'bg-neutral-50/40' : ''
                  }`}
                >
                  {formatPrice(t.onboarding)}
                </td>
              ))}
            </tr>

            {/* Monthly begins */}
            <tr>
              <td className="sticky left-0 border-x border-t border-black/10 bg-[#fafaf9] px-4 py-3 text-sm font-medium text-neutral-950">
                Monthly subscription{' '}
                <span className="text-xs text-neutral-500">(begins ~Day 28)</span>
              </td>
              {TIERS.map((t) => (
                <td
                  key={t.id}
                  className={`border-x border-t border-black/10 bg-white px-4 py-3 text-base text-neutral-950 ${
                    t.highlight ? 'bg-neutral-50/40' : ''
                  }`}
                >
                  <span className="font-mono">{formatPrice(t.monthly)}</span>
                  <span className="text-sm text-neutral-500">/mo</span>
                </td>
              ))}
            </tr>

            {/* ROI */}
            {showRoiBand && (
              <tr>
                <td
                  colSpan={5}
                  className="border-x border-black/10 bg-neutral-50/50 px-4 pb-2 pt-7 text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-500"
                >
                  ROI break-even
                </td>
              </tr>
            )}
            {showRoiBand && (
              <tr>
                <td className="sticky left-0 border-x border-t border-black/10 bg-[#fafaf9] px-4 py-3 text-sm text-neutral-600">
                  1 small catalog deal pays for…
                </td>
                {TIERS.map((t) => {
                  const months = Math.ceil(5000 / t.monthly)
                  return (
                    <td
                      key={t.id}
                      className={`border-x border-t border-black/10 bg-white px-4 py-3 text-sm text-neutral-950 ${
                        t.highlight ? 'bg-neutral-50/40' : ''
                      }`}
                    >
                      {months}+ months
                    </td>
                  )
                })}
              </tr>
            )}

            {/* CTA */}
            <tr>
              <td className="sticky left-0 border-x border-b border-black/10 bg-[#fafaf9] px-4 py-6 first:rounded-bl-xl"></td>
              {TIERS.map((t) => (
                <td
                  key={t.id}
                  className={`border-x border-b border-black/10 bg-white px-4 py-6 last:rounded-br-xl ${
                    t.highlight ? 'bg-neutral-50/40' : ''
                  }`}
                >
                  <Link
                    href={t.ctaHref}
                    className={`block w-full rounded-lg px-4 py-2.5 text-center text-sm font-medium transition-colors ${
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

      {showRoiBand && (
        <p className="mt-4 px-2 text-xs text-neutral-500">
          ROI assumes one $50,000 catalog deal at 10% commission ($5,000). Most scouts close
          their first deal within 60–90 days of going live.
        </p>
      )}
    </div>
  )
}
