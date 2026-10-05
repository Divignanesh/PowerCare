import { Helmet } from 'react-helmet-async'
import {
  BASE_URL,
  OG_IMAGE,
  PAGE_META,
  localBusinessSchema,
  websiteSchema,
  webPageSchema,
  breadcrumbSchema,
} from './schema'

/**
 * Per-page head tags and JSON-LD. Pass `page` (a PAGE_META key), or `meta`
 * ({ title, description, path, trail? }) for pages built from data, such as
 * a job posting.
 */
const SEO = ({ page, meta: own, extraSchemas = [], ogType = 'website' }) => {
  const meta = own || PAGE_META[page] || PAGE_META.home
  const url = `${BASE_URL}${meta.path}`

  const schemas = [
    localBusinessSchema,
    websiteSchema,
    webPageSchema(meta),
    breadcrumbSchema(meta),
    ...extraSchemas,
  ]

  return (
    <Helmet prioritizeSeoTags>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={url} />

      {/* Let Google use full-size images and untruncated snippets. */}
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />

      {/* Social previews. Every page is pre-rendered at build time
          (scripts/prerender.mjs), so these reach crawlers that never run
          JavaScript. */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="PowerCare Health Services" />
      <meta property="og:locale" content="en_CA" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="PowerCare Health Services" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={OG_IMAGE} />

      {/* JSON-LD Structured Data */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  )
}

export default SEO
