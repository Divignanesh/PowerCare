import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Building, ShieldCheck } from 'lucide-react';
import CredentialBadges from '../ui/CredentialBadges';
import { PHONE_ENABLED, PHONE, PHONE_HREF, EMAIL, EMAIL_HREF, SERVICE_AREA, ADDRESS_LINE, MAP_HREF, SOCIAL_PROFILES } from '../../data/contact';

const IconFacebook = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const IconLinkedin = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
);
const IconInstagram = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);

const socials = [
  { key: 'facebook',  Icon: IconFacebook,  label: 'PowerCare on Facebook'  },
  { key: 'linkedin',  Icon: IconLinkedin,  label: 'PowerCare on LinkedIn'  },
  { key: 'instagram', Icon: IconInstagram, label: 'PowerCare on Instagram' },
];

const footerLinks = {
  company: [
    { label: 'Home',           to: '/' },
    { label: 'About Us',       to: '/about' },
    { label: 'Why PowerCare',  to: '/why-powercare' },
    { label: 'Contact Us',     to: '/contact' },
  ],
  services: [
    { label: 'Registered Nurses (RN)',      to: '/services' },
    { label: 'Personal Support Workers',    to: '/services' },
    { label: 'Occupational Therapists (OT)', to: '/services' },
    { label: 'Speech-Language Pathologists', to: '/services' },
    { label: 'Psychotherapists',            to: '/services' },
    { label: 'All Professions',             to: '/services' },
  ],
  industries: [
    { label: 'Long-Term Care',                  to: '/industries' },
    { label: 'Hospitals & Acute Care',          to: '/industries' },
    { label: 'Home & Community Care / Respite', to: '/industries' },
    { label: 'Group Homes & Developmental Services / Respite', to: '/industries' },
    { label: 'Mental Health & Addictions',      to: '/industries' },
    { label: 'All Industries',                  to: '/industries' },
  ],
  locations: [
    { label: 'Toronto',     to: '/contact' },
    { label: 'Mississauga', to: '/contact' },
    { label: 'Brampton',    to: '/contact' },
    { label: 'Hamilton',    to: '/contact' },
    { label: 'All Areas',   to: '/contact' },
  ],
};

const contactRows = [
  ...(PHONE_ENABLED ? [{ Icon: Phone, text: PHONE, href: PHONE_HREF }] : []),
  { Icon: Mail,     text: EMAIL,        href: EMAIL_HREF },
  { Icon: Building, text: ADDRESS_LINE, href: MAP_HREF   },
  { Icon: MapPin,   text: SERVICE_AREA, href: null       },
];

const Footer = () => (
  <footer className="relative bg-primary-900 text-white overflow-hidden">
    <div className="absolute inset-0 bg-grid-invert pointer-events-none" aria-hidden="true" />

    <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 lg:py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-12">

        {/* Brand */}
        <div className="lg:col-span-4 sm:col-span-2">
          <Link to="/" className="inline-flex items-center gap-3 mb-6">
            <img src="/logo.png" alt="PowerCare logo" className="h-10 w-auto object-contain rounded-lg" />
            <span className="leading-none">
              <span className="block font-heading font-bold text-lg text-white tracking-tight">PowerCare</span>
              <span className="block font-mono text-[0.625rem] font-semibold uppercase tracking-widest text-accent-300 mt-1">
                Health Staffing Solutions
              </span>
            </span>
          </Link>

          <p className="text-white/65 text-[0.9375rem] leading-relaxed max-w-sm mb-8 text-pretty">
            PowerCare connects healthcare facilities across the GTA and Rural Ontario with vetted, in-house trained professionals who deliver dependable, compassionate care.
          </p>

          <div className="space-y-1">
            {contactRows.map(({ Icon, text, href }) => {
              const inner = (
                <>
                  <Icon size={15} className="text-accent-300 flex-shrink-0" />
                  <span>{text}</span>
                </>
              );
              return (
                <div key={text}>
                  {href ? (
                    <a
                      href={href}
                      className="flex items-center gap-3 py-1.5 text-[0.9375rem] text-white/70 hover:text-accent-300 transition-colors"
                    >
                      {inner}
                    </a>
                  ) : (
                    <span className="flex items-center gap-3 py-1.5 text-[0.9375rem] text-white/70">{inner}</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Non-clickable until the accounts exist. Add the live URLs to
              SOCIAL_PROFILES in src/data/contact.js and these become links
              again — a dead href="#" is worse than no link at all. */}
          <ul className="flex gap-2.5 mt-7">
            {socials.map(({ Icon, label, key }) => {
              const href = SOCIAL_PROFILES.find((p) => p.id === key)?.url;
              const face = `w-9 h-9 rounded-lg border border-white/20 flex items-center justify-center
                            text-white/70 transition-colors duration-200`;
              return (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      aria-label={label}
                      rel="me noopener"
                      target="_blank"
                      className={`${face} hover:bg-accent-300 hover:border-accent-300 hover:text-primary-900`}
                    >
                      <Icon />
                    </a>
                  ) : (
                    <span className={face} aria-hidden="true">
                      <Icon />
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Link columns */}
        {[
          { heading: 'Company',    links: footerLinks.company    },
          { heading: 'Services',   links: footerLinks.services   },
          { heading: 'Industries', links: footerLinks.industries },
          { heading: 'Locations',  links: footerLinks.locations  },
        ].map(({ heading, links }) => (
          <div key={heading} className="lg:col-span-2 lg:col-start-auto">
            <h4 className="font-mono text-[0.625rem] font-semibold uppercase tracking-widest text-accent-300 mb-5">
              {heading}
            </h4>
            <ul className="space-y-3">
              {/* Several service links point at the same page, so the label
                  is what makes each row unique. */}
              {links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-[0.9375rem] text-white/65 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>

    {/* Credentials */}
    <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pb-12">
      <h4 className="font-mono text-[0.625rem] font-semibold uppercase tracking-widest text-accent-300 mb-5">
        Credentials &amp; Coverage
      </h4>
      <CredentialBadges variant="footer" useFull />
      <ul className="flex flex-wrap gap-x-5 gap-y-3 mt-3">
        {['AODA Accessible', 'PIPEDA Compliant'].map((c) => (
          <li key={c} className="flex items-center gap-2 text-white/70 text-sm">
            <ShieldCheck size={15} strokeWidth={1.8} className="text-accent-300 flex-shrink-0" />
            {c}
          </li>
        ))}
      </ul>
    </div>

    {/* Bottom bar */}
    <div className="relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="font-mono text-xs text-white/45 text-center sm:text-left">
          &copy; {new Date().getFullYear()} PowerCare Health Staffing Solutions. All rights reserved.
        </p>
        <div className="flex gap-6">
          <Link to="/privacy" className="font-mono text-xs text-white/45 hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms"   className="font-mono text-xs text-white/45 hover:text-white transition-colors">Terms of Service</Link>
          <Link to="/accessibility" className="font-mono text-xs text-white/45 hover:text-white transition-colors">Accessibility (AODA)</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
