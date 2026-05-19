/**
 * Canonical Person entity for Joel House — used identically on every
 * Xpand-ecosystem property (Praecora, MentionLayer, GetPressforge,
 * Xpand Digital) per the AUTHOR-AUTHORITY-HUB-BRIEF.
 *
 * RULE: do NOT modify these values per-site. The entire point of the
 * pattern is that Google's entity resolver clusters signals across
 * properties — inconsistency breaks the cluster. If any value here
 * needs changing, change it on JoelHouse.com first and propagate.
 *
 * The @id `https://joelhouse.com/#person` is the load-bearing
 * identifier that ties every Article schema across every property to
 * the same Person. Every blog post's Article.author references this
 * @id rather than embedding a Person object inline.
 */

export const JOEL_HOUSE_PERSON_ID = 'https://joelhouse.com/#person'
export const JOEL_HOUSE_AUTHOR_URL = 'https://joelhouse.com/about'
export const JOEL_HOUSE_HEADSHOT_URL =
  'https://joelhouse.com/joel-house-headshot.jpg'

/**
 * Canonical bios per the brief. Use VERBATIM — do not rewrite to fit
 * Praecora's voice. The bio is the bio.
 */
export const JOEL_HOUSE_BIO_LONG =
  "Joel House is the founder of Joel House Search Media and Xpand Digital, and a member of the Forbes Agency Council. He is the author of AI for Revenue, a practical guide for businesses adapting to AI-driven search. Joel built MentionLayer — a Generative Engine Optimization platform — to help businesses appear in AI-generated answers from ChatGPT, Perplexity, Google AI Overviews, and Claude. His work focuses on the intersection of search, entity authority, and the new mechanics of how AI systems decide which brands to cite. Joel has run the AI Visibility Index study series, including a controlled three-layer experiment proving that off-page signals causally drive AI visibility. He writes about SEO, GEO, and AI search at JoelHouse.com."

export const JOEL_HOUSE_BIO_SHORT =
  "Joel House is the founder of Joel House Search Media and Xpand Digital, a Forbes Agency Council member, and author of AI for Revenue. He writes about AI search and Generative Engine Optimization at JoelHouse.com."

export const JOEL_HOUSE_BIO_ONELINE =
  "Founder of Joel House Search Media and Xpand Digital. Forbes Agency Council. Author of AI for Revenue. Writes about GEO and AI visibility at JoelHouse.com."

/**
 * The sameAs array — canonical and identical on every Xpand property.
 * Per the brief, do not invent URLs; if any are placeholders, fix on
 * JoelHouse.com first and propagate here.
 */
export const JOEL_HOUSE_SAME_AS: readonly string[] = [
  'https://joelhouse.com',
  'https://joelhousesearchmedia.com.au',
  'https://xpanddigital.io',
  'https://mentionlayer.com',
  'https://www.linkedin.com/in/joelhouse',
  'https://twitter.com/joelhouse',
  'https://councils.forbes.com/profile/Joel-House-Founder-Joel-House-Search-Media',
  'https://www.amazon.com/author/joelhouse',
]

/**
 * Canonical Person JSON-LD. Emit on the /author/joel-house page and on
 * every blog post (alongside the Article schema in an @graph array).
 *
 * The `jobTitle` is the canonical "Founder, Joel House Search Media"
 * — NOT "Founder, Praecora" or whatever the per-site role is. This is
 * the entity-graph jobTitle, used by Google for the Knowledge Panel.
 * Per-site visible bylines can show "Founder, Praecora" for context.
 */
export function getJoelHousePersonJsonLd() {
  return {
    '@type': 'Person',
    '@id': JOEL_HOUSE_PERSON_ID,
    name: 'Joel House',
    url: 'https://joelhouse.com',
    image: JOEL_HOUSE_HEADSHOT_URL,
    jobTitle: 'Founder, Joel House Search Media',
    description: JOEL_HOUSE_BIO_ONELINE,
    worksFor: [
      {
        '@type': 'Organization',
        name: 'Joel House Search Media',
        url: 'https://joelhousesearchmedia.com.au',
      },
      {
        '@type': 'Organization',
        name: 'Xpand Digital',
        url: 'https://xpanddigital.io',
      },
      {
        '@type': 'Organization',
        name: 'MentionLayer',
        url: 'https://mentionlayer.com',
      },
    ],
    knowsAbout: [
      'Generative Engine Optimization',
      'Search Engine Optimization',
      'AI Visibility',
      'Digital Marketing',
      'Entity SEO',
    ],
    sameAs: JOEL_HOUSE_SAME_AS,
  }
}
