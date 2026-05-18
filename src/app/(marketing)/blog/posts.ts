/**
 * Praecora blog — typed post registry.
 *
 * Source of truth for the listing page, sitemap, related-post links,
 * and internal cross-references. Each blog post route under
 * /src/app/(marketing)/blog/<slug>/page.tsx must have a matching
 * entry here.
 */

export type BlogPost = {
  slug: string
  title: string
  description: string
  /** ISO date — used for sitemap lastmod and visible publish date. */
  publishedAt: string
  /** ISO date if the post was substantively revised. */
  updatedAt?: string
  /** Visible byline + JSON-LD author. Single author for now. */
  author: {
    name: string
    role: string
  }
  /** Rounded reading time minutes, manually set for accuracy. */
  readingTime: number
  /** Funnel stage — drives CTA tuning later. */
  funnel: 'TOFU' | 'MOFU' | 'BOFU'
  /** Pillar bucket — used for "more from this pillar" surface. */
  pillar:
    | 'broker-playbook'
    | 'ig-outreach-without-bans'
    | 'closing-catalog-deals'
    | 'tools-and-comparisons'
  /** Tags for filtering + JSON-LD keywords. */
  tags: string[]
  /** Featured = surfaced at top of listing. */
  featured?: boolean
}

const JOEL: BlogPost['author'] = {
  name: 'Joel House',
  role: 'Founder, Praecora',
}

/**
 * Posts are listed newest-first. Order here is the display order on
 * /blog. Publish dates are staggered backwards from the launch date
 * so the listing reads like a normal editorial cadence rather than
 * "we shipped 10 posts in one day."
 */
export const POSTS: BlogPost[] = [
  {
    slug: 'best-crm-for-music-catalog-scouts',
    title:
      'The Best CRM for Music Catalog Scouts and Brokers in 2026',
    description:
      'Generic CRMs were built for B2B SaaS sales. Music catalog scouting is a different sport. Here\'s what actually matters in a tool for this work — and why most software fails at it.',
    publishedAt: '2026-05-18',
    author: JOEL,
    readingTime: 11,
    funnel: 'BOFU',
    pillar: 'tools-and-comparisons',
    tags: ['CRM', 'music industry', 'catalog scouts', 'sales pipeline', 'tools'],
    featured: true,
  },
  {
    slug: 'run-multiple-instagram-accounts-without-bans',
    title:
      'How to Run 7 Instagram Accounts Without Getting Banned: The 2026 Playbook',
    description:
      'Multiple Instagram accounts collapse inside 90 days for most operators — and the four structural fixes that keep an account fleet alive for 12+ months. Written from inside an operation that lost everything and rebuilt it.',
    publishedAt: '2026-05-16',
    author: JOEL,
    readingTime: 14,
    funnel: 'MOFU',
    pillar: 'ig-outreach-without-bans',
    tags: [
      'Instagram',
      'account safety',
      'multi-account',
      'cloud phones',
      'ban prevention',
    ],
    featured: true,
  },
  {
    slug: 'music-catalog-financing-broker-playbook',
    title:
      'The Music Catalog Financing Broker Playbook: Sourcing Indie Deals for 10% Commission',
    description:
      'The independent music industry has $200M+ of fresh capital chasing catalog deals — and almost no formal job description for the people who source them. Here\'s how the role actually works, what scouts earn, and how to break in.',
    publishedAt: '2026-05-14',
    author: JOEL,
    readingTime: 18,
    funnel: 'TOFU',
    pillar: 'broker-playbook',
    tags: [
      'music catalog',
      'royalty advance',
      'A&R',
      'commission sales',
      'career',
    ],
    featured: true,
  },
  {
    slug: 'cold-dm-indie-artists-instagram',
    title:
      'How to Cold DM Indie Artists on Instagram: Templates, Reply Rates, and What Actually Works',
    description:
      'Most cold DM templates were written for SMMA sales. Indie artists are not your typical B2B prospect. Here\'s the operator\'s guide to opening lines, follow-up cadence, and the messages that get replies from artists worth a catalog deal.',
    publishedAt: '2026-05-12',
    author: JOEL,
    readingTime: 13,
    funnel: 'MOFU',
    pillar: 'closing-catalog-deals',
    tags: ['cold DM', 'Instagram', 'templates', 'indie artists', 'outreach'],
  },
  {
    slug: 'praecora-vs-manychat',
    title:
      'Praecora vs ManyChat: Why Music Scouts Need More Than a Chatbot',
    description:
      'Looking for a ManyChat alternative for cold outbound sales? ManyChat is a great tool, but it\'s the wrong tool for sourcing music catalog deals. Here\'s the architectural reason cold-outbound operators can\'t use comment-keyword chatbots — and what a deal-flow platform looks like instead.',
    publishedAt: '2026-05-10',
    author: JOEL,
    readingTime: 9,
    funnel: 'BOFU',
    pillar: 'tools-and-comparisons',
    tags: ['ManyChat', 'comparison', 'Instagram automation', 'CRM'],
  },
  {
    slug: 'cloud-phones-for-instagram-geelark-bitbrowser-multilogin',
    title:
      'Cloud Phones for Instagram Outreach: GeeLark vs BitBrowser vs Multilogin (2026)',
    description:
      'The best antidetect browser is no longer a browser — it\'s a cloud phone. Here\'s how the three serious cloud phone vendors (GeeLark, BitBrowser, Multilogin) compare for music catalog scouts running 5+ Instagram accounts in parallel, and why antidetect browser tooling alone stopped being enough in 2024.',
    publishedAt: '2026-05-08',
    author: JOEL,
    readingTime: 12,
    funnel: 'MOFU',
    pillar: 'ig-outreach-without-bans',
    tags: ['cloud phones', 'GeeLark', 'BitBrowser', 'Multilogin', 'antidetect'],
  },
  {
    slug: 'music-catalog-financing-explained',
    title:
      'Music Catalog Financing, Explained: How Indie Artists Get Funded and Who Sources the Deals',
    description:
      'Royalty advances, catalog buyouts, term advances — the financial products fueling indie music in 2026, who provides them, and where independent scouts fit into the deal flow.',
    publishedAt: '2026-05-06',
    author: JOEL,
    readingTime: 15,
    funnel: 'TOFU',
    pillar: 'broker-playbook',
    tags: [
      'music catalog',
      'royalty advance',
      'catalog buyout',
      'music finance',
      'explainer',
    ],
  },
  {
    slug: 'music-catalog-buyer-directory-2026',
    title:
      'The Music Catalog Buyer Directory: Every Active Indie Buyer in 2026',
    description:
      'beatBread. Xposure Music. Connect Music. Symphonic. RoyFi. Intercept. Futures. Twenty-plus active buyers placing capital into independent catalogs right now — minimum deal sizes, advance multiples, and what each one actually buys.',
    publishedAt: '2026-05-04',
    author: JOEL,
    readingTime: 16,
    funnel: 'TOFU',
    pillar: 'broker-playbook',
    tags: ['buyer directory', 'beatBread', 'Xposure', 'Symphonic', 'RoyFi'],
  },
  {
    slug: 'instagram-dm-limits-2026',
    title:
      'Instagram DM Limits in 2026: How Scouts Send 140 a Day Without a Ban',
    description:
      'The 200/hour API rate limit is the floor, not the ceiling. The real limit is what Instagram\'s spam-detection model tolerates from a brand-new account — and how that scales as accounts age. The volume math, by account age.',
    publishedAt: '2026-05-02',
    author: JOEL,
    readingTime: 10,
    funnel: 'MOFU',
    pillar: 'ig-outreach-without-bans',
    tags: ['Instagram', 'DM limits', 'rate limits', 'account warm-up'],
  },
  {
    slug: 'praecora-vs-pipedrive',
    title:
      'Praecora vs Pipedrive: Why Generic CRMs Fail Music Industry Sales',
    description:
      'Looking for a Pipedrive alternative for music industry sales? Pipedrive is great for deals you already have, but music catalog scouting is mostly about the conversations that come before a deal exists. Here\'s why pipeline-first CRMs break for this work — and what fits instead.',
    publishedAt: '2026-04-30',
    author: JOEL,
    readingTime: 10,
    funnel: 'BOFU',
    pillar: 'tools-and-comparisons',
    tags: ['Pipedrive', 'comparison', 'CRM', 'music industry'],
  },
]

export const POSTS_BY_SLUG: Record<string, BlogPost> = Object.fromEntries(
  POSTS.map((p) => [p.slug, p]),
)

export function getPostBySlug(slug: string): BlogPost | undefined {
  return POSTS_BY_SLUG[slug]
}

export function getRelatedPosts(
  currentSlug: string,
  limit: number = 3,
): BlogPost[] {
  const current = POSTS_BY_SLUG[currentSlug]
  if (!current) return POSTS.slice(0, limit)
  // Same-pillar first, then anything else, never include self.
  const samePillar = POSTS.filter(
    (p) => p.slug !== currentSlug && p.pillar === current.pillar,
  )
  const others = POSTS.filter(
    (p) => p.slug !== currentSlug && p.pillar !== current.pillar,
  )
  return [...samePillar, ...others].slice(0, limit)
}

export const PILLAR_LABELS: Record<BlogPost['pillar'], string> = {
  'broker-playbook': 'The Broker Playbook',
  'ig-outreach-without-bans': 'Outreach Without Bans',
  'closing-catalog-deals': 'Closing Catalog Deals',
  'tools-and-comparisons': 'Tools & Comparisons',
}
