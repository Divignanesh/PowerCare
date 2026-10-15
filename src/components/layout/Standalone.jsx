import { Phone, Mail, MapPin, Building } from 'lucide-react';
import { PHONE_ENABLED, PHONE, PHONE_HREF, EMAIL, EMAIL_HREF, SERVICE_AREA, ADDRESS_LINE } from '../../data/contact';

// Header and footer for standalone pages (the /apply ad landing page): the
// brand and company details only, with no links to the rest of the site, so
// visitors from an ad stay on the form. Phone and email still work.

const Brand = ({ light = false }) => (
  <div className="flex items-center gap-3">
    <img src="/logo.png" alt="PowerCare logo" className={`h-11 w-auto object-contain ${light ? 'rounded-lg' : ''}`} />
    <div className="leading-none">
      <span className={`block font-heading font-bold text-lg tracking-tight ${light ? 'text-white' : 'text-ink-900'}`}>
        PowerCare
      </span>
      <span className={`block font-mono text-[0.625rem] font-semibold uppercase tracking-widest mt-1 ${light ? 'text-accent-300' : 'text-primary-700'}`}>
        Health Services
      </span>
    </div>
  </div>
);

export const StandaloneHeader = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-ink-200">
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 flex items-center h-20">
      <Brand />
    </div>
  </header>
);

const details = [
  ...(PHONE_ENABLED ? [{ Icon: Phone, text: PHONE, href: PHONE_HREF }] : []),
  { Icon: Mail, text: EMAIL, href: EMAIL_HREF },
  { Icon: Building, text: ADDRESS_LINE },
  { Icon: MapPin, text: SERVICE_AREA },
];

export const StandaloneFooter = () => (
  <footer className="bg-primary-900 text-white">
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row md:items-start md:justify-between gap-8">
      <Brand light />
      <ul className="space-y-1">
        {details.map(({ Icon, text, href }) => {
          const inner = (
            <>
              <Icon size={15} className="text-accent-300 flex-shrink-0" aria-hidden="true" />
              <span>{text}</span>
            </>
          );
          return (
            <li key={text}>
              {href ? (
                <a href={href} className="flex items-center gap-3 py-1.5 text-sm text-white/70 hover:text-accent-300 transition-colors">{inner}</a>
              ) : (
                <span className="flex items-center gap-3 py-1.5 text-sm text-white/70">{inner}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
    <p className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pb-8 font-mono text-xs text-white/45">
      &copy; {new Date().getFullYear()} PowerCare Health Inc. All rights reserved.
    </p>
  </footer>
);
