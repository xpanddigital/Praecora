'use client'

import { useMemo, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import { Loader2 } from 'lucide-react'

type Partner = { name: string; slug: string } | null

type Scout = {
  id: string
  email: string
  full_name: string | null
  status: 'onboarding' | 'live' | 'cancelled' | 'refunded'
  subscription_tier: 'starter' | 'growth' | 'pro' | 'whale'
  billing_cycle: 'monthly' | 'annual'
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  onboarding_paid_at: string | null
  subscription_started_at: string | null
  commission_partner_id: string | null
  referral_code: string | null
  partners: Partner
}

const MRR_BY_TIER: Record<Scout['subscription_tier'], { monthly: number; annual: number }> = {
  starter: { monthly: 700, annual: 7000 },
  growth: { monthly: 1400, annual: 14000 },
  pro: { monthly: 2200, annual: 22000 },
  whale: { monthly: 2800, annual: 28000 },
}

function mrrFor(s: Scout): number {
  const v = MRR_BY_TIER[s.subscription_tier]
  return s.billing_cycle === 'annual' ? Math.round(v.annual / 12) : v.monthly
}

function daysSince(iso: string | null): number | null {
  if (!iso) return null
  const ms = Date.now() - new Date(iso).getTime()
  return Math.floor(ms / (1000 * 60 * 60 * 24))
}

export function ScoutsAdminClient({ initialScouts }: { initialScouts: Scout[] }) {
  const { toast } = useToast()
  const [scouts, setScouts] = useState<Scout[]>(initialScouts)
  const [busyId, setBusyId] = useState<string | null>(null)

  const onboarding = useMemo(() => scouts.filter(s => s.status === 'onboarding'), [scouts])
  const live = useMemo(() => scouts.filter(s => s.status === 'live'), [scouts])
  const totalMrr = useMemo(() => live.reduce((sum, s) => sum + mrrFor(s), 0), [live])

  async function markLive(scout: Scout) {
    setBusyId(scout.id)
    try {
      const res = await fetch(`/api/admin/scouts/${scout.id}/go-live`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await res.json()
      if (!res.ok) {
        toast({ title: 'Could not mark live', description: data.error ?? 'Unknown error', variant: 'destructive' })
        return
      }
      toast({ title: 'Scout is live', description: `Subscription ${data.subscription_id} created.` })
      setScouts(prev =>
        prev.map(s =>
          s.id === scout.id
            ? {
                ...s,
                status: 'live',
                stripe_subscription_id: data.subscription_id,
                subscription_started_at: new Date().toISOString(),
              }
            : s
        )
      )
    } catch (err: any) {
      toast({ title: 'Network error', description: err?.message ?? '', variant: 'destructive' })
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-white">Scouts (billing)</h1>
        <p className="mt-1 text-sm text-neutral-400">
          Manage onboarding queue and live subscriptions. Mark a scout live to begin
          recurring billing.
        </p>
      </header>

      <section className="mb-10">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
            Onboarding queue · {onboarding.length}
          </h2>
        </div>
        {onboarding.length === 0 ? (
          <p className="text-sm text-neutral-500">No scouts currently onboarding.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Cycle</TableHead>
                <TableHead>Paid</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Referral</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {onboarding.map(s => {
                const days = daysSince(s.onboarding_paid_at)
                return (
                  <TableRow key={s.id}>
                    <TableCell className="font-mono text-xs">{s.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{s.subscription_tier}</Badge>
                    </TableCell>
                    <TableCell className="text-xs text-neutral-400">{s.billing_cycle}</TableCell>
                    <TableCell className="text-xs text-neutral-400">
                      {s.onboarding_paid_at
                        ? new Date(s.onboarding_paid_at).toLocaleDateString()
                        : '—'}
                    </TableCell>
                    <TableCell>
                      {days != null ? (
                        <span
                          className={
                            days >= 28
                              ? 'text-green-400'
                              : days >= 21
                              ? 'text-yellow-400'
                              : 'text-neutral-400'
                          }
                        >
                          {days}d
                        </span>
                      ) : (
                        '—'
                      )}
                    </TableCell>
                    <TableCell className="text-xs text-neutral-500">
                      {s.partners?.name ?? s.referral_code ?? '—'}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        disabled={busyId === s.id || !s.stripe_customer_id}
                        onClick={() => markLive(s)}
                      >
                        {busyId === s.id ? (
                          <>
                            <Loader2 className="mr-2 h-3 w-3 animate-spin" /> Working…
                          </>
                        ) : (
                          'Mark live'
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
      </section>

      <section>
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
            Live · {live.length}
          </h2>
          <p className="text-sm text-neutral-400">
            MRR{' '}
            <span className="font-mono text-white">${totalMrr.toLocaleString()}</span>
          </p>
        </div>
        {live.length === 0 ? (
          <p className="text-sm text-neutral-500">No live scouts yet.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Cycle</TableHead>
                <TableHead>Live since</TableHead>
                <TableHead>Referral</TableHead>
                <TableHead className="text-right">MRR</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {live.map(s => (
                <TableRow key={s.id}>
                  <TableCell className="font-mono text-xs">{s.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{s.subscription_tier}</Badge>
                  </TableCell>
                  <TableCell className="text-xs text-neutral-400">{s.billing_cycle}</TableCell>
                  <TableCell className="text-xs text-neutral-400">
                    {s.subscription_started_at
                      ? new Date(s.subscription_started_at).toLocaleDateString()
                      : '—'}
                  </TableCell>
                  <TableCell className="text-xs text-neutral-500">
                    {s.partners?.name ?? s.referral_code ?? '—'}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    ${mrrFor(s).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </section>
    </div>
  )
}
