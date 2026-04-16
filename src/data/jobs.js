export const jobCategories = [
  { id: 'nursing', label: 'Nursing', roles: ['Registered Nurse (RN)', 'Registered Practical Nurse (RPN)', 'Nurse Practitioner (NP)'] },
  { id: 'personal-care', label: 'Personal Care', roles: ['Personal Support Worker (PSW)', 'Home Care Aide', 'Developmental Support Worker (DSW)'] },
  { id: 'therapy', label: 'Therapy & Rehab', roles: ['Physiotherapy Assistant (PTA)', 'Occupational Therapy Assistant (OTA)', 'Behavioural Therapist'] },
  { id: 'community', label: 'Community & Social Services', roles: ['Community Service Worker (CSW)', 'Child and Youth Worker (CYW)'] },
  { id: 'support', label: 'Facility & Support', roles: ['Dietary Aide', 'Housekeeping & Laundry Aide', 'Front Desk Screener'] },
  { id: 'specialized', label: 'Specialized Care', roles: ['Dementia Care Specialist', 'Palliative Care Worker', 'Companion'] },
];

export const employmentTypes = [
  { id: 'temporary', label: 'Casual / Temporary' },
  { id: 'permanent', label: 'Permanent Full-Time' },
  { id: 'part-time', label: 'Permanent Part-Time' },
  { id: 'contract', label: 'Contract-to-Hire' },
  { id: 'travel', label: 'Travel Assignment' },
];

export const locations = [
  'Toronto (GTA)',
  'Mississauga',
  'Brampton',
  'Oakville',
  'Markham / Scarborough',
  'Barrie',
  'Guelph',
  'Hamilton',
  'Kitchener / Waterloo',
  'London, ON',
  'Kingston, ON',
  'Rural / Remote Ontario',
  'Open to Multiple Locations',
];

export const hiringSteps = [
  {
    step: 1,
    title: 'Apply or Connect',
    description: 'Submit your application online or call us directly. Our recruiter will reach out within 24 hours to discuss your experience, goals, and availability.',
    icon: 'Send',
  },
  {
    step: 2,
    title: 'Job Matching',
    description: 'Your dedicated recruiter reviews your credentials, preferred locations, and employment type to match you with the best-fit opportunities from our extensive client network.',
    icon: 'Search',
  },
  {
    step: 3,
    title: 'Interview Preparation',
    description: 'We prepare you for client interviews with role-specific coaching, documentation checklists, and facility-specific insights to ensure your confidence on interview day.',
    icon: 'ClipboardCheck',
  },
  {
    step: 4,
    title: 'Onboarding & Placement',
    description: 'Once placed, we guide you through all onboarding paperwork, orientation logistics, and compliance documentation — so your first day starts smoothly.',
    icon: 'CheckCircle2',
  },
];

export const benefits = [
  { icon: 'UserCheck', title: 'Dedicated Recruiter', desc: 'You get a personal recruiter who knows your career goals and advocates for the right opportunities.' },
  { icon: 'Zap', title: 'Rapid Placement', desc: 'Most candidates receive placement offers within days of applying, not weeks.' },
  { icon: 'Clock', title: '24/7 Support', desc: 'Our team is available around the clock to support you before, during, and after placement.' },
  { icon: 'DollarSign', title: 'Competitive Pay', desc: 'We negotiate competitive compensation packages and benefits on your behalf.' },
  { icon: 'MapPin', title: 'Wide Assignment Pool', desc: 'Access roles across the GTA, rural Ontario, and beyond — flexibility is your advantage.' },
  { icon: 'Gift', title: 'Referral Bonuses', desc: 'Refer a colleague and earn a bonus when they successfully place through PowerCare.' },
];
