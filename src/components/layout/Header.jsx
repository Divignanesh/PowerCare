import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

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
  const [scrolled, setScrolled]     = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location]);

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 bg-primary-900 ${
      scrolled ? 'shadow-lg' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <img src="/logo.png" alt="PowerCare logo" className="h-10 w-auto object-contain" />
            <div className="leading-tight">
              <span className="text-white font-bold text-lg font-heading tracking-tight block">
                PowerCare
              </span>
              <span className="text-accent-500 text-[11px] leading-none block -mt-0.5 tracking-wider font-medium">
                Health Services
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="relative">
                  <button
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive(link.to)
                        ? 'text-accent-500'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {link.label}
                    <ChevronDown size={13} />
                  </button>
                  {dropdownOpen && (
                    <div
                      onMouseEnter={() => setDropdownOpen(true)}
                      onMouseLeave={() => setDropdownOpen(false)}
                      className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-card-hover border border-slate-100 py-2 z-50"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-accent-50 hover:text-primary-800 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(link.to)
                      ? 'text-accent-500'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link to="/contact" className="text-sm text-white/70 font-medium hover:text-white transition-colors px-3 py-2">
              Partner With Us
            </Link>
            <Link to="/careers" className="btn-accent text-sm px-4 py-2">
              Find a Job
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-primary-800 border-t border-white/10">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  to={link.to}
                  className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive(link.to)
                      ? 'text-accent-500 bg-white/5'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
                {link.children?.map((child) => (
                  <Link
                    key={child.to}
                    to={child.to}
                    className="block px-8 py-2 text-sm text-white/50 hover:text-white/80 hover:bg-white/5 rounded-lg"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
            <div className="pt-3 flex flex-col gap-2 border-t border-white/10">
              <Link to="/contact" className="text-sm text-white/70 text-center py-2 hover:text-white">
                Partner With Us
              </Link>
              <Link to="/careers" className="btn-accent text-sm justify-center">
                Find a Job
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
