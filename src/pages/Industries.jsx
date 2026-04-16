import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, Building2, Home, Hospital, Heart,
  Users, Activity, Brain, ChevronRight, Shield
} from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import { industries } from '../data/industries';
import SEO from '../components/seo/SEO';

const iconMap = { Building2, Home, Hospital, Heart, Users, Activity, Brain };

const PageHero = () => (
  <section className="relative pt-20 pb-20 bg-primary-900 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
      <span className="text-accent-500 text-xl font-bold tracking-widest uppercase mb-2 block">
        Industries We Serve
      </span>
      <h1 className="text-3xl font-bold font-heading text-white mb-4">
        Built for Every Care Setting
      </h1>
      <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
        PowerCare understands that staffing needs differ across care sectors. We bring specialized expertise and pre-trained professionals to every industry we serve.
      </p>
      <div className="flex flex-wrap gap-2 justify-center">
        {industries.map((ind) => {
          const Icon = iconMap[ind.icon] || Shield;
          return (
            <a
              key={ind.id}
              href={`#${ind.id}`}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 text-white/60 text-xs rounded-lg hover:bg-white/10 hover:text-white transition-colors"
            >
              <Icon size={12} />
              {ind.title}
            </a>
          );
        })}
      </div>
    </div>
  </section>
);

const IndustriesOverview = () => (
  <section className="bg-white py-8 border-b border-slate-100">
    <div className="container-custom">
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4">
        {industries.map((ind) => {
          const Icon = iconMap[ind.icon] || Shield;
          return (
            <a key={ind.id} href={`#${ind.id}`} className="flex flex-col items-center gap-2 text-center group">
              <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center group-hover:bg-accent-100 transition-colors">
                <Icon size={17} className="text-primary-700 group-hover:text-accent-500" />
              </div>
              <span className="text-xs text-slate-500 font-medium leading-tight group-hover:text-primary-700 transition-colors">
                {ind.title}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  </section>
);

const IndustrySection = ({ industry, index }) => {
  const Icon = iconMap[industry.icon] || Shield;
  const isEven = index % 2 === 0;

  return (
    <section id={industry.id} className={`section-padding ${isEven ? 'bg-white' : 'bg-surface'}`}>
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
              <Icon size={17} className="text-primary-700" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-heading text-slate-900">{industry.title}</h2>
              <span className="text-accent-500 text-xs font-bold tracking-widest uppercase mt-0.5 block">
                {industry.heroStat} {industry.heroStatLabel}
              </span>
            </div>
          </div>
          <Link to="/contact" className="btn-primary text-sm whitespace-nowrap self-start sm:self-auto">
            Get Staff for This Sector <ArrowRight size={14} />
          </Link>
        </div>

        <div className={`grid lg:grid-cols-2 gap-8 items-start ${!isEven ? 'lg:grid-flow-dense' : ''}`}>
          {/* Description */}
          <div className={!isEven ? 'lg:col-start-2' : ''}>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">{industry.description}</p>
            <div className="mb-4">
              <h4 className="font-semibold text-slate-900 text-sm mb-3">Roles We Place in This Sector</h4>
              <div className="flex flex-wrap gap-2">
                {industry.roles.map((role) => (
                  <span key={role} className="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-lg border border-primary-100">
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Challenges & Solutions */}
          <div className={!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-5 border border-red-100">
                <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2 text-xs">
                  <span className="w-4 h-4 bg-red-100 rounded flex items-center justify-center text-red-500 text-[10px] font-bold">!</span>
                  Common Challenges
                </h4>
                <ul className="space-y-2">
                  {industry.challenges.map((c) => (
                    <li key={c} className="text-slate-500 text-xs leading-relaxed flex items-start gap-2">
                      <span className="text-red-300 mt-0.5 flex-shrink-0">›</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl p-5 border border-accent-200">
                <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2 text-xs">
                  <CheckCircle size={13} className="text-accent-500" />
                  PowerCare Solutions
                </h4>
                <ul className="space-y-2">
                  {industry.ourSolutions.map((s) => (
                    <li key={s} className="text-slate-500 text-xs leading-relaxed flex items-start gap-2">
                      <CheckCircle size={10} className="text-accent-500 mt-0.5 flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const IndustriesCTA = () => (
  <section className="section-padding bg-primary-900">
    <div className="container-custom text-center text-white">
      <SectionHeader
        badge="Get Started"
        title="Staff Your Facility Today"
        subtitle="Tell us about your sector and staffing needs. We'll respond within 2 hours."
        light
      />
      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/contact" className="btn-accent text-sm px-5 py-2.5">
          Request Staff <ArrowRight size={16} />
        </Link>
        <Link to="/services" className="btn-white text-sm px-5 py-2.5">
          Browse Services <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  </section>
);

const Industries = () => (
  <main>
    <SEO page="industries" />
    <PageHero />
    <IndustriesOverview />
    {industries.map((ind, i) => (
      <IndustrySection key={ind.id} industry={ind} index={i} />
    ))}
    <IndustriesCTA />
  </main>
);

export default Industries;
