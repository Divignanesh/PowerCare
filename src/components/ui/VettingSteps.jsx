import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { Check } from 'lucide-react';
import { VETTING_STEPS } from '../../data/vetting';

const EASE = [0.22, 1, 0.36, 1];

/**
 * The ten screening steps, as a vertical track.
 *
 * A genuine sequence, so it is an ordered list and it is numbered. The rail
 * fills in step with the reader's own scroll position, so progress down the
 * page and progress through the process are the same movement.
 */
const VettingSteps = ({ className = '' }) => {
  const reduce = useReducedMotion();
  const trackRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 0.75', 'end 0.6'],
  });
  // Smoothed so the rail glides rather than tracking every wheel tick.
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });

  return (
    <div ref={trackRef} className={`relative ${className}`}>
      {/* Rail — sits behind the nodes, centred on them. */}
      <div
        className="absolute left-[21px] sm:left-[23px] top-3 bottom-3 w-0.5 bg-ink-200"
        aria-hidden="true"
      />
      <motion.div
        className="absolute left-[21px] sm:left-[23px] top-3 bottom-3 w-0.5 bg-primary-600 origin-top"
        aria-hidden="true"
        style={reduce ? { scaleY: 1 } : { scaleY: fill }}
      />

      <ol className="relative space-y-4">
        {VETTING_STEPS.map(({ step, title, desc }) => {
          const isLast = step === VETTING_STEPS.length;
          return (
            <motion.li
              key={step}
              className="flex items-start gap-5 sm:gap-7"
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <span
                className={`relative z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center
                            flex-shrink-0 font-mono text-sm font-medium tabular-nums
                            ring-4 ring-white transition-colors duration-300 ${
                  isLast
                    ? 'bg-primary-700 text-white'
                    : 'bg-white border-2 border-primary-600 text-primary-700'
                }`}
              >
                {isLast
                  ? <Check size={20} strokeWidth={2.6} aria-hidden="true" />
                  : String(step).padStart(2, '0')}
              </span>

              <div
                className="flex-1 min-w-0 min-h-[104px] flex flex-col justify-center
                           rounded-xl bg-white border border-ink-200 px-6 py-5
                           shadow-card transition-[border-color,box-shadow,transform] duration-300 ease-out-soft
                           hover:border-primary-300 hover:shadow-card-hover hover:-translate-y-0.5"
              >
                <div className="sm:flex sm:items-baseline sm:justify-between sm:gap-6">
                  <h3 className="font-heading font-semibold text-ink-900 text-lg">{title}</h3>
                </div>
                <p className="text-ink-600 text-[0.9375rem] leading-relaxed text-pretty mt-1.5">{desc}</p>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
};

export default VettingSteps;
