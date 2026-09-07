/**
 * Page hero.
 *
 * Both arrangements open on a pale eucalyptus wash rather than a dark slab —
 * healthcare reads as unwelcoming when large fields go dark, and photographs
 * are shown at full strength instead of dimmed behind type.
 *
 *  - "split"  — copy on the left, a framed photograph on the right.
 *  - "center" — centred copy, with the photograph carried as a full-width
 *               band beneath it.
 */

/** Mono label prefixed with a rule; flanked on both sides when centred. */
const Eyebrow = ({ label, flanked }) =>
  label ? (
    <span className="inline-flex items-center gap-2.5 font-mono text-[0.6875rem] uppercase tracking-widest text-primary-700">
      <span className="block w-6 h-px bg-primary-400" aria-hidden="true" />
      {label}
      {flanked && <span className="block w-6 h-px bg-primary-400" aria-hidden="true" />}
    </span>
  ) : null;

const PageHero = ({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt = '',
  variant = 'split',
  children,
}) => {
  if (variant === 'center') {
    return (
      <section className="relative bg-primary-50 overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-24 lg:pb-20 text-center">
          <Eyebrow label={eyebrow} flanked />
          <h1 className="text-display font-heading font-semibold text-ink-900 mt-6 max-w-3xl mx-auto text-balance wdth-wide">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-ink-600 mt-6 max-w-2xl mx-auto leading-relaxed text-pretty">
              {subtitle}
            </p>
          )}
          {children}
        </div>

        {image && (
          <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pb-16 lg:pb-20">
            <img
              src={image}
              alt={imageAlt}
              className="w-full h-[220px] sm:h-[300px] lg:h-[380px] object-cover rounded-2xl"
            />
          </div>
        )}
      </section>
    );
  }

  return (
    <section className="relative bg-primary-50 overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-center">
          <div className="lg:col-span-6">
            <Eyebrow label={eyebrow} />
            <h1 className="text-display font-heading font-semibold text-ink-900 mt-6 text-balance wdth-wide">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg text-ink-600 mt-6 leading-relaxed max-w-xl text-pretty">
                {subtitle}
              </p>
            )}
            {children}
          </div>

          {image && (
            <div className="lg:col-span-6 lg:pl-6">
              <img
                src={image}
                alt={imageAlt}
                className="w-full aspect-[5/4] object-cover rounded-2xl"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
