import { createClient } from '@/lib/supabase/server'
import { ScoutsAdminClient } from './ScoutsAdminClient'

export const dynamic = 'force-dynamic'

export default async function AdminScoutsPage() {
  const supabase = await createClient()

  const { data: scouts } = await supabase
    .from('scouts')
    .select(
      `
      id, email, full_name, status,
      subscription_tier, billing_cycle,
      stripe_customer_id, stripe_subscription_id,
      onboarding_paid_at, subscription_started_at,
      commission_partner_id, referral_code,
      partners:commission_partner_id ( name, slug )
    `
    )
    .order('onboarding_paid_at', { ascending: true })

  return <ScoutsAdminClient initialScouts={(scouts ?? []) as any} />
}
