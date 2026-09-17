/**
 * The roles PowerCare places, in the order they are presented everywhere —
 * the home page preview and the /services grid read from this one array, so
 * the sequence can never drift between the two.
 *
 * `image` is the photograph that stands for the role; it is used by the
 * /services grid and by the home page preview.
 */
export const services = [
  {
    id: 'rn',
    requestLabel: 'Request an RN',
    title: 'Registered Nurse (RN)',
    category: 'Medical & Nursing',
    icon: 'Stethoscope',
    image: '/images/rn-care.jpg',
    shortDesc: 'Provides direct nursing care to patients and extends health education programs.',
    fullDesc:
      'Our Registered Nurses deliver comprehensive, evidence-based patient care across acute, long-term, and community settings. They conduct patient assessments, administer medications, manage complex care plans, and collaborate with interdisciplinary teams to ensure optimal health outcomes.',
    highlights: [
      'Patient assessment & care planning',
      'Medication administration & IV therapy',
      'Wound care & post-surgical support',
      'Health education & discharge planning',
      'Chronic disease management',
    ],
  },
  {
    id: 'rpn',
    requestLabel: 'Request an RPN',
    title: 'Registered Practical Nurse (RPN)',
    category: 'Medical & Nursing',
    icon: 'HeartPulse',
    image: '/images/rpn-care.jpg',
    shortDesc: 'Delivers primary care and participates in service planning and evaluation.',
    fullDesc:
      'PowerCare RPNs are skilled practitioners who deliver high-quality nursing care in collaboration with RNs and other healthcare professionals. They assess patient health, administer treatments, and contribute to care plans across long-term care, home care, and community health settings.',
    highlights: [
      'Primary care delivery',
      'Medication management',
      'Vital signs monitoring',
      'Patient advocacy & education',
      'Collaborative care planning',
    ],
  },
  {
    id: 'psw',
    requestLabel: 'Request a PSW',
    title: 'Personal Support Worker (PSW)',
    category: 'Care Support',
    icon: 'HandHeart',
    image: '/images/psw-care.jpg',
    shortDesc: 'Providing patients with attentive, practical and emotional support.',
    fullDesc:
      "PowerCare's Personal Support Workers provide compassionate, hands-on care to clients in their homes, retirement homes, and long-term care facilities. They assist with daily living activities, personal hygiene, mobility, and emotional well-being, allowing clients to maintain dignity and independence.",
    highlights: [
      'Personal hygiene & grooming',
      'Meal preparation & feeding assistance',
      'Mobility support & fall prevention',
      'Medication reminders',
      'Social engagement & companionship',
    ],
  },
  {
    id: 'dsw',
    requestLabel: 'Request a DSW',
    title: 'Developmental Support Worker (DSW)',
    category: 'Care Support',
    icon: 'Users',
    image: '/images/group-home.jpg',
    shortDesc: 'Assists individuals with disabilities throughout life stages, promoting community participation.',
    fullDesc:
      "Our Developmental Support Workers help individuals with intellectual and developmental disabilities live fulfilling, independent lives. They create personalized support plans, facilitate community inclusion, develop life skills, and provide behavioural support tailored to each person's goals.",
    highlights: [
      'Life skills development',
      'Community integration support',
      'Behavioural intervention strategies',
      'Personal care assistance',
      'Family & caregiver collaboration',
    ],
  },
  {
    id: 'dietary',
    requestLabel: 'Request a Dietary Aide',
    title: 'Dietary Aide / Dietitian',
    category: 'Allied Health & Therapy',
    icon: 'UtensilsCrossed',
    image: '/images/dietitian.jpg',
    shortDesc: 'Plans and prepares nutrition that accounts for therapeutic diets, allergies and special needs.',
    fullDesc:
      'PowerCare places both Registered Dietitians and Dietary Aides. Dietitians assess nutritional risk, build therapeutic diet plans and advise clinical teams; Dietary Aides prepare and serve those meals accurately and safely in long-term care homes, hospitals and retirement residences.',
    highlights: [
      'Nutritional assessment & care planning',
      'Therapeutic and texture-modified diets',
      'Allergy & restriction management',
      'Meal preparation, service and monitoring',
      'Kitchen sanitation & food safety compliance',
    ],
  },
  {
    id: 'ot',
    requestLabel: 'Request an OT',
    title: 'Occupational Therapist (OT)',
    category: 'Allied Health & Therapy',
    icon: 'Accessibility',
    image: '/images/ot-hand.jpg',
    shortDesc: 'Restores day-to-day function — mobility, self-care and safe independent living.',
    fullDesc:
      'Our Occupational Therapists help clients regain and maintain the activities of daily living after injury, surgery, stroke or as function declines with age. They assess the person and the environment, prescribe equipment and modifications, and build graded programmes that return people to safe independence at home and in the community.',
    highlights: [
      'Functional & home safety assessments',
      'Activities of daily living retraining',
      'Seating, mobility & assistive equipment prescription',
      'Cognitive and perceptual rehabilitation',
      'Falls prevention & caregiver education',
    ],
  },
  {
    id: 'slp',
    requestLabel: 'Request an SLP',
    title: 'Speech-Language Pathologist (SLP)',
    category: 'Allied Health & Therapy',
    icon: 'Speech',
    image: '/images/slp-session.jpg',
    shortDesc: 'Assesses and treats communication, language and swallowing difficulties.',
    fullDesc:
      'PowerCare Speech-Language Pathologists assess and treat speech, language, voice, cognitive-communication and swallowing disorders across the lifespan — from paediatric language development to post-stroke aphasia and dysphagia management in long-term care.',
    highlights: [
      'Speech, language & communication assessment',
      'Dysphagia (swallowing) assessment & management',
      'Aphasia and post-stroke communication therapy',
      'Augmentative & alternative communication (AAC)',
      'Staff and family communication training',
    ],
  },
  {
    id: 'psychotherapist',
    requestLabel: 'Request a Psychotherapist',
    title: 'Psychotherapist',
    category: 'Allied Health & Therapy',
    icon: 'Brain',
    image: '/images/psychotherapy.jpg',
    shortDesc: 'Structured, evidence-based talk therapy for mental health and behavioural needs.',
    fullDesc:
      'Our Registered Psychotherapists deliver evidence-based individual and group therapy in mental health programmes, addictions services, developmental services and community agencies. They work within the circle of care, contribute to treatment planning, and are trained in trauma-informed practice.',
    highlights: [
      'Individual & group psychotherapy',
      'Trauma-informed and CBT-based practice',
      'Mental health and addictions programmes',
      'Crisis support & safety planning',
      'Treatment planning and clinical documentation',
    ],
  },
  {
    id: 'dementia-care',
    requestLabel: 'Request a Specialist',
    title: 'Dementia Care Specialist',
    category: 'Specialized Care',
    icon: 'HeartHandshake',
    image: '/images/dementia-care.jpg',
    shortDesc: "Specialized support for individuals living with Alzheimer's and dementia-related conditions.",
    fullDesc:
      "PowerCare's Dementia Care Specialists are trained in person-centered dementia care approaches. They provide structured routines, cognitive engagement, safety monitoring, and compassionate support to individuals living with Alzheimer's disease and other forms of dementia.",
    highlights: [
      'Structured daily routines',
      'Cognitive stimulation activities',
      'Responsive behaviour support',
      'Safety checks & fall prevention',
      'Family caregiver support & education',
    ],
  },
  {
    id: 'companion',
    requestLabel: 'Request Companion Care',
    title: 'Companion Care',
    category: 'Care Support',
    icon: 'SmilePlus',
    image: '/images/elderly-hands.jpg',
    shortDesc: 'Emotional support, social engagement, and light assistance for isolated or aging individuals.',
    fullDesc:
      'Companionship is a vital component of holistic care. PowerCare Companions provide meaningful social interaction, emotional support, and light assistance to seniors and those experiencing loneliness or isolation. They accompany clients to appointments, engage in activities, and provide peace of mind to families.',
    highlights: [
      'Social engagement & conversation',
      'Accompaniment to appointments',
      'Recreational activity support',
      'Light meal preparation',
      'Emotional & mental well-being support',
    ],
  },
  {
    id: 'housekeeping',
    requestLabel: 'Request Support Staff',
    title: 'Housekeeping & Laundry Aide',
    category: 'Facility & Administrative',
    icon: 'Sparkles',
    image: '/images/housekeeping.jpg',
    shortDesc: 'Maintains hygiene standards across healthcare facilities with thorough cleaning protocols.',
    fullDesc:
      'Maintaining a clean, infection-controlled environment is critical in healthcare settings. PowerCare Housekeeping and Laundry Aides are trained in healthcare-grade sanitation protocols, ensuring facilities remain safe and comfortable for residents, patients, and staff.',
    highlights: [
      'Healthcare-grade disinfection',
      'Infection prevention practices',
      'Linen & laundry management',
      'Waste disposal compliance',
      'Floor care & surface cleaning',
    ],
  },
  {
    id: 'front-desk',
    requestLabel: 'Request a Screener',
    title: 'Front Desk Screener',
    category: 'Facility & Administrative',
    icon: 'ClipboardList',
    image: '/images/reception.jpg',
    shortDesc: 'Handles client interactions, visitor management, and facility communications.',
    fullDesc:
      'Our Front Desk Screeners are the first point of contact in healthcare facilities, managing visitor access, conducting health screenings, and coordinating communications. They ensure smooth operations while upholding safety protocols and delivering professional, welcoming service.',
    highlights: [
      'Visitor health screening',
      'Access control & badging',
      'Reception & communication management',
      'Scheduling support',
      'Infection control compliance',
    ],
  },
];

export const serviceCategories = [
  'All',
  'Medical & Nursing',
  'Care Support',
  'Allied Health & Therapy',
  'Specialized Care',
  'Facility & Administrative',
];
