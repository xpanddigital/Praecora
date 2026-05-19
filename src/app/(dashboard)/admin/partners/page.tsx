import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

type PartnerRow = {
  id: string
  slug: string
  name: string
  email: string | null
  commission_rate: number
  is_active: boolean
}

type ChargeRow = {
  scout_id: string
  amount_cents: number
  kind: 'onboarding' | 'subscription' | 'refund'
  commission_rate: number | null
}

type ScoutRow = {
  id: string
  email: string
  subscription_tier: string
  status: string
}

function formatUsd(cents: number) {
  return `$${(cents / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export default async function AdminPartnersPage() {
  const supabase = await createClient()

  const { data: partners } = await supabase
    .from('partners')
    .select('id, slug, name, email, commission_rate, is_active')
    .order('created_at', { ascending: true })

  const partnerList = (partners ?? []) as PartnerRow[]

  // Fetch charges + scouts for every partner in parallel, then render synchronously
  const sections = await Promise.all(
    partnerList.map(async partner => {
      const [{ data: charges }, { data: scoutsForPartner }] = await Promise.all([
        supabase
          .from('scout_charges')
          .select('scout_id, amount_cents, kind, commission_rate')
          .eq('commission_partner_id', partner.id),
        supabase
          .from('scouts')
          .select('id, email, subscription_tier, status')
          .eq('commission_partner_id', partner.id)
          .order('created_at', { ascending: false }),
      ])

      const chargeList: ChargeRow[] = (charges ?? []) as ChargeRow[]
      const scoutList: ScoutRow[] = (scoutsForPartner ?? []) as ScoutRow[]

      const totals = chargeList.reduce(
        (acc, c) => {
          const rate = Number(c.commission_rate ?? partner.commission_rate)
          const owed = Math.round(c.amount_cents * rate)
          if (c.kind === 'onboarding') {
            acc.onboardingCharged += c.amount_cents
            acc.onboardingOwed += owed
          } else if (c.kind === 'subscription') {
            acc.recurringCharged += c.amount_cents
            acc.recurringOwed += owed
          } else if (c.kind === 'refund') {
            acc.refundsCharged += c.amount_cents
            acc.refundsOwed += owed
          }
          return acc
        },
        {
          onboardingCharged: 0,
          onboardingOwed: 0,
          recurringCharged: 0,
          recurringOwed: 0,
          refundsCharged: 0,
          refundsOwed: 0,
        }
      )

      const totalCharged =
        totals.onboardingCharged + totals.recurringCharged + totals.refundsCharged
      const totalOwed =
        totals.onboardingOwed + totals.recurringOwed + totals.refundsOwed

      return { partner, scoutList, totals, totalCharged, totalOwed }
    })
  )

  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-white">Partners</h1>
        <p className="mt-1 text-sm text-neutral-400">
          Commission accrual by partner. Computed from{' '}
          <code className="text-xs">scout_charges</code> using the rate snapshotted at
          time of charge.
        </p>
      </header>

      {sections.length === 0 ? (
        <p className="text-sm text-neutral-500">No partners yet.</p>
      ) : (
        <div className="space-y-10">
          {sections.map(({ partner, scoutList, totals, totalCharged, totalOwed }) => (
            <section key={partner.id} className="rounded-lg border border-white/10 p-6">
              <div className="flex items-baseline justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">{partner.name}</h2>
                  <p className="text-xs text-neutral-500">
                    Slug <code>{partner.slug}</code> · Rate{' '}
                    {(Number(partner.commission_rate) * 100).toFixed(0)}% ·{' '}
                    {partner.is_active ? 'active' : 'inactive'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-wider text-neutral-500">
                    Total owed
                  </p>
                  <p className="font-mono text-2xl text-white">{formatUsd(totalOwed)}</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
                <div className="rounded border border-white/5 p-3">
                  <p className="text-xs uppercase tracking-wider text-neutral-500">Onboarding</p>
                  <p className="mt-1 font-mono text-white">
                    {formatUsd(totals.onboardingCharged)}
                  </p>
                  <p className="text-xs text-neutral-400">
                    Owed {formatUsd(totals.onboardingOwed)}
                  </p>
                </div>
                <div className="rounded border border-white/5 p-3">
                  <p className="text-xs uppercase tracking-wider text-neutral-500">Recurring</p>
                  <p className="mt-1 font-mono text-white">
                    {formatUsd(totals.recurringCharged)}
                  </p>
                  <p className="text-xs text-neutral-400">
                    Owed {formatUsd(totals.recurringOwed)}
                  </p>
                </div>
                <div className="rounded border border-white/5 p-3">
                  <p className="text-xs uppercase tracking-wider text-neutral-500">Refunds</p>
                  <p className="mt-1 font-mono text-white">
                    {formatUsd(totals.refundsCharged)}
                  </p>
                  <p className="text-xs text-neutral-400">
                    Owed {formatUsd(totals.refundsOwed)}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Referred scouts · {scoutList.length}
                </p>
                {scoutList.length === 0 ? (
                  <p className="text-xs text-neutral-500">None yet.</p>
                ) : (
                  <ul className="space-y-1 text-sm">
                    {scoutList.map(s => (
                      <li
                        key={s.id}
                        className="flex items-center justify-between border-b border-white/5 py-1.5"
                      >
                        <span className="font-mono text-xs text-neutral-300">{s.email}</span>
                        <span className="text-xs text-neutral-500">
                          {s.subscription_tier} · {s.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <p className="mt-6 text-xs text-neutral-500">
                Lifetime total revenue collected:{' '}
                <strong>{formatUsd(totalCharged)}</strong>
              </p>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
