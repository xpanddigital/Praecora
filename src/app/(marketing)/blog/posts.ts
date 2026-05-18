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
  // ─────────────── TIER 2 — weekly drops, starting 2026-05-25 ───────────────
  {
    slug: 'cold-email-templates-music-industry-sales',
    title:
      'Cold Email Templates for Music Industry Sales (That Actually Get Replies)',
    description:
      'Most cold email templates are written for B2B SaaS. Music industry contacts — managers, labels, A&Rs — pattern-match on those templates instantly and delete. Here are the email structures that actually open doors in music catalog finance, with real examples and follow-up cadences.',
    publishedAt: '2026-05-25',
    author: JOEL,
    readingTime: 12,
    funnel: 'MOFU',
    pillar: 'closing-catalog-deals',
    tags: ['cold email', 'templates', 'music industry', 'outreach'],
  },
  {
    slug: 'antidetect-browsers-explained-cloud-phone-replacement',
    title:
      'Antidetect Browsers Explained (and Why Cloud Phones Replaced Them in 2024)',
    description:
      'The best antidetect browser used to be enough for multi-account Instagram. Then Meta\'s risk model started weighing mobile-device signals over web signals, and the entire category changed. Here\'s what antidetect browsers do, what they no longer cover, and why operators moved to cloud phones.',
    publishedAt: '2026-06-01',
    author: JOEL,
    readingTime: 13,
    funnel: 'MOFU',
    pillar: 'ig-outreach-without-bans',
    tags: ['antidetect browser', 'cloud phones', 'multi-account', 'Instagram'],
  },
  {
    slug: 'facebook-business-portfolio-multi-account-instagram',
    title:
      'Setting Up a Facebook Business Portfolio for Multi-Account Instagram (Without Risking Your Real Facebook)',
    description:
      'The Facebook Business Portfolio is the hidden infrastructure layer behind every multi-account Instagram operation. Set it up wrong and one ban cascades to every account; set it up right and the blast radius stops at one Page. Here\'s the operator\'s guide.',
    publishedAt: '2026-06-08',
    author: JOEL,
    readingTime: 11,
    funnel: 'MOFU',
    pillar: 'ig-outreach-without-bans',
    tags: [
      'Facebook Business Portfolio',
      'multi-account',
      'Instagram',
      'account safety',
    ],
  },
  {
    slug: 'beatbread-review-2026-indie-catalog-deals',
    title:
      'beatBread Review 2026: How It Works for Indie Catalog Deals',
    description:
      'beatBread is the largest indie-focused royalty advance platform in 2026 — $100M+ deployed across 1,700+ funding agreements. Here\'s an honest, operator\'s-perspective review of how the deals work, who qualifies, what scouts should know, and where beatBread fits in the broader buyer landscape.',
    publishedAt: '2026-06-15',
    author: JOEL,
    readingTime: 12,
    funnel: 'TOFU',
    pillar: 'broker-playbook',
    tags: ['beatBread', 'royalty advance', 'review', 'indie music'],
  },
  {
    slug: 'chartmetric-for-music-catalog-scouts',
    title:
      'Chartmetric for Music Catalog Scouts: What to Look at Before Pitching',
    description:
      'Chartmetric is the most-used music data platform in catalog finance underwriting. For scouts sourcing deals, it\'s the qualification engine that decides which artists are worth pitching. Here\'s exactly what to look at — and what most operators miss.',
    publishedAt: '2026-06-22',
    author: JOEL,
    readingTime: 11,
    funnel: 'MOFU',
    pillar: 'closing-catalog-deals',
    tags: ['Chartmetric', 'qualification', 'streaming data', 'music industry'],
  },
  {
    slug: 'pipedrive-alternatives-for-outreach-teams',
    title:
      'Best Pipedrive Alternatives for Outreach-First Sales Teams (2026)',
    description:
      'Pipedrive is excellent at managing deals you already have. For teams whose work is mostly cold outreach before any deal exists, Pipedrive\'s pipeline-first design fights the shape of the work. Here\'s a breakdown of the alternatives that fit outreach-heavy sales motions.',
    publishedAt: '2026-06-29',
    author: JOEL,
    readingTime: 10,
    funnel: 'BOFU',
    pillar: 'tools-and-comparisons',
    tags: ['Pipedrive', 'alternatives', 'CRM', 'sales outreach'],
  },
  {
    slug: 'instagram-dm-bots-why-cold-outbound-avoids-them',
    title:
      'Instagram DM Bots: Why Cold-Outbound Operators Avoid Them',
    description:
      'Instagram DM bots are great for warm-trigger marketing — replying to story replies, comment keywords, ad clicks. They\'re the wrong tool for cold-outbound sales sourcing. Here\'s the architectural reason, and what cold-outbound operators use instead.',
    publishedAt: '2026-07-06',
    author: JOEL,
    readingTime: 10,
    funnel: 'BOFU',
    pillar: 'tools-and-comparisons',
    tags: ['Instagram DM bot', 'automation', 'cold outbound', 'comparison'],
  },
  {
    slug: 'email-warm-up-explained-sender-domains',
    title:
      'Email Warm-Up Explained: Why New Sender Domains Need It (and How Long It Actually Takes)',
    description:
      'Cold email deliverability lives or dies on sender reputation. New sending domains start with zero reputation and earn it through controlled warm-up sequences. Here\'s what warm-up actually does, how long it takes, and what most warm-up tools get wrong.',
    publishedAt: '2026-07-13',
    author: JOEL,
    readingTime: 11,
    funnel: 'MOFU',
    pillar: 'ig-outreach-without-bans',
    tags: [
      'email warm-up',
      'cold email',
      'deliverability',
      'sender reputation',
    ],
  },
  {
    slug: 'how-to-become-ar-scout-independent-path',
    title:
      'How to Become an A&R Scout in 2026 (The Independent Path, Not the Label Path)',
    description:
      'Most A&R scout career guides assume you want to work inside a major label. There\'s a parallel path almost nobody writes about: independent commission-based catalog scout. Same skills, different revenue model, different ceiling. Here\'s how the independent route works in 2026.',
    publishedAt: '2026-07-20',
    author: JOEL,
    readingTime: 14,
    funnel: 'TOFU',
    pillar: 'broker-playbook',
    tags: ['A&R scout', 'music career', 'independent', 'commission sales'],
  },
  {
    slug: 'music-catalog-valuation-multiples-2026',
    title:
      'Music Catalog Valuation Multiples: 2026 Indie Deal Math',
    description:
      'How does $24K/year in streaming income become a $288K advance? Or sometimes a $144K one for the same income? The valuation multiple math behind indie catalog finance — what drives it up, what drives it down, and how to estimate a fair offer before talking to a buyer.',
    publishedAt: '2026-07-27',
    author: JOEL,
    readingTime: 13,
    funnel: 'TOFU',
    pillar: 'broker-playbook',
    tags: ['valuation', 'multiples', 'catalog finance', 'royalty math'],
  },
  {
    slug: 'instagram-automation-tools-2026',
    title:
      'Instagram Automation Tools 2026: The Operator\'s Map',
    description:
      'Twenty-plus Instagram automation tools exist. They\'re built for different jobs: scheduling, chatbot replies, comment management, scraping, cold outbound. Operators who pick the wrong category waste months. Here\'s the working map by job, with where Praecora fits and where it doesn\'t.',
    publishedAt: '2026-08-03',
    author: JOEL,
    readingTime: 12,
    funnel: 'BOFU',
    pillar: 'tools-and-comparisons',
    tags: [
      'Instagram automation',
      'tools',
      'categories',
      'comparison',
    ],
  },
  {
    slug: 'sales-crm-small-business-niche-fit',
    title:
      'Sales CRM for Small Business: When Generic Tools Stop Fitting',
    description:
      'HubSpot, Pipedrive, Zoho, Salesforce — the same five names dominate every "best sales CRM for small business" listicle. They\'re excellent at the work they were built for. They\'re also wrong-shaped for several specific kinds of small businesses. Here\'s how to tell which camp you\'re in.',
    publishedAt: '2026-08-10',
    author: JOEL,
    readingTime: 11,
    funnel: 'BOFU',
    pillar: 'tools-and-comparisons',
    tags: ['sales CRM', 'small business', 'niche industries', 'comparison'],
  },
  {
    slug: 'music-promotion-platforms-vs-outreach-tools',
    title:
      'Music Promotion Platforms vs Outreach Tools: A 2026 Map for Indie Operators',
    description:
      'Music promotion platforms (SubmitHub, Groover, Playlist Push) and music sales outreach tools (Praecora, Instantly + Apollo stacks) get conflated constantly. They do different jobs. Here\'s the map — when to use each, and why mixing them up wastes budget.',
    publishedAt: '2026-08-17',
    author: JOEL,
    readingTime: 11,
    funnel: 'BOFU',
    pillar: 'tools-and-comparisons',
    tags: [
      'music promotion',
      'marketing platforms',
      'outreach tools',
      'comparison',
    ],
  },
  {
    slug: 'smartlead-instantly-lemlist-compared-music-industry',
    title:
      'Smartlead vs Instantly vs Lemlist: Honest Comparison for Music Industry Outreach',
    description:
      'Smartlead, Instantly, and Lemlist are the three serious cold email infrastructure tools in 2026. None of them were built for music industry outreach specifically — and the differences matter when you\'re pitching managers and labels. Here\'s the operator\'s comparison.',
    publishedAt: '2026-08-24',
    author: JOEL,
    readingTime: 13,
    funnel: 'BOFU',
    pillar: 'tools-and-comparisons',
    tags: ['Smartlead', 'Instantly', 'Lemlist', 'cold email', 'comparison'],
  },
  {
    slug: 'independent-music-distribution-vs-catalog-buyers',
    title:
      'Independent Music Distribution Companies vs Catalog Buyers: What\'s the Difference?',
    description:
      'TuneCore, DistroKid, CD Baby, United Masters — distributors. beatBread, Symphonic Advances, Xposure Music — catalog buyers. The two categories overlap in confusing ways, and the wrong choice for the wrong reason costs indie artists serious money. Here\'s the clean breakdown.',
    publishedAt: '2026-08-31',
    author: JOEL,
    readingTime: 12,
    funnel: 'TOFU',
    pillar: 'broker-playbook',
    tags: [
      'music distribution',
      'catalog buyers',
      'TuneCore',
      'DistroKid',
      'comparison',
    ],
  },
  {
    slug: 'instagram-account-warm-up-7-day-checklist',
    title:
      'Instagram Account Warm-Up: The 7-Day Checklist for New Outreach Accounts',
    description:
      'Brand-new Instagram Business accounts that immediately send DMs get banned within hours — Instagram\'s anti-abuse model is unforgiving toward unwarmed accounts. Here\'s the daily warm-up sequence we run on every new account in our fleet, with specific actions per day.',
    publishedAt: '2026-09-07',
    author: JOEL,
    readingTime: 9,
    funnel: 'MOFU',
    pillar: 'ig-outreach-without-bans',
    tags: ['Instagram warm-up', 'account safety', 'new account', 'checklist'],
  },
  {
    slug: 'royalty-advance-vs-catalog-sale-indie-artists',
    title:
      'Royalty Advance vs Catalog Sale: Which Should Indie Artists Pick?',
    description:
      'A royalty advance and a catalog sale look similar to artists who haven\'t done either — both are big checks against future income. They\'re structurally very different. Here\'s the honest breakdown of when each one is the right choice (and when neither is).',
    publishedAt: '2026-09-14',
    author: JOEL,
    readingTime: 12,
    funnel: 'TOFU',
    pillar: 'broker-playbook',
    tags: [
      'royalty advance',
      'catalog sale',
      'comparison',
      'indie artists',
    ],
  },
  {
    slug: 'va-workflow-music-catalog-outreach',
    title:
      'The VA Workflow for Music Catalog Outreach: Hiring, Training, and Daily Operations',
    description:
      'A serious music catalog scouting operation needs at least one virtual assistant — Instagram\'s cold-opener manual-send requirement makes this non-negotiable above ~50 DMs/day. Here\'s how to hire, train, and run a VA for this work, from someone who\'s done it across multiple operations.',
    publishedAt: '2026-09-21',
    author: JOEL,
    readingTime: 13,
    funnel: 'MOFU',
    pillar: 'closing-catalog-deals',
    tags: ['virtual assistant', 'operations', 'hiring', 'music outreach'],
  },
  {
    slug: 'instagram-business-vs-creator-account-outreach',
    title:
      'Instagram Business vs Creator Account for Outreach: Which Should Scouts Use?',
    description:
      'Instagram offers three account types: Personal, Creator, and Business. Cold outbound outreach requires specific capabilities only some account types support. Here\'s the breakdown of what each account type permits and which one to use for catalog scouting.',
    publishedAt: '2026-09-28',
    author: JOEL,
    readingTime: 9,
    funnel: 'MOFU',
    pillar: 'ig-outreach-without-bans',
    tags: ['Instagram business', 'Instagram creator', 'account type', 'API'],
  },
  {
    slug: 'spotify-for-artists-data-catalog-buyers',
    title:
      'Spotify for Artists Data: What Catalog Buyers Look at Before Underwriting',
    description:
      'When a buyer underwrites a catalog finance deal, the first data they want is the artist\'s Spotify for Artists statements. Here\'s exactly which fields matter, what the buyer is calculating from them, and how scouts can pre-qualify deals before pitching.',
    publishedAt: '2026-10-05',
    author: JOEL,
    readingTime: 11,
    funnel: 'MOFU',
    pillar: 'closing-catalog-deals',
    tags: [
      'Spotify for Artists',
      'streaming data',
      'underwriting',
      'qualification',
    ],
  },
]

export const POSTS_BY_SLUG: Record<string, BlogPost> = Object.fromEntries(
  POSTS.map((p) => [p.slug, p]),
)

export function getPostBySlug(slug: string): BlogPost | undefined {
  return POSTS_BY_SLUG[slug]
}

/**
 * Is the post visible to the public yet? Used to gate future-scheduled
 * posts from the listing, related-posts surface, and direct slug routes.
 *
 * Compares UTC dates so the visibility flip happens at 00:00 UTC on
 * publish day — predictable across deployment regions.
 */
export function isPublished(
  post: BlogPost,
  asOf: Date = new Date(),
): boolean {
  return new Date(post.publishedAt + 'T00:00:00Z') <= asOf
}

/**
 * The subset of POSTS that should be visible publicly right now.
 * Always order newest-published-first. Future-scheduled posts are
 * excluded — they flip to visible automatically on their `publishedAt`
 * once ISR revalidates (pages have `revalidate = 3600`).
 */
export function getVisiblePosts(asOf: Date = new Date()): BlogPost[] {
  return POSTS.filter((p) => isPublished(p, asOf))
}

export function getRelatedPosts(
  currentSlug: string,
  limit: number = 3,
  asOf: Date = new Date(),
): BlogPost[] {
  const current = POSTS_BY_SLUG[currentSlug]
  const visible = getVisiblePosts(asOf)
  if (!current) return visible.slice(0, limit)
  // Same-pillar first, then anything else, never include self,
  // and never include posts that aren't published yet.
  const samePillar = visible.filter(
    (p) => p.slug !== currentSlug && p.pillar === current.pillar,
  )
  const others = visible.filter(
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
