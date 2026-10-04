
/**
 * Page hero.
 *
 * The photograph is shown as it was taken — no scrim, no ruled field, no deep
 * ground. Type sits on white beneath or beside it rather than on top of it,
 * which is what lets the picture stay bright and still be read past.
 *
 *  - "center" — the photograph full-bleed as a band, copy centred below it.
 *  - "split"  — copy on the left, the photograph framed on the right.
 *  - "overlay" — copy centred on the photograph under a white wash.
 *    `large` sets the title a size up, for heroes that carry no subtitle.
 *
 * `insetImage` (split only) adds a second, smaller photograph overlapping
 * the bottom-left corner of the first.
 *
 * `imagePos` is the object-position for the photograph. The band crops hard,
 * and a top crop loses the subject on frames where they sit low, so those
 * pages pass their own.

 */

const Eyebrow = ({ label, flanked }) =>
  label ? (
    <span className="inline-flex items-center gap-3 font-mono text-sm leading-tight font-semibold uppercase tracking-[4px] text-primary-600">
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
  imagePos = 'object-top',
  detailImage,
  detailImageAlt = '',
  insetImage,
  insetImageAlt = '',
  insetImagePos = 'object-center',
  variant = 'split',
  large = false,
  children,
}) => {
  if (variant === 'overlay') {
    return (
      <section
        className={`relative flex items-center overflow-hidden ${
          large ? 'min-h-[220px] sm:min-h-[300px] lg:min-h-[360px]' : 'min-h-[360px] sm:min-h-[420px] lg:min-h-[480px]'
        }`}
      >
        <img
          src={image}
          alt={imageAlt}
          aria-hidden={imageAlt ? undefined : 'true'}
          fetchPriority="high"
          className={`absolute inset-0 w-full h-full object-cover ${imagePos}`}
        />
        <div className="absolute inset-0 bg-white/70" aria-hidden="true" />

        <div className="relative w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14 lg:py-16 text-center">
          <Eyebrow label={eyebrow} flanked />
          <h1
            className={`${
              large ? 'text-display-xl font-extrabold' : 'text-display-lg'
            } font-heading font-semibold text-primary-700 mt-5 max-w-3xl mx-auto text-balance`}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-ink-800 mt-5 max-w-2xl mx-auto leading-relaxed text-pretty">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </section>
    );
  }

  if (variant === 'center') {
    return (
      <section className="bg-white">
        {image && (
          <img
            src={image}
            alt={imageAlt}
            aria-hidden={imageAlt ? undefined : 'true'}
            fetchPriority="high"
            className={`w-full h-[220px] sm:h-[300px] lg:h-[360px] object-cover ${imagePos}`}
          />
        )}

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-10 pb-9 lg:pt-12 lg:pb-10 text-center">
          <Eyebrow label={eyebrow} flanked />
          <h1 className="text-display font-heading font-semibold text-primary-700 mt-5 max-w-3xl mx-auto text-balance">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-ink-600 mt-5 max-w-2xl mx-auto leading-relaxed text-pretty">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-center">
          <div className="lg:col-span-6">
            <Eyebrow label={eyebrow} />
            <h1 className="text-display font-heading font-semibold text-primary-700 mt-5 text-balance">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg text-ink-600 mt-5 leading-relaxed max-w-xl text-pretty">
                {subtitle}
              </p>
            )}
            {children}
          </div>

          {(detailImage || image) && (
            <div className={`lg:col-span-6 ${insetImage ? 'relative pb-16 sm:pb-20 pl-10 sm:pl-16' : ''}`}>
              <img
                src={detailImage || image}
                alt={detailImage ? detailImageAlt : imageAlt}
                fetchPriority="high"
                className={`w-full aspect-[4/3] object-cover ${imagePos} rounded-2xl`}
              />
              {insetImage && (
                <img
                  src={insetImage}
                  alt={insetImageAlt}
                  className={`absolute bottom-0 left-0 w-[46%] aspect-[4/3] object-cover ${insetImagePos}
                              rounded-2xl ring-[6px] ring-white shadow-panel`}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
