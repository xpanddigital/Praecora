export type Tier = {
  id: 'starter' | 'growth' | 'pro' | 'whale'
  name: string
  badge?: string
  bestFor: string
  monthly: number
  annual: number
  onboarding: number
  onboardingOriginal: number
  igAccounts: number
  dmsPerDay: number
  dmsPerMonth: number
  emailsPerDay: number
  emailsPerMonth: number
  totalTouchesPerMonth: number
  expectedRepliesMo: string
  expectedCallsMo: string
  expectedDealsMo: string
  ctaLabel: string
  ctaHref: string
  highlight?: boolean
}

export const TIERS: Tier[] = [
  {
    id: 'starter',
    name: 'Starter',
    bestFor: 'Testing the model',
    monthly: 700,
    annual: 7000,
    onboarding: 397,
    onboardingOriginal: 497,
    igAccounts: 1,
    dmsPerDay: 20,
    dmsPerMonth: 440,
    emailsPerDay: 100,
    emailsPerMonth: 2200,
    totalTouchesPerMonth: 2640,
    expectedRepliesMo: '~80–130',
    expectedCallsMo: '~6–18',
    expectedDealsMo: '1–3',
    ctaLabel: 'Start with Starter',
    ctaHref: '/checkout/starter',
  },
  {
    id: 'growth',
    name: 'Growth',
    badge: 'POPULAR',
    bestFor: 'Scaling solo scout',
    monthly: 1400,
    annual: 14000,
    onboarding: 797,
    onboardingOriginal: 997,
    igAccounts: 3,
    dmsPerDay: 60,
    dmsPerMonth: 1320,
    emailsPerDay: 250,
    emailsPerMonth: 5500,
    totalTouchesPerMonth: 6820,
    expectedRepliesMo: '~200–340',
    expectedCallsMo: '~15–45',
    expectedDealsMo: '3–8',
    ctaLabel: 'Start with Growth',
    ctaHref: '/checkout/growth',
    highlight: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    badge: 'BEST VALUE',
    bestFor: 'Serious operator',
    monthly: 2200,
    annual: 22000,
    onboarding: 1197,
    onboardingOriginal: 1497,
    igAccounts: 5,
    dmsPerDay: 100,
    dmsPerMonth: 2200,
    emailsPerDay: 400,
    emailsPerMonth: 8800,
    totalTouchesPerMonth: 11000,
    expectedRepliesMo: '~330–550',
    expectedCallsMo: '~25–75',
    expectedDealsMo: '5–14',
    ctaLabel: 'Start with Pro',
    ctaHref: '/checkout/pro',
  },
  {
    id: 'whale',
    name: 'Whale',
    bestFor: 'Top performer',
    monthly: 2800,
    annual: 28000,
    onboarding: 1597,
    onboardingOriginal: 1997,
    igAccounts: 7,
    dmsPerDay: 140,
    dmsPerMonth: 3080,
    emailsPerDay: 600,
    emailsPerMonth: 13200,
    totalTouchesPerMonth: 16280,
    expectedRepliesMo: '~490–820',
    expectedCallsMo: '~40–110',
    expectedDealsMo: '8–20',
    ctaLabel: 'Talk to us',
    ctaHref: '/demo?tier=whale',
  },
]
