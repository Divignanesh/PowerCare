import { BadgeCheck, Shield, Umbrella, UserCheck, Fingerprint, Headset } from 'lucide-react';

/**
 * One source of truth for what PowerCare holds and does.
 * `short` is the form used in tight rows; `full` is the precise wording.
 */
export const CREDENTIALS = [
  { id: 'cno',      icon: BadgeCheck,  short: 'CNO Registered',          full: 'College of Nurses of Ontario (CNO)-registered' },
  { id: 'wsib',     icon: Shield,      short: 'WSIB Covered',            full: 'WSIB Covered' },
  { id: 'insured',  icon: Umbrella,    short: '$2M Insured',             full: '$2M Liability Insured' },
  { id: 'vsc',      icon: UserCheck,   short: 'Vulnerable Sector Check', full: 'Vulnerable Sector Check' },
  { id: 'police',   icon: Fingerprint, short: 'Police Verified',         full: 'Police Background Verified' },
  { id: 'dispatch', icon: Headset,     short: '24/7 Dispatch',           full: '24/7 Dispatch' },
];

/** The four strongest signals — used in the hero and beside forms. */
export const PRIMARY_CREDENTIALS = ['cno', 'wsib', 'insured', 'vsc'];
