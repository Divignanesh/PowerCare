import { useState, useId } from 'react';
import { Plus } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import SectionHeader from './SectionHeader';

/**
 * Questions read as a ruled list rather than a stack of boxes — a hairline
 * between each row, the number in mono at the margin, and one row open at a
 * time. The mark rotates from + to x so the control states its own action.
 */
const FAQ = ({ faqs, badge = 'Frequently Asked Questions', title = 'Common Questions', subtitle = '' }) => {
  const [openId, setOpenId] = useState(null);
  const reduceMotion = useReducedMotion();
  const baseId = useId();

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeader badge={badge} title={title} subtitle={subtitle} centered={false} />

        <div className="lg:grid lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-start-3 lg:col-span-8">
            <div className="space-y-1">
              {faqs.map((faq, index) => {
                const isOpen = openId === index;
                const panelId = `${baseId}-panel-${index}`;
                const buttonId = `${baseId}-button-${index}`;

                return (
                  <div key={index} className="rounded-xl transition-colors duration-200 hover:bg-primary-50/60">
                    <h3>
                      <button
                        id={buttonId}
                        onClick={() => setOpenId(isOpen ? null : index)}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        className="group w-full flex items-start gap-4 sm:gap-6 py-5 px-4 text-left
                                   transition-colors duration-200 hover:text-primary-700"
                      >
                        <span className="font-mono text-xs font-medium text-primary-500 tabular-nums pt-1 w-6 shrink-0">
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
