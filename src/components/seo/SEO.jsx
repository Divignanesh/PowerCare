import { Helmet } from 'react-helmet-async'

const BASE_URL = 'https://www.powercarestaffing.ca'

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${BASE_URL}/#organization`,
  name: 'PowerCare Health Staffing Solutions',
  description:
    'PowerCare provides vetted, in-house trained healthcare staffing across the Greater Toronto Area and Rural Ontario. We place RNs, RPNs, PSWs, DSWs, and allied health professionals 24/7.',
  url: BASE_URL,
  telephone: '+16474000000',
  email: 'info@powercarestaffing.ca',
  foundingDate: '2019',
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
    addressLocality: 'Toronto',
    addressRegion: 'ON',
    addressCountry: 'CA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 43.6532,
    longitude: -79.3832,
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
  sameAs: [
    'https://www.linkedin.com/company/powercare-staffing',
    'https://www.facebook.com/powercarestaffing',
    'https://www.instagram.com/powercarestaffing',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Healthcare Staffing Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Registered Nurse Staffing' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Registered Practical Nurse Staffing' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Personal Support Worker Staffing' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Developmental Support Worker Staffing' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Home Care Aide Staffing' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Physiotherapy Assistant Staffing' } },
    ],
  },
}

const PAGE_META = {
  home: {
    title: 'PowerCare | #1 Healthcare Staffing Agency — GTA & Rural Ontario',
    description:
      'PowerCare connects long-term care homes, hospitals, and community agencies across the GTA and Rural Ontario with vetted, in-house trained RNs, RPNs, PSWs, and DSWs. 24/7 emergency staffing. 500+ facility partners.',
    path: '/',
  },
  about: {
    title: 'About PowerCare | Healthcare Staffing Agency — GTA Ontario',
    description:
      'Learn about PowerCare Health Staffing Solutions — our mission, values, and the team behind Ontario\'s trusted healthcare staffing partner. Serving the GTA and Rural Ontario.',
    path: '/about',
  },
  whyPowerCare: {
    title: 'Why PowerCare | In-House Trained Healthcare Staff — Ontario',
    description:
      'Discover why PowerCare stands apart: 80-hour in-house training, 10-step vetting, 24/7 dispatch, and a placement guarantee. The most prepared healthcare staff in the GTA.',
    path: '/why-powercare',
  },
  services: {
    title: 'Healthcare Staffing Services | RN, PSW, DSW — PowerCare Ontario',
    description:
      'PowerCare places RNs, RPNs, PSWs, DSWs, Home Care Aides, PTAs, Dietary Aides, and more across Ontario healthcare facilities. View all services.',
    path: '/services',
  },
  industries: {
    title: 'Industries We Serve | LTC, Hospitals, Home Care — PowerCare Ontario',
    description:
      'PowerCare staffs long-term care homes, hospitals, retirement residences, group homes, rehabilitation centres, and mental health facilities across the GTA and Rural Ontario.',
    path: '/industries',
  },
  careers: {
    title: 'Find Healthcare Jobs in GTA & Ontario | PowerCare Careers',
    description:
      'Looking for RN, PSW, DSW, or RPN jobs in the GTA and Ontario? PowerCare places healthcare professionals fast — dedicated recruiter, flexible shifts, competitive pay.',
    path: '/careers',
  },
  contact: {
    title: 'Contact PowerCare | Healthcare Staffing Support — Ontario',
    description:
      'Contact PowerCare for urgent staffing support, career opportunities, or partnership enquiries. 24/7 emergency dispatch. Serving GTA and Rural Ontario.',
    path: '/contact',
  },
}

// FAQ schema for AEO
const faqSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
})

const homeFAQs = [
  {
    q: 'What healthcare staffing services does PowerCare provide in the GTA?',
    a: 'PowerCare provides Registered Nurse (RN), Registered Practical Nurse (RPN), Personal Support Worker (PSW), Developmental Support Worker (DSW), Home Care Aide, Physiotherapy Assistant, Dietary Aide, Housekeeping Aide, and Front Desk Screener staffing across the Greater Toronto Area and Rural Ontario.',
  },
  {
    q: 'How quickly can PowerCare fill a healthcare staffing shift in Ontario?',
    a: 'PowerCare can typically confirm emergency same-day coverage within 1–2 hours via our 24/7 dispatch line. For planned staffing, we confirm placements within 24 hours.',
  },
  {
    q: 'Does PowerCare provide healthcare staffing for long-term care homes in Ontario?',
    a: 'Yes. PowerCare is a specialized provider of staffing solutions for long-term care homes across the GTA and Rural Ontario, including RNs, RPNs, PSWs, Dietary Aides, and Housekeeping staff.',
  },
  {
    q: 'What makes PowerCare different from other healthcare staffing agencies in Toronto?',
    a: 'PowerCare operates an exclusive 80-hour in-house training program, a 10-step candidate vetting process, 24/7 dispatch availability, and a placement satisfaction guarantee — making our staff the most prepared healthcare professionals in the GTA.',
  },
  {
    q: 'Does PowerCare serve rural Ontario communities?',
    a: 'Yes. PowerCare actively serves rural and underserved Ontario communities beyond the GTA, including Barrie, Guelph, Hamilton, Kitchener-Waterloo, Kingston, London, and surrounding regions.',
  },
]

const hiringHowToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Find a Healthcare Job Through PowerCare in Ontario',
  description:
    'PowerCare places RNs, PSWs, DSWs, and more across the GTA and Rural Ontario in 4 simple steps.',
  step: [
    { '@type': 'HowToStep', name: 'Apply or Connect', text: 'Submit your application online or call us. A recruiter will respond within 24 hours.' },
    { '@type': 'HowToStep', name: 'Job Matching', text: 'Your dedicated recruiter matches you with suitable roles from our Ontario facility network.' },
    { '@type': 'HowToStep', name: 'Interview Preparation', text: 'We prepare you for client interviews with coaching and documentation support.' },
    { '@type': 'HowToStep', name: 'Onboarding & Placement', text: 'We guide you through all onboarding paperwork — your first day starts smoothly.' },
  ],
}

const SEO = ({ page, extraSchemas = [] }) => {
  const meta = PAGE_META[page] || PAGE_META.home
  const schemas = [localBusinessSchema, ...extraSchemas]

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={`${BASE_URL}${meta.path}`} />

      {/* Open Graph */}
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={`${BASE_URL}${meta.path}`} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={`${BASE_URL}/og-image.jpg`} />

      {/* Twitter */}
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />

      {/* JSON-LD Structured Data */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  )
}

export { SEO, faqSchema, homeFAQs, hiringHowToSchema, PAGE_META }
export default SEO
