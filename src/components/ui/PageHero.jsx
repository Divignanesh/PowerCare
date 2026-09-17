import CredentialBadges from './CredentialBadges';

/**
 * Page hero.
 *
 * Every page opens on a photograph of real care work, laid under a deep
 * brand scrim so the type stays legible whatever the picture does. This is
 * the register the sector actually uses — a staffing agency sells people, so
 * people belong above the fold rather than a pale empty wash.
 *
 *  - "split"  — copy on the left, the photograph carried full-bleed behind
 *               and a framed detail shot on the right.
 *  - "center" — centred copy over the full-bleed photograph.
 *
 * The credential strip is welded to the foot of the hero, so WSIB coverage,
 * screening and registration are read at first glance on every page.
 */

const Eyebrow = ({ label, flanked }) =>
  label ? (
    <span className="inline-flex items-center gap-2.5 font-mono text-[0.6875rem] font-semibold uppercase tracking-widest text-accent-300">
      <span className="block w-6 h-px bg-accent-300/70" aria-hidden="true" />
      {label}
      {flanked && <span className="block w-6 h-px bg-accent-300/70" aria-hidden="true" />}
    </span>
  ) : null;

/** The proof bar that closes every hero. */
const CredentialBar = () => (
  <div className="relative z-10 border-t border-white/15 bg-primary-900/70 backdrop-blur-sm">
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-4">
      <CredentialBadges variant="hero" />
    </div>
  </div>
);

/** The photograph, its scrim and the ruled field, as one layer. */
const Background = ({ image, imageAlt, variant }) => (
  <>
    <img
      src={image}
      alt={imageAlt}
      aria-hidden={imageAlt ? undefined : 'true'}
      fetchPriority="high"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div
      className={`absolute inset-0 ${variant === 'center' ? 'scrim-soft' : 'scrim'}`}
      aria-hidden="true"
    />
    <div className="absolute inset-0 bg-grid-invert pointer-events-none" aria-hidden="true" />
  </>
);

const PageHero = ({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt = '',
  detailImage,
  detailImageAlt = '',
  variant = 'split',
  children,
}) => {
  if (variant === 'center') {
    return (
      <section className="relative bg-primary-900 overflow-hidden">
        <Background image={image} imageAlt={imageAlt} variant={variant} />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-28 lg:pb-24 text-center">
          <Eyebrow label={eyebrow} flanked />
          <h1 className="text-display font-heading font-semibold text-white mt-6 max-w-3xl mx-auto text-balance wdth-wide">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-white/80 mt-6 max-w-2xl mx-auto leading-relaxed text-pretty">
              {subtitle}
            </p>
          )}
          {children}
        </div>

        <CredentialBar />
      </section>
    );
  }

  return (
    <section className="relative bg-primary-900 overflow-hidden">
      <Background image={image} imageAlt={imageAlt} variant={variant} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-center">
          <div className="lg:col-span-7">
            <Eyebrow label={eyebrow} />
            <h1 className="text-display font-heading font-semibold text-white mt-6 text-balance wdth-wide">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg text-white/80 mt-6 leading-relaxed max-w-xl text-pretty">
                {subtitle}
              </p>
            )}
            {children}
          </div>

          {detailImage && (
            <div className="lg:col-span-5">
              <img
                src={detailImage}
                alt={detailImageAlt}
                className="w-full aspect-[4/3] object-cover object-[center_20%] rounded-2xl border border-white/20 shadow-panel"
              />
            </div>
          )}
        </div>
      </div>

      <CredentialBar />
    </section>
  );
};

export default PageHero;
