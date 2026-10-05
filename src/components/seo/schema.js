/*
 * Search and answer-engine data: the site's URL, every page's title and
 * description, and the JSON-LD builders. Kept apart from the <SEO> component
 * so the pre-renderer can import PAGE_META without React.
 */
import { services } from '../../data/services'
import { PHONE_ENABLED, PHONE_E164, EMAIL, SOCIAL_PROFILES, ADDRESS } from '../../data/contact'

export const BASE_URL = 'https://www.powercare.ca'
export const OG_IMAGE = `${BASE_URL}/og-image.jpg`
export const ORG_ID = `${BASE_URL}/#organization`
const SITE_ID = `${BASE_URL}/#website`

/* ─────────────────────────── The organisation ───────────────────────────
 * One node, referenced by @id from every other node on every page, so search
 * engines resolve the whole site to a single entity rather than to seven
 * unrelated businesses. EmploymentAgency is the type that actually describes
 * what this is; LocalBusiness keeps the map and opening-hours treatment.
 */
export const localBusinessSchema = {
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
    url: `${BASE_URL}/logo.png`,
    contentUrl: `${BASE_URL}/logo.png`,
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
export const websiteSchema = {
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
export const PAGE_META = {
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
      'How PowerCare trains the nurses and support workers it places in care homes across Ontario, and what working with us looks like.',
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
      'Current PowerCare job openings for RNs, RPNs, PSWs, DSWs and allied health staff in care homes across the GTA and rural Ontario. Apply online.',
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
export const faqSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
})

/** Home is the root, so it carries no trail beyond itself. A page can pass
 * its own `trail` (a job posting sits under Careers). */
export const breadcrumbSchema = (meta) => {
  const trail = [{ name: 'Home', path: '/' }]
  if (meta.trail) trail.push(...meta.trail)
  else if (meta.path !== '/') trail.push({ name: meta.crumb, path: meta.path })

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

export const webPageSchema = (meta) => ({
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
export const servicesListSchema = {
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

/* ─────────────────────────── Job postings ───────────────────────────
 * Google for Jobs reads JobPosting from each /careers/<role-id> page. The
 * Sheet holds free text, so the structured fields are read from it loosely
 * and left out when they can't be read, rather than guessed.
 */
const EMPLOYMENT_TYPES = [
  [/full[\s-]?time/i, 'FULL_TIME'],
  [/part[\s-]?time/i, 'PART_TIME'],
  [/casual|per[\s-]?diem|on[\s-]?call/i, 'PER_DIEM'],
  [/contract/i, 'CONTRACTOR'],
  [/temp/i, 'TEMPORARY'],
]

const SALARY_UNITS = [
  [/hour|hr/i, 'HOUR'],
  [/day|shift/i, 'DAY'],
  [/week/i, 'WEEK'],
  [/month/i, 'MONTH'],
  [/year|annual|annum/i, 'YEAR'],
]

const salaryOf = (pay = '') => {
  const amounts = (pay.replace(/,/g, '').match(/\d+(?:\.\d+)?/g) || []).map(Number)
  const unit = SALARY_UNITS.find(([re]) => re.test(pay))?.[1]
  if (!amounts.length || !unit) return null
  const [min, max = min] = amounts
  return {
    '@type': 'MonetaryAmount',
    currency: 'CAD',
    value: { '@type': 'QuantitativeValue', minValue: min, maxValue: max, unitText: unit },
  }
}

const isoDate = (text = '') => {
  const d = new Date(text)
  return Number.isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10)
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const descriptionOf = (job) => {
  const list = (title, items) =>
    items.length ? `<h3>${title}</h3><ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>` : ''
  return [
    job.summary && `<p>${esc(job.summary)}</p>`,
    job.about && `<p>${esc(job.about)}</p>`,
    list('Key responsibilities', job.responsibilities),
    list('Required qualifications', job.requirements),
    list('Assignment-specific requirements', job.assignment),
    list('Nice to have', job.niceToHave),
  ].filter(Boolean).join('')
}

export const jobPostingSchema = (job, path) => {
  // "Mississauga & GTA" → Mississauga; a region-only location leaves it out.
  const town = (job.location || '').split(/,|&|\/|\band\b/i)[0].trim()
  const locality = town && !/ontario|gta|remote/i.test(town) ? town : ''
  const employmentType = EMPLOYMENT_TYPES.filter(([re]) => re.test(job.type || '')).map(([, t]) => t)
  const datePosted = isoDate(job.posted)
  const baseSalary = salaryOf(job.pay)

  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: descriptionOf(job),
    identifier: { '@type': 'PropertyValue', name: 'PowerCare Health Services', value: job.id },
    url: `${BASE_URL}${path}`,
    ...(datePosted ? { datePosted } : {}),
    hiringOrganization: {
      '@type': 'Organization',
      name: 'PowerCare Health Services',
      sameAs: BASE_URL,
      logo: `${BASE_URL}/logo.png`,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        ...(locality ? { addressLocality: locality } : {}),
        addressRegion: 'ON',
        addressCountry: 'CA',
      },
    },
    ...(employmentType.length ? { employmentType } : {}),
    ...(baseSalary ? { baseSalary } : {}),
    directApply: true,
  }
}
