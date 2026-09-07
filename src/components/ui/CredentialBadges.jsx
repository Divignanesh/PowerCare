import { CREDENTIALS } from '../../data/credentials';

/**
 * Credential badges — shown at every point where a facility or a candidate
 * is deciding whether to trust us. The set itself lives in src/data.
 */
const pick = (ids) =>
  ids ? ids.map((id) => CREDENTIALS.find((c) => c.id === id)).filter(Boolean) : CREDENTIALS;

/**
 * variant:
 *   strip  — hero, on the pale ground
 *   band   — proof band, the fuller row
 *   footer — small marks on the deep ground
 *   form   — beside an enquiry form, at the point of conversion
 *   inline — repeated within Services and Industries
 */
const CredentialBadges = ({ variant = 'strip', only, useFull = false, className = '' }) => {
  const items = pick(only);
  const labelOf = (c) => (useFull ? c.full : c.short);

  if (variant === 'footer') {
    return (
      <ul className={`flex flex-wrap gap-x-5 gap-y-3 ${className}`}>
        {items.map(({ id, icon: Icon, ...c }) => (
          <li key={id} className="flex items-center gap-2 text-white/70 text-sm">
            <Icon size={15} strokeWidth={1.8} className="text-accent-300 flex-shrink-0" />
            {labelOf(c)}
          </li>
        ))}
      </ul>
    );
  }

  if (variant === 'form') {
    return (
      <ul className={`flex flex-wrap gap-x-5 gap-y-2.5 ${className}`}>
        {items.map(({ id, icon: Icon, ...c }) => (
          <li key={id} className="flex items-center gap-2 text-ink-600 text-sm">
            <Icon size={15} strokeWidth={1.8} className="text-primary-600 flex-shrink-0" />
            {labelOf(c)}
          </li>
        ))}
      </ul>
    );
  }

  if (variant === 'band') {
    return (
      <ul className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-6 ${className}`}>
        {items.map(({ id, icon: Icon, ...c }) => (
          <li key={id} className="flex flex-col items-center text-center gap-2.5">
            <Icon size={22} strokeWidth={1.5} className="text-primary-600" />
            <span className="text-ink-700 text-sm font-medium leading-snug">{labelOf(c)}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (variant === 'inline') {
    return (
      <ul className={`flex flex-wrap gap-2.5 ${className}`}>
        {items.map(({ id, icon: Icon, ...c }) => (
          <li
            key={id}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg
                       bg-primary-50 text-primary-700 text-sm font-medium"
          >
            <Icon size={14} strokeWidth={1.9} className="flex-shrink-0" />
            {labelOf(c)}
          </li>
        ))}
      </ul>
    );
  }

  // strip
  return (
    <ul className={`flex flex-wrap items-center gap-x-6 gap-y-3 ${className}`}>
      {items.map(({ id, icon: Icon, ...c }) => (
        <li key={id} className="flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-widest text-primary-700">
          <Icon size={15} strokeWidth={1.9} className="text-primary-600 flex-shrink-0" />
          {labelOf(c)}
        </li>
      ))}
    </ul>
  );
};

export default CredentialBadges;
