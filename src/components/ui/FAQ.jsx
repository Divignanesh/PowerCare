import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import SectionHeader from './SectionHeader';

const FAQ = ({ faqs, badge = 'Frequently Asked Questions', title = 'Common Questions', subtitle = '' }) => {
  const [openId, setOpenId] = useState(null);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeader badge={badge} title={title} subtitle={subtitle} />

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-slate-200 rounded-lg overflow-hidden hover:border-accent-300 transition-colors"
            >
              <button
                onClick={() => setOpenId(openId === index ? null : index)}
                className="w-full flex items-center justify-between p-5 bg-white hover:bg-slate-50 transition-colors text-left"
              >
                <span className="font-semibold text-slate-900 text-sm pr-4">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-accent-500 flex-shrink-0 transition-transform duration-200 ${
                    openId === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openId === index && (
                <div className="px-5 py-4 bg-slate-50 border-t border-slate-200">
                  <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
