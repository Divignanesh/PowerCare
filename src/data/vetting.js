/**
 * The candidate screening sequence, in order.
 * Shared by the Why PowerCare page and the home page so the two can never
 * drift apart.
 */
export const VETTING_STEPS = [
  { step: 1,  title: 'Application Review',          desc: 'Education, experience, and professional history evaluation.' },
  { step: 2,  title: 'Initial Interview',           desc: 'Values, goals, and professional alignment assessment.' },
  { step: 3,  title: 'Credential Verification',     desc: 'CNO, COTO, and relevant college registration confirmed.' },
  { step: 4,  title: 'Reference Checks',            desc: 'Minimum 2 professional references from recent supervisors.' },
  { step: 5,  title: 'Vulnerable Sector Screening', desc: 'Enhanced RCMP criminal record check required.' },
  { step: 6,  title: 'Health & Immunization',       desc: 'Up-to-date immunization records and health clearances.' },
  { step: 7,  title: 'Skills Assessment',           desc: 'Role-specific practical and theoretical competency testing.' },
  { step: 8,  title: 'In-House Training',           desc: '80-hour PowerCare certification program completed.' },
  { step: 9,  title: 'Supervised Trial',            desc: 'Supervised shift(s) to confirm readiness and professionalism.' },
  { step: 10, title: 'Cleared for Placement',       desc: 'Final approval by our Quality & Compliance team.' },
];
