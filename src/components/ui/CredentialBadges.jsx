import { CREDENTIALS } from '../../data/credentials';

/**
 * Credential badges — shown at every point where a facility or a candidate
 * is deciding whether to trust us. The set itself lives in src/data.
 */
const pick = (ids) =>
  ids ? ids.map((id) => CREDENTIALS.find((c) => c.id === id)).filter(Boolean) : CREDENTIALS;

/**
 * variant:
 *   hero   — the bar welded to the foot of every page hero, on deep ground
 *   strip  — a quiet row on the pale ground
 *   band   — proof band, the fuller row
 *   footer — small marks on the deep ground
 *   form   — beside an enquiry form, at the point of conversion
 *   inline — repeated within Services and Industries
 */
const CredentialBadges = ({ variant = 'strip', only, useFull = false, className = '' }) => {
  const items = pick(only);
  const labelOf = (c) => (useFull ? c.full : c.short);

  // The bar under every hero. This is the one place the proof has to be read
  // at first glance, so on a phone it wraps into a complete grid rather than
  // scrolling sideways and hiding half of itself off the edge.
  if (variant === 'hero') {
    return (
      <ul
        className={`grid grid-cols-2 gap-x-4 gap-y-2.5
                    sm:grid-cols-3
                    lg:flex lg:items-center lg:justify-between lg:gap-x-6 ${className}`}
      >
        {items.map(({ id, icon: Icon, ...c }) => (
          <li
            key={id}
            className="flex items-center gap-2 font-mono font-semibold uppercase
                       tracking-widest text-white/85
                       text-[0.625rem] sm:text-[0.6875rem] lg:whitespace-nowrap"
          >
            <Icon size={14} strokeWidth={1.9} className="text-accent-300 flex-shrink-0" />
            {labelOf(c)}
          </li>
        ))}
      </ul>
    );
  }

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

  // Ruled cells rather than six marks floating in space. Borders are drawn on
  // the top/left of the container and the right/bottom of each cell, which
  // rules correctly at any column count without nth-child arithmetic.
  if (variant === 'band') {
    return (
      <ul
        className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6
                    rounded-xl overflow-hidden border-t border-l border-ink-200 ${className}`}
      >
        {items.map(({ id, icon: Icon, ...c }) => (
          <li
            key={id}
            className="flex flex-col items-center justify-start text-center gap-3
                       px-4 py-7 border-r border-b border-ink-200 bg-white"
          >
            <Icon size={24} strokeWidth={1.5} className="text-primary-600" />
            <span className="text-ink-800 text-sm font-semibold leading-snug">{labelOf(c)}</span>
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
