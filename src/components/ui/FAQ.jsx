import { useState, useId } from 'react';
import { Link } from 'react-router-dom';
import { Plus, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

/**
 * Questions read as an open list — no rules, no boxes, just space between
 * each row and one open at a time. The mark rotates from + to x so the
 * control states its own action.
 *
 * The heading sits in a left rail with a route out to a real person, so the
 * column beside the questions carries something rather than sitting empty.
 * Pages that already put a way to reach someone on the screen pass
 * `aside={false}` rather than asking twice.
 */
const FAQ = ({ faqs, badge = 'Frequently Asked Questions', title = 'Common Questions', subtitle = '', aside = true }) => {
  const [openId, setOpenId] = useState(null);
  const reduceMotion = useReducedMotion();
  const baseId = useId();

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-start">

          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <span className="section-badge">{badge}</span>
            <h2 className="text-display-sm font-heading font-semibold text-primary-700 mt-1 text-balance">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-5 text-ink-600 leading-relaxed text-pretty">{subtitle}</p>
            )}

            {aside && (
              <div className="mt-8 rounded-2xl bg-surface p-7">
                <h3 className="text-lg font-heading font-semibold text-ink-900 mb-2">Still have a question?</h3>
                <p className="text-ink-600 text-base leading-relaxed mb-5 text-pretty">
                  A coordinator will talk it through with you — no call centre, no script.
                </p>
                <Link to="/contact" className="btn-primary w-full">
                  Talk to a Coordinator <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </div>

          <div className="lg:col-span-8">
            <div className="space-y-2">
              {faqs.map((faq, index) => {
                const isOpen = openId === index;
                const panelId = `${baseId}-panel-${index}`;
                const buttonId = `${baseId}-button-${index}`;

                return (
                  <div key={index} className="rounded-2xl transition-colors duration-200 hover:bg-primary-50/60">
                    <h3>
                      <button
                        id={buttonId}
                        onClick={() => setOpenId(isOpen ? null : index)}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        className="group w-full flex items-start gap-4 sm:gap-6 py-5 px-4 text-left
                                   transition-colors duration-200 hover:text-primary-700"
                      >
                        <span className="font-mono text-xs font-semibold text-primary-600 tabular-nums pt-1.5 w-6 shrink-0">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="flex-1 font-heading font-semibold text-ink-900 text-base sm:text-lg leading-snug
                                         transition-colors duration-200 group-hover:text-primary-700">
                          {faq.q}
                        </span>
                        <span
                          className={`shrink-0 mt-0.5 text-primary-600 transition-transform duration-300 ease-out-soft
                                      ${isOpen ? 'rotate-45' : 'rotate-0'}`}
                          aria-hidden="true"
                        >
                          <Plus size={20} strokeWidth={1.75} />
                        </span>
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                          initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pb-6 pl-14 sm:pl-16 pr-10 text-ink-600 leading-relaxed text-pretty">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
