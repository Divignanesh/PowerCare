/**
 * Section header.
 *
 * Two arrangements, both built on the same parts:
 *  - split (default when `centered` is false): eyebrow and title on the left,
 *    the standfirst set in a second column, closed by a full-width rule. Reads
 *    like a page in a report rather than a stack of centred marketing copy.
 *  - centred: the eyebrow is flanked by rules, keeping the axis honest.
 */
/** Mono label prefixed with a rule; flanked on both sides when centred. */
const Eyebrow = ({ badge, tone, ruleTone, flanked }) =>
  badge ? (
    <span className={`inline-flex items-center gap-2.5 font-mono text-[0.6875rem] font-medium tracking-widest uppercase ${tone}`}>
      <span className={`block w-6 h-px ${ruleTone}`} aria-hidden="true" />
      {badge}
      {flanked && <span className={`block w-6 h-px ${ruleTone}`} aria-hidden="true" />}
    </span>
  ) : null;

import Reveal from './Reveal';

const SectionHeader = ({ badge, title, subtitle, centered = true, light = false }) => {
  const eyebrowTone = light ? 'text-accent-300' : 'text-primary-700';
  const ruleTone    = light ? 'bg-accent-300/60' : 'bg-primary-400';
  const titleTone   = light ? 'text-white' : 'text-ink-900';
  const subTone     = light ? 'text-white/65' : 'text-ink-600';

  if (centered) {
    return (
      <Reveal className="mb-7 lg:mb-8 text-center">
        <Eyebrow badge={badge} tone={eyebrowTone} ruleTone={ruleTone} flanked />
        <h2 className={`text-display-sm font-heading font-semibold mt-5 max-w-3xl mx-auto text-balance ${titleTone}`}>
          {title}
        </h2>
        {subtitle && (
          <p className={`mt-5 text-base leading-relaxed max-w-2xl mx-auto text-pretty ${subTone}`}>
            {subtitle}
          </p>
        )}
      </Reveal>
    );
  }

  return (
    <Reveal className="mb-7 lg:mb-8">
      <div className="grid lg:grid-cols-12 gap-x-10 gap-y-5 items-end">
        <div className="lg:col-span-7">
          <Eyebrow badge={badge} tone={eyebrowTone} ruleTone={ruleTone} />
          <h2 className={`text-display-sm font-heading font-semibold mt-5 text-balance ${titleTone}`}>
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className={`lg:col-span-5 text-base leading-relaxed text-pretty ${subTone}`}>
            {subtitle}
          </p>
        )}
      </div>
    </Reveal>
  );
};

export default SectionHeader;
