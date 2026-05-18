import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Eyebrow } from '@/components/marketing/Ornament'
import {
  type BlogPost,
  PILLAR_LABELS,
  getRelatedPosts,
  isPublished,
} from '@/app/(marketing)/blog/posts'

/**
 * The shell every Praecora blog post lives inside. Owns:
 * - hero (eyebrow / title / dek / byline)
 * - structured-data Article JSON-LD
 * - footer CTA to /demo
 * - related-posts surface
 *
 * Each post page imports this and passes its post metadata + content.
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

  return (
    <article>
      <ArticleJsonLd post={post} />

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

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-black/5 pt-6">
            <div>
              <p className="text-sm font-semibold text-[#0f0d08]">
                {post.author.name}
              </p>
              <p className="text-xs text-neutral-500">{post.author.role}</p>
            </div>
            <span className="text-neutral-300" aria-hidden>
              ·
            </span>
            <p className="text-xs text-neutral-500">
              Published <time dateTime={post.publishedAt}>{publishedDateLabel}</time>
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
 * Schema.org Article JSON-LD. Helps both Google's classic web-page
 * understanding and the LLM-citation surfaces (Praecora's audience
 * runs heavy ChatGPT/Perplexity research).
 */
function ArticleJsonLd({ post }: { post: BlogPost }) {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Praecora',
      url: 'https://www.praecora.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.praecora.com/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  )
}
