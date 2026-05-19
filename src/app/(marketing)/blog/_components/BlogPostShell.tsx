import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, ArrowLeft, ExternalLink } from 'lucide-react'
import { Eyebrow } from '@/components/marketing/Ornament'
import {
  type BlogPost,
  PILLAR_LABELS,
  getRelatedPosts,
  isPublished,
} from '@/app/(marketing)/blog/posts'
import {
  JOEL_HOUSE_BIO_SHORT,
  JOEL_HOUSE_HEADSHOT_URL,
  JOEL_HOUSE_PERSON_ID,
  getJoelHousePersonJsonLd,
} from '@/lib/joel-house-person'

/**
 * The shell every Praecora blog post lives inside. Owns:
 * - hero (eyebrow / title / dek / byline with avatar + link to author page)
 * - structured-data Article + Person JSON-LD as @graph
 * - rich "About the author" footer block with link to JoelHouse.com
 * - footer CTA to /demo
 * - related-posts surface
 *
 * Per the Author Authority Hub brief, the Article's `author` field
 * references the canonical Person by @id (rooted at JoelHouse.com).
 * The visible byline links to the local /author/joel-house page; the
 * About-the-author block links externally to JoelHouse.com — both
 * signals together tell Google's entity resolver that Joel House is
 * one person whose canonical home is JoelHouse.com.
 */
export function BlogPostShell({
  post,
  children,
}: {
  post: BlogPost
  children: React.ReactNode
}) {
  // Future-scheduled posts return 404 until their `publishedAt`. Pages
  // using this shell should also export `revalidate = 3600` so the 404
  // flips to the rendered article within an hour of the publish date.
  if (!isPublished(post)) {
    notFound()
  }

  const related = getRelatedPosts(post.slug, 3)
  const publishedDateLabel = formatDate(post.publishedAt)
  const updatedDateLabel = post.updatedAt ? formatDate(post.updatedAt) : null
  const modifiedIso = post.updatedAt ?? post.publishedAt

  return (
    <article>
      <ArticleAndPersonJsonLd post={post} modifiedIso={modifiedIso} />

      {/* ───────── HERO ───────── */}
      <header className="marketing-hero-bg border-b border-black/5 px-4 pt-16 pb-14 md:px-6 md:pt-24 md:pb-20">
        <div className="mx-auto w-full max-w-3xl">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <Eyebrow>{PILLAR_LABELS[post.pillar]}</Eyebrow>
            <span className="text-xs font-medium text-neutral-500">
              · {post.readingTime} min read
            </span>
          </div>

          <h1 className="text-balance text-4xl font-bold leading-[1.08] tracking-tight text-[#0f0d08] md:text-5xl lg:text-[3.25rem]">
            {post.title}
          </h1>

          <p className="mt-6 text-balance text-lg leading-relaxed text-neutral-600 md:text-xl">
            {post.description}
          </p>

          {/* Compact top byline: avatar + name (links to author page) +
              role + machine-readable dates. */}
          <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-black/5 pt-6">
            <Link
              href="/author/joel-house"
              className="group flex items-center gap-3"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={JOEL_HOUSE_HEADSHOT_URL}
                alt="Joel House"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full border border-black/10 object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-[#0f0d08] underline-offset-4 group-hover:underline">
                  {post.author.name}
                </p>
                <p className="text-xs text-neutral-500">{post.author.role}</p>
              </div>
            </Link>
            <span className="text-neutral-300" aria-hidden>
              ·
            </span>
            <p className="text-xs text-neutral-500">
              Published{' '}
              <time dateTime={post.publishedAt}>{publishedDateLabel}</time>
              {updatedDateLabel ? (
                <>
                  {' '}
                  · Updated{' '}
                  <time dateTime={post.updatedAt!}>{updatedDateLabel}</time>
                </>
              ) : null}
            </p>
          </div>
        </div>
      </header>

      {/* ───────── BODY ───────── */}
      <section className="bg-white px-4 py-20 md:px-6 md:py-28">{children}</section>

      {/* ───────── ABOUT THE AUTHOR ─────────
           Rich author block per the Author Authority Hub brief. The
           external link to JoelHouse.com is the load-bearing signal —
           tells Google this article was written by a person whose
           canonical profile lives off-site at JoelHouse.com. */}
      <section className="border-t border-black/5 bg-white px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto w-full max-w-3xl">
          <Eyebrow>About the author</Eyebrow>
          <div className="mt-6 flex flex-col items-start gap-6 md:flex-row md:gap-10">
            <Link
              href="/author/joel-house"
              className="shrink-0"
              aria-label="Joel House — author profile"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={JOEL_HOUSE_HEADSHOT_URL}
                alt="Joel House"
                width={96}
                height={96}
                className="h-24 w-24 rounded-full border border-black/10 object-cover shadow-sm"
              />
            </Link>
            <div className="flex-1">
              <p className="text-base font-semibold text-[#0f0d08]">
                Joel House
              </p>
              <p className="mt-3 text-base leading-relaxed text-neutral-700">
                {JOEL_HOUSE_BIO_SHORT}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <Link
                  href="/author/joel-house"
                  className="font-medium text-neutral-700 underline-offset-4 hover:text-[#0f0d08] hover:underline"
                >
                  More from Joel on Praecora →
                </Link>
                <a
                  href="https://joelhouse.com"
                  className="inline-flex items-center gap-1 font-medium text-[#b8531d] underline-offset-4 hover:underline"
                >
                  Read more about Joel at JoelHouse.com{' '}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <section className="border-t border-black/5 bg-[#faf8f3] px-4 py-24 md:px-6 md:py-28">
        <div className="mx-auto w-full max-w-3xl text-center">
          <Eyebrow>The herald that carries your message</Eyebrow>
          <h2 className="mt-6 text-balance text-3xl font-bold leading-[1.15] tracking-tight text-[#0f0d08] md:text-5xl">
            Stop sending DMs. Start closing deals.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-balance text-lg leading-relaxed text-neutral-600">
            Praecora carries personalized Instagram and email outreach to every
            artist worth knowing — at a volume no human can match, with the care
            no bot can fake. ~30 minutes of your time per day. The rest runs
            itself.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/demo" className="cta-primary">
              Book a 20-min demo <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/pricing" className="cta-secondary">
              See pricing
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── RELATED ───────── */}
      {related.length > 0 ? (
        <section className="border-t border-black/5 bg-white px-4 py-20 md:px-6 md:py-24">
          <div className="mx-auto w-full max-w-5xl">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <Eyebrow>Keep reading</Eyebrow>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#0f0d08] md:text-3xl">
                  More from the Praecora field guide
                </h2>
              </div>
              <Link
                href="/blog"
                className="hidden text-sm font-medium text-neutral-600 underline-offset-4 hover:text-[#0f0d08] hover:underline md:block"
              >
                All articles
                <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group block rounded-xl border border-black/5 bg-white p-6 transition-all hover:border-[#b8531d]/30 hover:shadow-sm"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#b8531d]">
                    {PILLAR_LABELS[r.pillar]}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-[#0f0d08] group-hover:text-[#7a2a0f]">
                    {r.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600 line-clamp-3">
                    {r.description}
                  </p>
                  <p className="mt-4 text-xs font-medium text-neutral-500">
                    {r.readingTime} min read
                  </p>
                </Link>
              ))}
            </div>

            <div className="mt-10 text-center md:hidden">
              <Link
                href="/blog"
                className="text-sm font-medium text-neutral-600 underline-offset-4 hover:text-[#0f0d08] hover:underline"
              >
                All articles
                <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {/* ───────── BACK TO BLOG ───────── */}
      <section className="border-t border-black/5 px-4 py-10 md:px-6">
        <div className="mx-auto w-full max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-[#0f0d08]"
          >
            <ArrowLeft className="h-4 w-4" /> Back to all articles
          </Link>
        </div>
      </section>
    </article>
  )
}

function formatDate(iso: string): string {
  // Render in a stable, locale-agnostic format so the static HTML
  // matches across environments (no SSR/CSR mismatch risk).
  const d = new Date(iso + 'T00:00:00Z')
  const month = d.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' })
  return `${month} ${d.getUTCDate()}, ${d.getUTCFullYear()}`
}

/**
 * Combined Article + Person JSON-LD in a single @graph block. Per the
 * Author Authority Hub brief, the Article's `author` field references
 * the canonical Person by @id (`https://joelhouse.com/#person`) rather
 * than embedding a separate Person inline. This means every blog post
 * across every Xpand property points at the SAME entity — which is
 * what Google's entity resolver clusters into a single Knowledge Graph
 * Person.
 */
function ArticleAndPersonJsonLd({
  post,
  modifiedIso,
}: {
  post: BlogPost
  modifiedIso: string
}) {
  const articleUrl = `https://www.praecora.com/blog/${post.slug}`
  const json = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${articleUrl}#article`,
        mainEntityOfPage: articleUrl,
        headline: post.title,
        description: post.description,
        image: `https://www.praecora.com/api/og?slug=${post.slug}`,
        datePublished: post.publishedAt,
        dateModified: modifiedIso,
        author: { '@id': JOEL_HOUSE_PERSON_ID },
        publisher: {
          '@type': 'Organization',
          '@id': 'https://www.praecora.com#organization',
          name: 'Praecora',
          url: 'https://www.praecora.com',
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.praecora.com/opengraph-image',
          },
        },
        keywords: post.tags.join(', '),
      },
      // Canonical Person — same shape on every Xpand property.
      getJoelHousePersonJsonLd(),
    ],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  )
}
