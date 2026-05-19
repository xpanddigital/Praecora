import { ImageResponse } from 'next/og'
import { getPostBySlug, PILLAR_LABELS } from '@/app/(marketing)/blog/posts'

/**
 * Dynamic Open Graph image for individual blog posts. Each blog post's
 * metadata.openGraph.images points to /api/og?slug=<slug>, which looks
 * up the post from the registry and renders a custom card with the
 * post's title and pillar.
 *
 * Why this exists: without per-post OG images, every shared blog link
 * (in iMessage, Slack, LinkedIn, Twitter/X) would show the same generic
 * Praecora wordmark card. With per-post images, the share preview shows
 * the actual article title — meaningfully better click-through.
 *
 * The image generation is edge-cached after first request; Vercel
 * effectively memoizes the response per slug. No re-render cost per
 * subsequent fetch.
 */

export const runtime = 'edge'

async function loadGoogleFont(
  family: string,
  weight: number,
  italic: boolean,
  text: string,
): Promise<ArrayBuffer> {
  const axes = italic ? `ital,wght@1,${weight}` : `wght@${weight}`
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    family,
  )}:${axes}&text=${encodeURIComponent(text)}`
  const cssRes = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
  })
  if (!cssRes.ok) {
    throw new Error(`Google Fonts CSS fetch failed for ${family}`)
  }
  const css = await cssRes.text()
  const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)
  if (!match) {
    throw new Error(`Could not parse font URL for ${family}`)
  }
  const fontRes = await fetch(match[1])
  if (!fontRes.ok) {
    throw new Error(`Font file fetch failed for ${family}`)
  }
  return await fontRes.arrayBuffer()
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')

  if (!slug) {
    return new Response('Missing slug parameter', { status: 400 })
  }

  const post = getPostBySlug(slug)
  if (!post) {
    return new Response('Post not found', { status: 404 })
  }

  const eyebrow = PILLAR_LABELS[post.pillar]
  // Truncate the title for the OG card so we don't blow past the layout
  // on a long title. 110 chars is roughly the longest that fits at 56px.
  const title = post.title.length > 110
    ? post.title.slice(0, 107).trimEnd() + '…'
    : post.title

  // Subset fonts to only the chars we render, to keep the fetched font
  // files tiny at edge cold-start.
  const cormorantText = 'Praecora ✻'
  const dmSansText = title + eyebrow + ' Field guide '

  const [cormorant, dmSans, dmSansBold] = await Promise.all([
    loadGoogleFont('Cormorant Garamond', 600, true, cormorantText),
    loadGoogleFont('DM Sans', 400, false, dmSansText),
    loadGoogleFont('DM Sans', 600, false, dmSansText),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#faf8f3',
          display: 'flex',
          flexDirection: 'column',
          padding: '72px 80px',
          backgroundImage:
            'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(232, 255, 71, 0.18), transparent 70%)',
        }}
      >
        {/* Top: brand row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontFamily: 'Cormorant Garamond',
              fontStyle: 'italic',
              fontWeight: 600,
              fontSize: '52px',
              color: '#0f0d08',
              letterSpacing: '-0.02em',
            }}
          >
            Praecora
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              color: '#525252',
              fontFamily: 'DM Sans',
              fontSize: '16px',
              fontWeight: 600,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
            }}
          >
            <div
              style={{
                display: 'flex',
                width: '28px',
                height: '2px',
                background: '#b8531d',
              }}
            />
            Field guide
          </div>
        </div>

        {/* Middle: title + pillar */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
            marginTop: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              color: '#b8531d',
              fontFamily: 'DM Sans',
              fontSize: '18px',
              fontWeight: 600,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              marginBottom: '32px',
            }}
          >
            <div
              style={{
                display: 'flex',
                width: '36px',
                height: '2px',
                background: '#b8531d',
              }}
            />
            {eyebrow}
          </div>
          <div
            style={{
              display: 'flex',
              fontFamily: 'DM Sans',
              fontSize: '60px',
              fontWeight: 600,
              color: '#0f0d08',
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
              maxWidth: '1040px',
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom: ornament + footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '20px',
              color: '#b8531d',
              fontFamily: 'Cormorant Garamond',
              fontStyle: 'italic',
              fontSize: '28px',
              opacity: 0.7,
            }}
          >
            <span style={{ display: 'flex' }}>✻</span>
            <span style={{ display: 'flex' }}>✻</span>
            <span style={{ display: 'flex' }}>✻</span>
          </div>
          <div
            style={{
              display: 'flex',
              fontFamily: 'DM Sans',
              fontSize: '20px',
              color: '#525252',
            }}
          >
            praecora.com
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Cormorant Garamond',
          data: cormorant,
          style: 'italic',
          weight: 600,
        },
        { name: 'DM Sans', data: dmSans, style: 'normal', weight: 400 },
        { name: 'DM Sans', data: dmSansBold, style: 'normal', weight: 600 },
      ],
    },
  )
}
