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
  name: 'PowerCare Health Staffing Solutions',
  alternateName: 'PowerCare',
  slogan: 'Trusted healthcare staffing solutions',
  description:
    'PowerCare is a trusted healthcare staffing agency serving the Greater Toronto Area and Rural Ontario. We place vetted, in-house trained RNs, RPNs, PSWs, DSWs, OTs, SLPs, Psychotherapists, Dietitians and support staff 24/7.',
  url: BASE_URL,
  ...(PHONE_ENABLED ? { telephone: PHONE_E164 } : {}),
  email: EMAIL,
  priceRange: '$$',
  currenciesAccepted: 'CAD',
  logo: {
    '@type': 'ImageObject',
    '@id': `${BASE_URL}/#logo`,
    url: `${BASE_URL}/logo.png`,
    contentUrl: `${BASE_URL}/logo.png`,
    caption: 'PowerCare Health Staffing Solutions',
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
  name: 'PowerCare Health Staffing Solutions',
  inLanguage: 'en-CA',
  publisher: { '@id': ORG_ID },
}

const PAGE_META = {
  home: {
    title: 'PowerCare | Trusted Healthcare Staffing Agency',
    crumb: 'Home',
    description:
      'Trusted healthcare staffing across the GTA and Rural Ontario. Vetted, in-house trained RNs, RPNs, PSWs, DSWs, OTs and SLPs — 24/7 emergency coverage.',
    path: '/',
  },
  about: {
    title: 'About PowerCare | Trusted Healthcare Staffing Agency',
    crumb: 'About Us',
    description:
      'The mission, values and team behind Ontario\'s trusted healthcare staffing partner — serving the GTA and Rural Ontario since day one.',
    path: '/about',
  },
  whyPowerCare: {
    title: 'Why PowerCare | Trusted Healthcare Staffing Agency',
    crumb: 'Why PowerCare',
    description:
      '80-hour in-house training, 10-step vetting, 24/7 dispatch and a fit guarantee — why Ontario facilities choose PowerCare over a typical agency.',
    path: '/why-powercare',
  },
  services: {
    title: 'Our Services | Trusted Healthcare Staffing Agency',
    crumb: 'Our Services',
    description:
      'Vetted RNs, RPNs, PSWs, DSWs, Dietitians, OTs, SLPs and Psychotherapists placed across every Ontario care setting. See every profession we staff.',
    path: '/services',
  },
  industries: {
    title: 'Industries We Serve | Trusted Staffing Agency Ontario',
    crumb: 'Industries We Serve',
    description:
      'Long-term care, hospitals, retirement residences, group homes, respite, rehab and mental health — staffed for the realities of each setting.',
    path: '/industries',
  },
  careers: {
    title: 'Find a Job | Trusted Healthcare Staffing Agency',
    crumb: 'Find a Job',
    description:
      'RN, RPN, PSW, DSW, OT, SLP and Psychotherapist jobs across Ontario. Dedicated recruiter, flexible shifts, weekly pay, free in-house training.',
    path: '/careers',
  },
  contact: {
    title: 'Contact Us | Trusted Healthcare Staffing Agency',
    crumb: 'Contact',
    description:
      'Urgent staffing support, career enquiries or partnerships — talk to a real coordinator. 24/7 dispatch across the GTA and Rural Ontario.',
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

const hiringHowToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Find a Healthcare Job Through PowerCare in Ontario',
  description:
    'PowerCare places RNs, PSWs, DSWs, OTs, SLPs and more across the GTA and Rural Ontario in 4 simple steps.',
  step: [
    { '@type': 'HowToStep', name: 'Apply or Connect', text: 'Submit your application online or call us. A recruiter will respond within 24 hours.' },
    { '@type': 'HowToStep', name: 'Job Matching', text: 'Your dedicated recruiter matches you with suitable roles from our Ontario facility network.' },
    { '@type': 'HowToStep', name: 'Interview Preparation', text: 'We prepare you for client interviews with coaching and documentation support.' },
    { '@type': 'HowToStep', name: 'Onboarding & Placement', text: 'We guide you through all onboarding paperwork — your first day starts smoothly.' },
  ],
}

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

      {/* og:* and twitter:* are served statically from index.html. Social
          crawlers do not execute JavaScript, so a Helmet copy would never
          reach them — it would only duplicate the tag for crawlers that do
          render. See the note in index.html. */}

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
  hiringHowToSchema,
  servicesListSchema,
  PAGE_META,
  BASE_URL,
}
export default SEO
