import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

const IconFacebook = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const IconLinkedin = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
);
const IconInstagram = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);

const footerLinks = {
  company: [
    { label: 'Home',           to: '/' },
    { label: 'About Us',       to: '/about' },
    { label: 'Why PowerCare',  to: '/why-powercare' },
    { label: 'Contact Us',     to: '/contact' },
  ],
  services: [
    { label: 'Registered Nurses (RN)',   to: '/services' },
    { label: 'Personal Support Workers', to: '/services' },
    { label: 'Developmental Support',    to: '/services' },
    { label: 'All Services',             to: '/services' },
  ],
  industries: [
    { label: 'Long-Term Care',       to: '/industries#ltc' },
    { label: 'Hospitals & Acute Care', to: '/industries#hospitals' },
    { label: 'Home & Community Care', to: '/industries#home-care' },
    { label: 'All Industries',        to: '/industries' },
  ],
};

const Footer = () => (
  <footer className="bg-primary-900 text-white">

    {/* Main footer */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

        {/* Brand */}
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2.5 mb-4">
            <img src="/logo.png" alt="PowerCare logo" className="h-9 w-auto object-contain" />
            <div>
              <span className="font-bold text-base font-heading block text-white">PowerCare</span>
              <span className="text-accent-500 text-xs font-medium">Health Services</span>
            </div>
          </Link>
          <p className="text-white/50 text-sm leading-relaxed max-w-sm mb-6">
            PowerCare connects healthcare facilities across the GTA and Rural Ontario with vetted, in-house trained professionals who deliver dependable, compassionate care.
          </p>
          <div className="space-y-2.5">
            <a href="tel:+16474000000" className="flex items-center gap-2.5 text-white/50 hover:text-white transition-colors text-sm">
              <Phone size={14} className="text-accent-500 flex-shrink-0" />
              +1 (647) 400-0000
            </a>
            <a href="mailto:info@powercarestaffing.ca" className="flex items-center gap-2.5 text-white/50 hover:text-white transition-colors text-sm">
              <Mail size={14} className="text-accent-500 flex-shrink-0" />
              info@powercarestaffing.ca
            </a>
            <span className="flex items-center gap-2.5 text-white/50 text-sm">
              <MapPin size={14} className="text-accent-500 flex-shrink-0" />
              Greater Toronto Area &amp; Rural Ontario
            </span>
          </div>
          <div className="flex gap-3 mt-5">
            {[IconFacebook, IconLinkedin, IconInstagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent-500 hover:border-accent-500 hover:text-primary-900 transition-colors"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {[
          { heading: 'Company',    links: footerLinks.company    },
          { heading: 'Services',   links: footerLinks.services   },
          { heading: 'Industries', links: footerLinks.industries },
        ].map(({ heading, links }) => (
          <div key={heading}>
            <h4 className="font-semibold text-white text-xs uppercase tracking-widest mb-4">{heading}</h4>
            <ul className="space-y-2.5">
              {links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-white/50 text-sm hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>

    {/* Bottom bar */}
    <div className="border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/30">
        <p>&copy; {new Date().getFullYear()} PowerCare Health Staffing Solutions. All rights reserved.</p>
        <div className="flex gap-5">
          <Link to="/privacy" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white/60 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
