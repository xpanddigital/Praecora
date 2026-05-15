import Link from 'next/link'
import { Check, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
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

  // Volume group
  { label: 'OUTREACH VOLUME', values: ['', '', '', ''], group: 'header' },
  { label: 'Active outreach personas', values: TIERS.map((t) => String(t.igAccounts)) },
  { label: 'Cold DMs / day', values: TIERS.map((t) => String(t.dmsPerDay)) },
  { label: 'Cold DMs / month', values: TIERS.map((t) => `~${t.dmsPerMonth.toLocaleString()}`) },
  { label: 'Expected replies / month', values: TIERS.map((t) => t.expectedRepliesMo) },
  { label: 'Expected calls booked / month', values: TIERS.map((t) => t.expectedCallsMo) },
  { label: 'Expected deals / month (typical)', values: TIERS.map((t) => t.expectedDealsMo) },

  // Platform
  { label: 'PLATFORM', values: ['', '', '', ''], group: 'header' },
  { label: 'CrateHQ dashboard (CRM, pipeline, deals)', values: [true, true, true, true] },
  { label: 'Artist database + auto-research', values: [true, true, true, true] },
  { label: 'Multi-channel unified inbox', values: [true, true, true, true] },
  { label: 'Email outreach campaigns', values: [true, true, true, true] },
  { label: 'Analytics + reporting', values: [true, true, true, true] },
  { label: 'Mobile-friendly inbox', values: [true, true, true, true] },

  // AI Tools
  { label: 'AI TOOLS', values: ['', '', '', ''], group: 'header' },
  { label: 'AI cold opener drafter', values: [true, true, true, true] },
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
  { label: 'Initial content seeding', values: [true, true, true, true] },
  { label: 'Onboarding timeline', values: ['~4 weeks', '~4 weeks', '~4 weeks', '~4 weeks'] },
]

function formatPrice(n: number) {
  return `$${n.toLocaleString()}`
}

function Cell({ value }: { value: string | boolean }) {
  if (value === true) {
    return <Check className="h-4 w-4 text-primary" aria-label="Included" />
  }
  if (value === false) {
    return <Minus className="h-4 w-4 text-muted-foreground/40" aria-label="Not included" />
  }
  return <span className="text-sm text-foreground">{value}</span>
}

export function PricingTable({ showRoiBand = true }: { showRoiBand?: boolean }) {
  return (
    <div className="w-full">
      {/* Tier headers (sticky on scroll for long tables) */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="sticky left-0 w-[260px] bg-background pb-4 pl-4 text-left align-bottom"></th>
              {TIERS.map((t) => (
                <th
                  key={t.id}
                  className={cn(
                    'relative w-[160px] border-x border-t border-border/40 bg-card px-4 pb-4 pt-6 text-left align-top first:rounded-tl-xl last:rounded-tr-xl',
                    t.highlight && 'bg-primary/5 ring-1 ring-inset ring-primary/30'
                  )}
                >
                  {t.badge && (
                    <span
                      className={cn(
                        'absolute -top-3 left-4 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider',
                        t.id === 'growth'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-foreground text-background'
                      )}
                    >
                      ★ {t.badge}
                    </span>
                  )}
                  <p className="text-base font-semibold text-foreground">{t.name}</p>
                  <p className="mt-1 text-3xl font-semibold tracking-tight text-foreground">
                    {formatPrice(t.monthly)}
                    <span className="text-sm font-normal text-muted-foreground">/mo</span>
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    or {formatPrice(t.annual)}/yr
                    <span className="ml-1 text-primary">(save 2 mo)</span>
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
                      className="border-x border-border/40 bg-card/50 px-4 pb-2 pt-6 text-[11px] font-semibold uppercase tracking-wider text-primary"
                    >
                      {row.label}
                    </td>
                  </tr>
                )
              }
              return (
                <tr key={i} className="group">
                  <td className="sticky left-0 border-x border-t border-border/40 bg-background px-4 py-3 text-sm text-muted-foreground">
                    {row.label}
                  </td>
                  {row.values.map((v, j) => (
                    <td
                      key={j}
                      className={cn(
                        'border-x border-t border-border/40 bg-card px-4 py-3',
                        TIERS[j].highlight && 'bg-primary/5'
                      )}
                    >
                      <Cell value={v} />
                    </td>
                  ))}
                </tr>
              )
            })}

            {/* Onboarding row (special) */}
            <tr>
              <td className="sticky left-0 border-x border-t border-border/40 bg-background px-4 py-4 text-sm font-medium text-foreground">
                Onboarding fee (one-time)
              </td>
              {TIERS.map((t) => (
                <td
                  key={t.id}
                  className={cn(
                    'border-x border-t border-border/40 bg-card px-4 py-4',
                    t.highlight && 'bg-primary/5'
                  )}
                >
                  <div>
                    <span className="text-base font-semibold text-foreground">
                      {formatPrice(t.onboarding)}
                    </span>
                    <span className="ml-2 text-xs text-muted-foreground line-through">
                      {formatPrice(t.onboardingOriginal)}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-primary">20% off — Onboarding pricing</p>
                </td>
              ))}
            </tr>

            {/* Day 0 cost */}
            <tr>
              <td className="sticky left-0 border-x border-t border-border/40 bg-background px-4 py-3 text-sm font-medium text-foreground">
                Day 0 cost <span className="text-xs text-muted-foreground">(onboarding only)</span>
              </td>
              {TIERS.map((t) => (
                <td
                  key={t.id}
                  className={cn(
                    'border-x border-t border-border/40 bg-card px-4 py-3 text-base font-semibold text-foreground',
                    t.highlight && 'bg-primary/5'
                  )}
                >
                  {formatPrice(t.onboarding)}
                </td>
              ))}
            </tr>

            {/* Monthly begins */}
            <tr>
              <td className="sticky left-0 border-x border-t border-border/40 bg-background px-4 py-3 text-sm font-medium text-foreground">
                Monthly subscription <span className="text-xs text-muted-foreground">(begins ~Day 28)</span>
              </td>
              {TIERS.map((t) => (
                <td
                  key={t.id}
                  className={cn(
                    'border-x border-t border-border/40 bg-card px-4 py-3 text-base text-foreground',
                    t.highlight && 'bg-primary/5'
                  )}
                >
                  {formatPrice(t.monthly)}/mo
                </td>
              ))}
            </tr>

            {/* ROI band */}
            {showRoiBand && (
              <tr>
                <td
                  colSpan={5}
                  className="border-x border-border/40 bg-card/50 px-4 pb-2 pt-6 text-[11px] font-semibold uppercase tracking-wider text-primary"
                >
                  ROI break-even
                </td>
              </tr>
            )}
            {showRoiBand && (
              <tr>
                <td className="sticky left-0 border-x border-t border-border/40 bg-background px-4 py-3 text-sm text-muted-foreground">
                  1 small catalog deal pays for…
                </td>
                {TIERS.map((t) => {
                  const months = Math.ceil(5000 / t.monthly)
                  return (
                    <td
                      key={t.id}
                      className={cn(
                        'border-x border-t border-border/40 bg-card px-4 py-3 text-sm text-foreground',
                        t.highlight && 'bg-primary/5'
                      )}
                    >
                      {months}+ months
                    </td>
                  )
                })}
              </tr>
            )}

            {/* CTA row */}
            <tr>
              <td className="sticky left-0 border-x border-b border-border/40 bg-background px-4 py-6 first:rounded-bl-xl"></td>
              {TIERS.map((t) => (
                <td
                  key={t.id}
                  className={cn(
                    'border-x border-b border-border/40 bg-card px-4 py-6 last:rounded-br-xl',
                    t.highlight && 'bg-primary/5'
                  )}
                >
                  <Link
                    href={t.ctaHref}
                    className={cn(
                      'block w-full rounded-lg px-4 py-2.5 text-center text-sm font-medium transition-opacity hover:opacity-90',
                      t.highlight
                        ? 'bg-primary text-primary-foreground'
                        : 'border border-border bg-background text-foreground'
                    )}
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
        <p className="mt-4 px-2 text-xs text-muted-foreground">
          ROI assumes one $50,000 catalog deal at 10% commission ($5,000). Most scouts close
          their first deal within 60–90 days of going live.
        </p>
      )}
    </div>
  )
}
