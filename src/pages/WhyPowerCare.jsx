import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, GraduationCap, Award, Shield, Users,
  Clock, Star, HeartHandshake, TrendingUp, BookOpen, Layers,
  UserCheck, Zap, ChevronRight, Brain, Activity, FileCheck, ChevronLeft
} from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import SEO from '../components/seo/SEO';

const PageHero = () => (
  <section className="relative pt-20 pb-12 bg-primary-900 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div className="text-white">
          <span className="text-accent-500 text-xs font-bold tracking-widest uppercase mb-4 block">
            The PowerCare Difference
          </span>
          <h1 className="text-3xl lg:text-3xl font-bold font-heading mb-5 leading-tight">
            Why Choose <span className="text-accent-500">PowerCare</span>?
          </h1>
          <p className="text-sm text-white/50 leading-relaxed mb-6">
            We're not just another staffing agency. PowerCare is a training-first, quality-obsessed, relationship-driven healthcare staffing company built to meet Ontario's most demanding care environments.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="btn-accent">Partner With Us <ArrowRight size={16} /></Link>
            <Link to="/careers" className="btn-white">Find a Job <ArrowRight size={16} /></Link>
          </div>
        </div>
        <div className="hidden lg:grid grid-cols-2 gap-4">
          {[
            { icon: GraduationCap, label: 'In-House Training',    sub: 'Exclusive 80-hour program'      },
            { icon: Shield,        label: 'Rigorous Vetting',     sub: '10-step screening process'       },
            { icon: Clock,         label: '24/7 Availability',    sub: 'Emergency coverage'              },
            { icon: Award,         label: 'Quality Guaranteed',   sub: 'Placement satisfaction policy'   },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-white">
              <Icon size={16} className="text-accent-500 mb-2" />
              <div className="font-semibold text-sm">{label}</div>
              <div className="text-white/40 text-xs mt-0.5">{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const InHouseTraining = () => (
  <section className="section-padding bg-white">
    <div className="container-custom">
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <span className="section-badge">
            <GraduationCap size={13} />
            Signature Training Program
          </span>
          <h2 className="section-title mb-5">
            In-House Training That Sets Our Staff Apart
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-4">
            The most significant differentiator at PowerCare is our <strong className="text-slate-800">proprietary in-house training program</strong>. While most staffing agencies place staff from day one with nothing more than credential verification, every PowerCare professional completes our comprehensive onboarding and skills program before their first placement.
          </p>
          <p className="text-slate-500 text-sm leading-relaxed mb-4">
            This means that when a PowerCare nurse or PSW walks through your doors, they are not learning on the job. They arrive prepared — clinically, professionally, and culturally — to deliver the standard of care your residents and clients deserve.
          </p>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            Our training is developed and delivered by registered healthcare professionals with decades of frontline experience in Ontario's long-term care, home care, and acute care settings.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="btn-primary">
              Hire Trained Staff <ArrowRight size={16} />
            </Link>
            <Link to="/careers" className="btn-secondary">
              Join Our Training Program <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          {[
            {
              icon: Brain,        title: 'Clinical Foundations & Safety',    hours: '20 hrs',
              topics: ['Infection prevention & control (IPAC)', 'Medication awareness & safety', 'Emergency response protocols', 'Documentation & reporting standards'],
            },
            {
              icon: HeartHandshake, title: 'Person-Centred Care Practice',  hours: '16 hrs',
              topics: ['Resident rights & dignity', 'Cultural humility & sensitivity', 'Dementia & cognitive care techniques', 'Communication & family engagement'],
            },
            {
              icon: Activity,     title: 'Role-Specific Skills Training',   hours: '24 hrs',
              topics: ['Hands-on simulation labs', 'Equipment and technology training', 'Facility workflow familiarization', 'Specialty area competencies'],
            },
            {
              icon: FileCheck,    title: 'Compliance & Regulatory Readiness', hours: '12 hrs',
              topics: ['Ontario LTC Act requirements', 'MOHLTC compliance standards', 'RNAO best practice guidelines', 'Privacy & PHIPA awareness'],
            },
            {
              icon: Users,        title: 'Professional Standards & Ethics', hours: '8 hrs',
              topics: ['Professional conduct & accountability', 'Workplace violence prevention', 'Trauma-informed care principles', 'Staff wellness & resilience'],
            },
          ].map(({ icon: Icon, title, hours, topics }) => (
            <div key={title} className="bg-surface rounded-xl p-4 border border-slate-200 hover:border-accent-300 transition-colors group">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-primary-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h4 className="font-semibold text-slate-900 text-sm">{title}</h4>
                    <span className="text-xs text-accent-500 font-semibold whitespace-nowrap">{hours}</span>
                  </div>
                  <ul className="space-y-1">
                    {topics.map((t) => (
                      <li key={t} className="flex items-start gap-2 text-xs text-slate-500">
                        <CheckCircle size={10} className="text-accent-500 mt-0.5 flex-shrink-0" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
          <div className="bg-primary-900 rounded-xl p-4 text-white flex items-center justify-between">
            <div>
              <div className="font-bold text-base">80 Hours Total</div>
              <div className="text-white/50 text-sm">Before first placement</div>
            </div>
            <GraduationCap size={32} className="text-accent-500" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const TrainedProfessionals = () => (
  <section className="section-padding bg-surface">
    <div className="container-custom">
      <SectionHeader
        badge="Trained Professionals"
        title="What Makes a PowerCare Professional Different"
        subtitle="Beyond credentials and background checks, our staff complete role-specific training that makes them immediately effective in your environment."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {[
          {
            icon: BookOpen,
            title: 'Pre-Placement Certification',
            desc: 'Every professional receives a PowerCare certification of completion before their first shift, documenting specific modules and competencies mastered.',
          },
          {
            icon: Layers,
            title: 'Specialty Track Options',
            desc: 'Staff can complete advanced specialty tracks in dementia care, palliative support, behavioural intervention, and rehabilitation assistance.',
          },
          {
            icon: TrendingUp,
            title: 'Continuing Education',
            desc: 'Active PowerCare staff have access to quarterly training updates, new regulation briefings, and skills workshops to keep their practice current.',
          },
          {
            icon: UserCheck,
            title: 'Competency Assessment',
            desc: 'Written and practical competency assessments are conducted at the end of training. Only staff who meet our performance threshold are cleared for placement.',
          },
          {
            icon: HeartHandshake,
            title: 'Culture & Fit Orientation',
            desc: "We train staff not just in skills, but in professional standards, facility etiquette, team integration, and the PowerCare commitment to excellence.",
          },
          {
            icon: Shield,
            title: 'Ongoing Performance Review',
            desc: 'Placed staff are subject to regular quality reviews and client feedback collection. Performance issues are addressed swiftly through our accountability process.',
          },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="card">
            <div className="w-9 h-9 bg-primary-100 rounded-lg flex items-center justify-center mb-3">
              <Icon size={15} className="text-primary-700" />
            </div>
            <h3 className="font-bold font-heading text-slate-900 text-sm mb-2">{title}</h3>
            <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* Comparison table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="text-sm font-bold font-heading text-slate-900">PowerCare vs. Typical Staffing Agency</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface">
                <th className="text-left px-5 py-3 font-semibold text-slate-600 text-xs">What Matters</th>
                <th className="px-5 py-3 font-semibold text-accent-500 text-xs">PowerCare</th>
                <th className="px-5 py-3 font-semibold text-slate-400 text-xs">Typical Agency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                ['In-house training program',           true,  false        ],
                ['Pre-placement competency assessment', true,  false        ],
                ['Role-specific specialty tracks',      true,  false        ],
                ['Credential verification',             true,  'Sometimes'  ],
                ['24/7 emergency dispatch',             true,  'Sometimes'  ],
                ['Dedicated account manager',           true,  false        ],
                ['Post-placement quality follow-up',    true,  false        ],
                ['Ongoing continuing education',        true,  false        ],
                ['Culture & fit orientation',           true,  false        ],
                ['WSIB & liability coverage',           true,  true         ],
              ].map(([feature, pc, typical]) => (
                <tr key={feature} className="hover:bg-surface">
                  <td className="px-5 py-3 font-medium text-slate-700 text-sm">{feature}</td>
                  <td className="px-5 py-3 text-center">
                    {pc === true ? (
                      <CheckCircle size={16} className="text-accent-500 mx-auto" />
                    ) : (
                      <span className="text-slate-300 text-base">✗</span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-center">
                    {typical === true ? (
                      <CheckCircle size={16} className="text-green-500 mx-auto" />
                    ) : typical === false ? (
                      <span className="text-red-300 text-base font-bold">✗</span>
                    ) : (
                      <span className="text-slate-400 text-xs">{typical}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
);

const VettingProcess = () => (
  <section className="section-padding bg-white">
    <div className="container-custom">
      <SectionHeader
        badge="Our Screening Process"
        title="10-Step Candidate Vetting"
        subtitle="We leave no stone unturned. Our multi-step screening ensures only the most qualified, trustworthy professionals represent PowerCare."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { step: 1,  title: 'Application Review',       desc: 'Education, experience, and professional history evaluation.' },
          { step: 2,  title: 'Initial Interview',        desc: 'Values, goals, and professional alignment assessment.' },
          { step: 3,  title: 'Credential Verification',  desc: 'CNO, COTO, and relevant college registration confirmed.' },
          { step: 4,  title: 'Reference Checks',         desc: 'Minimum 2 professional references from recent supervisors.' },
          { step: 5,  title: 'Vulnerable Sector Screening', desc: 'Enhanced RCMP criminal record check required.' },
          { step: 6,  title: 'Health & Immunization',    desc: 'Up-to-date immunization records and health clearances.' },
          { step: 7,  title: 'Skills Assessment',        desc: 'Role-specific practical and theoretical competency testing.' },
          { step: 8,  title: 'In-House Training',        desc: '80-hour PowerCare certification program completed.' },
          { step: 9,  title: 'Supervised Trial',         desc: 'Supervised shift(s) to confirm readiness and professionalism.' },
          { step: 10, title: 'Cleared for Placement',    desc: 'Final approval by our Quality & Compliance team.' },
        ].map(({ step, title, desc }) => (
          <div key={step} className="bg-surface rounded-xl p-4 border border-slate-200 hover:border-accent-300 transition-colors">
            <div className="w-7 h-7 bg-primary-900 rounded-lg flex items-center justify-center text-white font-bold text-xs mb-3">
              {step}
            </div>
            <div className="font-semibold text-slate-900 text-sm mb-1">{title}</div>
            <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const KeyPillars = () => (
  <section className="section-padding bg-primary-900 text-white">
    <div className="container-custom">
      <SectionHeader
        badge="Our Pillars"
        title="Four Reasons Facilities Choose PowerCare"
        subtitle="Beyond training, here is what defines the PowerCare experience."
        light
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          {
            icon: Zap,           number: '01', title: 'Rapid Response',
            desc: 'Our 24/7 dispatch team can confirm and deploy qualified staff within hours of a call — including overnight and holiday emergencies.',
          },
          {
            icon: Star,          number: '02', title: 'Quality Assurance',
            desc: 'Every placement includes post-shift follow-up, regular performance reviews, and an open-door policy for facility feedback.',
          },
          {
            icon: HeartHandshake, number: '03', title: 'Long-Term Partnerships',
            desc: "We invest in understanding your facility's culture, workflows, and standards so that every placement feels like a seamless extension of your team.",
          },
          {
            icon: TrendingUp,    number: '04', title: 'Scalable Solutions',
            desc: 'From covering a single last-minute shift to managing a complete staffing strategy across multiple locations, PowerCare scales to your needs.',
          },
        ].map(({ icon: Icon, number, title, desc }) => (
          <div key={title} className="bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <Icon size={16} className="text-accent-500" />
              <span className="text-accent-500 font-bold text-lg font-heading">{number}</span>
            </div>
            <h3 className="font-bold font-heading text-sm mb-2">{title}</h3>
            <p className="text-white/50 text-xs leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FeaturedTestimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = [
    {
      quote: "The difference with PowerCare is immediately obvious. Their staff arrive prepared, professional, and genuinely invested in our residents' well-being. You can tell they've been trained — and trained well. We've stopped using any other agency.",
      name: "Jennifer Liu",
      title: "Director of Care",
      facility: "Long-Term Care Home — Barrie, ON",
      initials: "JL"
    },
    {
      quote: "PowerCare has transformed our staffing challenges. Their 24/7 support and quality of staff are unmatched. We can now focus on care instead of worrying about coverage.",
      name: "Sarah Chen",
      title: "Facility Manager",
      facility: "Retirement Residence — Toronto, ON",
      initials: "SC"
    },
    {
      quote: "What I appreciate most is their commitment to quality. Every PowerCare professional is well-trained and arrives ready to work. It makes a real difference in our day-to-day operations.",
      name: "Michael Patterson",
      title: "Director of Operations",
      facility: "Community Care Agency — Mississauga, ON",
      initials: "MP"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="section-padding bg-surface">
      <div className="container-custom max-w-3xl">
        <div className="relative">
          <blockquote className="text-center">
            <div className="flex gap-0.5 justify-center mb-5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-accent-500 fill-accent-500" />
              ))}
            </div>
            <p className="text-base font-heading font-medium text-slate-800 leading-relaxed mb-5 italic">
              "{current.quote}"
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="font-bold text-primary-700 text-sm">{current.initials}</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-slate-900 text-sm">{current.name}</div>
                <div className="text-slate-400 text-xs">{current.title}, {current.facility}</div>
              </div>
            </div>
          </blockquote>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button onClick={prevTestimonial} className="p-2 rounded-lg border border-slate-200 hover:border-accent-400 hover:bg-accent-50 transition-all">
              <ChevronLeft size={18} className="text-slate-600" />
            </button>
            <div className="flex gap-1.5">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex ? 'bg-accent-500 w-6' : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>
            <button onClick={nextTestimonial} className="p-2 rounded-lg border border-slate-200 hover:border-accent-400 hover:bg-accent-50 transition-all">
              <ChevronRight size={18} className="text-slate-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const WhyPowerCareCTA = () => (
  <section className="section-padding bg-white">
    <div className="container-custom text-center">
      <h2 className="section-title mb-4">Experience the PowerCare Difference</h2>
      <p className="section-subtitle mx-auto mb-8">
        Partner with a staffing agency that invests in its people — so your facility always gets the best.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/contact" className="btn-primary text-sm px-5 py-2.5">Get Staffing Support <ArrowRight size={16} /></Link>
        <Link to="/services" className="btn-secondary text-sm px-5 py-2.5">Our Services <ChevronRight size={16} /></Link>
      </div>
    </div>
  </section>
);

const WhyPowerCare = () => (
  <main>
    <SEO page="whyPowerCare" />
    <PageHero />
    <InHouseTraining />
    <TrainedProfessionals />
    <VettingProcess />
    <KeyPillars />
    <FeaturedTestimonial />
    <WhyPowerCareCTA />
  </main>
);

export default WhyPowerCare;
