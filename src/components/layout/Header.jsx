import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Why PowerCare', to: '/why-powercare' },
  {
    label: 'Our Services',
    to: '/services',
    children: [
      { label: 'All Services', to: '/services' },
      { label: 'Industries We Serve', to: '/industries' },
    ],
  },
  { label: 'Find a Job', to: '/careers' },
  { label: 'Contact', to: '/contact' },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  // Seeded from the current position so a reload part-way down the page
  // paints the correct header without a state update on mount.
  const [scrolled, setScrolled] = useState(() => typeof window !== 'undefined' && window.scrollY > 8);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const closeTimer = useRef(null);
  const reduceMotion = useReducedMotion();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigating closes any open menu. Adjusting during render rather than in an
  // effect avoids a second render pass on every route change.
  const [lastPath, setLastPath] = useState(location.pathname);
  if (lastPath !== location.pathname) {
    setLastPath(location.pathname);
    setMobileOpen(false);
    setDropdownOpen(false);
  }

  // A short grace period stops the panel snapping shut while the pointer
  // crosses the gap between the trigger and the menu.
  const openMenu = () => {
    clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  };
  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 120);
  };
  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  };

  const linkClass = (active) =>
    `relative px-3 py-2 text-[0.9375rem] transition-colors duration-200 ${
      active ? 'text-primary-700 font-semibold' : 'text-ink-600 font-medium hover:text-primary-700'
    }`;

  // The active page is marked with a rule, echoing the rules used to
  // separate rows throughout the site.
  const ActiveRule = () => (
    <span className="absolute left-3 right-3 -bottom-px h-0.5 bg-primary-600 rounded-full" aria-hidden="true" />
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 border-b border-ink-200 ${
        scrolled ? 'shadow-[0_1px_20px_-8px_rgba(15,24,34,0.25)]' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
            <img src="/logo.png" alt="PowerCare logo" className="h-11 w-auto object-contain" />
            <div className="leading-none">
              <span className="block font-heading font-bold text-lg text-ink-900 tracking-tight">
                PowerCare
              </span>
              <span className="block font-mono text-[0.625rem] font-semibold uppercase tracking-widest text-primary-700 mt-1">
                Health Staffing Solutions
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={openMenu}
                  onMouseLeave={closeMenu}
                >
                  <Link
                    to={link.to}
                    className={`${linkClass(isActive(link.to))} flex items-center gap-1`}
                    onFocus={openMenu}
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                    />
                    {isActive(link.to) && <ActiveRule />}
                  </Link>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-full left-0 pt-3 w-60"
                      >
                        <div className="bg-white rounded-xl border border-ink-200 shadow-card-hover p-1.5">
                          {link.children.map((child) => (
                            <Link
                              key={child.to}
                              to={child.to}
                              className="block px-3.5 py-2.5 rounded-lg text-[0.9375rem] text-ink-600
                                         hover:bg-primary-50 hover:text-primary-700 transition-colors duration-150"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link key={link.to} to={link.to} className={linkClass(isActive(link.to))}>
                  {link.label}
                  {isActive(link.to) && <ActiveRule />}
                </Link>
              )
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <Link
              to="/contact"
              className="text-[0.9375rem] font-medium text-ink-600 hover:text-primary-700 transition-colors px-3 py-2"
            >
              Partner With Us
            </Link>
            <Link to="/careers" className="btn-primary text-sm px-5 py-2.5">
              Find a Job
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2.5 -mr-2.5 rounded-lg text-ink-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-white border-t border-ink-100"
          >
            <div className="px-5 py-5 max-h-[calc(100vh-5rem)] overflow-y-auto">
              <div>
                {navLinks.map((link) => (
                  <div key={link.label}>
                    <Link
                      to={link.to}
                      className={`block py-3.5 text-[0.9375rem] transition-colors ${
                        isActive(link.to)
                          ? 'text-primary-700 font-semibold'
                          : 'text-ink-700 font-medium hover:text-primary-700'
                      }`}
                    >
                      {link.label}
                    </Link>
                    {link.children?.map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        className="flex items-center gap-2.5 py-2.5 pl-4 text-sm text-ink-500 hover:text-primary-700 transition-colors"
                      >
                        <span className="w-3 h-px bg-ink-300" aria-hidden="true" />
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
              <div className="pt-6 flex flex-col gap-3">
                <Link to="/careers" className="btn-primary w-full">
                  Find a Job
                </Link>
                <Link to="/contact" className="btn-secondary w-full">
                  Partner With Us
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
