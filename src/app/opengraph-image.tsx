import { ImageResponse } from 'next/og'

/**
 * Default Open Graph image for every Praecora page that doesn't declare
 * its own. Generated at request time by Vercel's edge runtime using
 * @vercel/og (next/og) and Satori. Cached aggressively after first
 * generation.
 *
 * iMessage, Twitter/X, Slack, LinkedIn, WhatsApp all read og:image to
 * build link previews. Without an explicit OG image, scrapers fall back
 * to whatever they find on the page — which is usually the wrong thing
 * (e.g. a founder photo from /public/founder/).
 *
 * Visual style matches the marketing-site brand:
 *   - Warm ivory background (#faf8f3) matching marketing.css
 *   - Cormorant Garamond italic 600 wordmark in near-black (#0f0d08)
 *   - Rust accent (#b8531d) for the printer's-ornament hairlines
 *   - DM Sans tagline
 */

export const runtime = 'edge'
export const alt = "Praecora — Outreach that doesn't feel like outreach"
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Fetch a Google Font subsetted to just the characters we render.
 * Subset fetching keeps the font file small and works around the fact
 * that Google's full font CSS embeds multiple unicode ranges that
 * @vercel/og can't parse.
 */
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
    // googleapis.com returns a richer/older CSS unless it sees a
    // browser-shaped User-Agent — which contains the truetype URL
    // we can actually fetch.
    headers: { 'User-Agent': 'Mozilla/5.0' },
  })
  if (!cssRes.ok) {
    throw new Error(`Google Fonts CSS fetch failed for ${family} (${cssRes.status})`)
  }
  const css = await cssRes.text()
  const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)
  if (!match) {
    throw new Error(`Could not parse font URL out of Google Fonts CSS for ${family}`)
  }
  const fontRes = await fetch(match[1])
  if (!fontRes.ok) {
    throw new Error(`Font file fetch failed for ${family} (${fontRes.status})`)
  }
  return await fontRes.arrayBuffer()
}

export default async function Image() {
  const wordmark = 'Praecora'
  const ornamentChar = '✻'
  const tagline = "Outreach that doesn't feel like outreach."

  // Load fonts in parallel; subset the character set so the fetched
  // font files are tiny.
  const [cormorant, dmSans] = await Promise.all([
    loadGoogleFont('Cormorant Garamond', 600, true, wordmark + ornamentChar),
    loadGoogleFont('DM Sans', 400, false, tagline + ' For music catalog scouts'),
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
          alignItems: 'center',
          justifyContent: 'center',
          padding: '64px',
          // Faint rust radial in the upper region matches the
          // marketing-hero-bg gradient on the live site.
          backgroundImage:
            'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(232, 255, 71, 0.18), transparent 70%)',
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            color: '#525252',
            fontFamily: 'DM Sans',
            fontSize: '20px',
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              display: 'flex',
              width: '40px',
              height: '2px',
              background: '#b8531d',
            }}
          />
          For music catalog scouts
        </div>

        {/* Wordmark */}
        <div
          style={{
            display: 'flex',
            fontFamily: 'Cormorant Garamond',
            fontStyle: 'italic',
            fontWeight: 600,
            fontSize: '240px',
            color: '#0f0d08',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          {wordmark}
        </div>

        {/* Ornament */}
        <div
          style={{
            display: 'flex',
            gap: '32px',
            color: '#b8531d',
            fontFamily: 'Cormorant Garamond',
            fontStyle: 'italic',
            fontSize: '36px',
            marginTop: '32px',
            opacity: 0.7,
          }}
        >
          <span style={{ display: 'flex' }}>{ornamentChar}</span>
          <span style={{ display: 'flex' }}>{ornamentChar}</span>
          <span style={{ display: 'flex' }}>{ornamentChar}</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            display: 'flex',
            fontFamily: 'DM Sans',
            fontSize: '38px',
            color: '#525252',
            marginTop: '32px',
            textAlign: 'center',
            maxWidth: '900px',
            lineHeight: 1.3,
          }}
        >
          {tagline}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Cormorant Garamond',
          data: cormorant,
          style: 'italic',
          weight: 600,
        },
        {
          name: 'DM Sans',
          data: dmSans,
          style: 'normal',
          weight: 400,
        },
      ],
    },
  )
}
