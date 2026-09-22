
/**
 * Page hero.
 *
 * The photograph is shown as it was taken — no scrim, no ruled field, no deep
 * ground. Type sits on white beneath or beside it rather than on top of it,
 * which is what lets the picture stay bright and still be read past.
 *
 *  - "center" — the photograph full-bleed as a band, copy centred below it.
 *  - "split"  — copy on the left, the photograph framed on the right.
 *
 * `imagePos` is the object-position for the photograph. The band crops hard,
 * and a top crop loses the subject on frames where they sit low, so those
 * pages pass their own.

 */

const Eyebrow = ({ label, flanked }) =>
  label ? (
    <span className="inline-flex items-center gap-2.5 font-mono text-[0.6875rem] font-semibold uppercase tracking-widest text-primary-700">
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
  variant = 'split',
  children,
}) => {
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
          <h1 className="text-display font-heading font-semibold text-ink-900 mt-5 max-w-3xl mx-auto text-balance">
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
            <h1 className="text-display font-heading font-semibold text-ink-900 mt-5 text-balance">
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
            <div className="lg:col-span-6">
              <img
                src={detailImage || image}
                alt={detailImage ? detailImageAlt : imageAlt}
                fetchPriority="high"
                className={`w-full aspect-[4/3] object-cover ${imagePos} rounded-2xl`}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
