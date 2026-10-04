import { Helmet } from 'react-helmet-async'
import { services } from '../../data/services'
import { PHONE_ENABLED, PHONE_E164, EMAIL, SOCIAL_PROFILES, ADDRESS } from '../../data/contact'

const BASE_URL = 'https://www.powercarestaffing.ca'
const OG_IMAGE = `${BASE_URL}/og-image.jpg`
const ORG_ID = `${BASE_URL}/#organization`
const SITE_ID = `${BASE_URL}/#website`

/* ─────────────────────────── The organisation ───────────────────────────
 * One node, referenced by @id from every other node on every page, so search
 * engines resolve the whole site to a single entity rather than to seven
 * unrelated businesses. EmploymentAgency is the type that actually describes
 * what this is; LocalBusiness keeps the map and opening-hours treatment.
 */
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'EmploymentAgency'],
  '@id': ORG_ID,
  name: 'PowerCare Health Services',
  alternateName: 'PowerCare',
  legalName: 'PowerCare Health Inc.',
  slogan: 'Good care starts with good people.',
  description:
    'PowerCare Health Services is a healthcare staffing agency in Mississauga, Ontario. It places vetted, in-house trained RNs, RPNs, PSWs, DSWs, occupational therapists, speech-language pathologists, psychotherapists and dietitians in long-term care, retirement, home and community settings across the Greater Toronto Area and rural Ontario.',
  url: BASE_URL,
  ...(PHONE_ENABLED ? { telephone: PHONE_E164 } : {}),
  email: EMAIL,
  priceRange: '$$',
  currenciesAccepted: 'CAD',
  logo: {
    '@type': 'ImageObject',
    '@id': `${BASE_URL}/#logo`,
    url: `${BASE_URL}/logo-wordmark.png`,
    contentUrl: `${BASE_URL}/logo-wordmark.png`,
    caption: 'PowerCare Health Services',
  },
  image: OG_IMAGE,
  contactPoint: [
    {
      '@type': 'ContactPoint',
      ...(PHONE_ENABLED ? { telephone: PHONE_E164 } : {}),
      email: EMAIL,
      contactType: 'emergency staffing dispatch',
      areaServed: 'CA-ON',
      availableLanguage: ['English'],
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    },
    {
      '@type': 'ContactPoint',
      ...(PHONE_ENABLED ? { telephone: PHONE_E164 } : {}),
      email: EMAIL,
      contactType: 'customer service',
      areaServed: 'CA-ON',
      availableLanguage: ['English'],
    },
  ],
  knowsAbout: [
    'Healthcare staffing',
    'Nursing agency staffing',
    'Long-term care staffing',
    'Personal Support Worker placement',
    'Developmental Support Worker placement',
    'Occupational therapy staffing',
    'Speech-language pathology staffing',
    'Psychotherapy staffing',
    'Respite care staffing',
  ],
  areaServed: [
    { '@type': 'City', name: 'Toronto' },
    { '@type': 'City', name: 'Mississauga' },
    { '@type': 'City', name: 'Brampton' },
    { '@type': 'City', name: 'Oakville' },
    { '@type': 'City', name: 'Barrie' },
    { '@type': 'City', name: 'Hamilton' },
    { '@type': 'City', name: 'Guelph' },
    { '@type': 'AdministrativeArea', name: 'Greater Toronto Area' },
    { '@type': 'AdministrativeArea', name: 'Rural Ontario' },
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: ADDRESS.street,
    addressLocality: ADDRESS.locality,
    addressRegion: ADDRESS.region,
    postalCode: ADDRESS.postalCode,
    addressCountry: ADDRESS.country,
  },
  // Approximate centroid for the L5R postal area — worth replacing with the
  // exact pin from the Google Business Profile once that listing is claimed.
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 43.6089,
    longitude: -79.6441,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '20:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
      description: '24/7 emergency dispatch available',
    },
  ],
  // sameAs is populated from SOCIAL_PROFILES in src/data/contact.js. It stays
  // out of the payload entirely while that list is empty — claiming profiles
  // that 404 is worse for the entity graph than claiming none at all.
  ...(SOCIAL_PROFILES.length ? { sameAs: SOCIAL_PROFILES.map((p) => p.url) } : {}),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Healthcare Staffing Services',
    itemListElement: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: `${s.title} Staffing`,
        serviceType: s.title,
        description: s.shortDesc,
        provider: { '@id': ORG_ID },
        areaServed: { '@type': 'AdministrativeArea', name: 'Ontario, Canada' },
      },
    })),
  },
}

/** The site itself — the node Google hangs the brand name and sitelinks off. */
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: BASE_URL,
  name: 'PowerCare Health Services',
  inLanguage: 'en-CA',
  publisher: { '@id': ORG_ID },
}

// Titles stay under 60 characters and descriptions under 160 so neither is
// truncated in results. Descriptions say what the page is, never promise.
const PAGE_META = {
  home: {
    title: 'PowerCare Health Services | Healthcare Staffing in Ontario',
    crumb: 'Home',
    description:
      'PowerCare places in-house trained nurses, PSWs and allied health staff in long-term care, retirement and community settings across the GTA and rural Ontario.',
    path: '/',
  },
  about: {
    title: 'About Us | PowerCare Health Services',
    crumb: 'About Us',
    description:
      'Who we are, why PowerCare was started, and the values behind how we care for older adults and the people who look after them across Ontario.',
    path: '/about',
  },
  whyPowerCare: {
    title: 'Why PowerCare | PowerCare Health Services',
    crumb: 'Why PowerCare',
    description:
      'Good care starts with good people. How PowerCare trains the nurses and support workers it places, and what working with us feels like.',
    path: '/why-powercare',
  },
  services: {
    title: 'Our Services | PowerCare Health Services',
    crumb: 'Our Services',
    description:
      'RNs, RPNs, PSWs, DSWs, dietitians, OTs, SLPs and psychotherapists placed in long-term care, retirement, home and community settings across Ontario.',
    path: '/services',
  },
  industries: {
    title: 'Industries We Serve | PowerCare Health Services',
    crumb: 'Industries We Serve',
    description:
      'Staffing for long-term care, retirement residences, home and community care, group homes, rehabilitation and mental health services in Ontario.',
    path: '/industries',
  },
  careers: {
    title: 'Careers | PowerCare Health Services',
    crumb: 'Careers',
    description:
      'Apply to work with PowerCare as an RN, RPN, PSW, DSW or allied health professional in care homes and communities across the GTA and rural Ontario.',
    path: '/careers',
  },
  contact: {
    title: 'Contact Us | PowerCare Health Services',
    crumb: 'Contact',
    description:
      'Get in touch with PowerCare about staffing your care home or agency, or about working with us. Serving the GTA and rural Ontario.',
    path: '/contact',
  },
}

/** FAQ schema for AEO — emitted on every page that shows an FAQ section. */
const faqSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
})

/** Home is the root, so it carries no trail beyond itself. */
const breadcrumbSchema = (meta) => {
  const trail = [{ name: 'Home', path: '/' }]
  if (meta.path !== '/') trail.push({ name: meta.crumb, path: meta.path })

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${BASE_URL}${c.path}`,
    })),
  }
}

const webPageSchema = (meta) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${BASE_URL}${meta.path}#webpage`,
  url: `${BASE_URL}${meta.path}`,
  name: meta.title,
  description: meta.description,
  inLanguage: 'en-CA',
  isPartOf: { '@id': SITE_ID },
  about: { '@id': ORG_ID },
  primaryImageOfPage: { '@type': 'ImageObject', url: OG_IMAGE },
})

/** The professions, as an explicit ordered list — used on /services. */
const servicesListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Healthcare professionals PowerCare places in Ontario',
  itemListOrder: 'https://schema.org/ItemListOrderAscending',
  numberOfItems: services.length,
  itemListElement: services.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Service',
      name: s.title,
      serviceType: s.title,
      description: s.fullDesc,
      category: s.category,
      provider: { '@id': ORG_ID },
      areaServed: { '@type': 'AdministrativeArea', name: 'Ontario, Canada' },
    },
  })),
}

const SEO = ({ page, extraSchemas = [] }) => {
  const meta = PAGE_META[page] || PAGE_META.home
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
      <meta property="og:type" content="website" />
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

export {
  SEO,
  faqSchema,
  servicesListSchema,
  PAGE_META,
  BASE_URL,
}
export default SEO
