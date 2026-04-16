import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, Users, Award, Heart, Target,
  Eye, Lightbulb, Shield, Star
} from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import FAQ from '../components/ui/FAQ';
import { aboutFAQs } from '../data/faqs';
import SEO from '../components/seo/SEO';

const PageHero = () => (
  <section className="relative py-12 lg:py-16 bg-primary-900 overflow-hidden flex items-center">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center w-full">
      <span className="text-accent-500 text-xl font-bold tracking-widest uppercase mb-4 block">
        Our Story
      </span>
      <h1 className="text-4xl lg:text-5xl font-bold font-heading text-white mb-4">
        About PowerCare
      </h1>
      <p className="text-sm text-white/50 max-w-2xl mx-auto">
        Founded on the belief that quality healthcare staffing can transform lives — for caregivers, clients, and the communities we serve.
      </p>
    </div>
  </section>
);

const OurStory = () => (
  <section className="section-padding bg-white">
    <div className="container-custom">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <span className="section-badge">Our Story</span>
          <h2 className="section-title mb-5 text-3xl lg:text-4xl">
            A Staffing Agency Built from the Inside Out
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-4">
            PowerCare was founded by healthcare professionals who lived the staffing crisis firsthand. We watched facilities struggle to fill shifts, saw burnout take its toll on dedicated staff, and experienced the impact of mismatched placements on resident care.
          </p>
          <p className="text-slate-500 text-sm leading-relaxed mb-4">
            Our founders built PowerCare with a single conviction: <strong className="text-slate-800">that dependable, trained, and compassionate staffing is not a luxury — it is a necessity.</strong>
          </p>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            Today, PowerCare serves hundreds of facilities across the Greater Toronto Area and Rural Ontario, connecting them with thousands of pre-trained healthcare professionals.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <Link to="/why-powercare" className="btn-primary flex-1 sm:flex-initial justify-center">
              Why PowerCare <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="btn-secondary flex-1 sm:flex-initial justify-center">
              Get in Touch
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { value: '5,000+', label: 'Shifts Filled',       sub: 'and counting'      },
            { value: '500+',   label: 'Facility Partners',   sub: 'across Ontario'    },
            { value: '98%',    label: 'Satisfaction Rate',   sub: 'client reported'   },
            { value: '2 hrs',  label: 'Avg Response Time',   sub: 'emergency coverage'},
          ].map(({ value, label, sub }) => (
            <div key={label} className="border border-slate-200 rounded-xl p-5 text-center">
              <div className="text-xl font-bold font-heading text-accent-500">{value}</div>
              <div className="font-semibold text-slate-800 text-sm mt-1">{label}</div>
              <div className="text-slate-400 text-xs mt-0.5">{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const MissionVisionValues = () => (
  <section className="section-padding bg-surface min-h-screen flex items-center">
    <div className="container-custom w-full">
      <SectionHeader
        badge="Our Foundation"
        title="Mission, Vision & Values"
        subtitle="The principles that guide every hire, every placement, and every interaction."
      />
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {[
          {
            icon: Target,
            title: 'Our Mission',
            content: 'To deliver dependable, quality healthcare staffing solutions that empower facilities to focus on what matters most — delivering exceptional care to every individual they serve.',
          },
          {
            icon: Eye,
            title: 'Our Vision',
            content: 'A healthcare system across Ontario where no facility is understaffed, no caregiver is undervalued, and every patient receives consistent, compassionate care.',
          },
          {
            icon: Lightbulb,
            title: 'Our Approach',
            content: 'We go beyond transactional staffing. By investing in rigorous in-house training, meaningful relationships, and continuous improvement, we build long-term partnerships.',
          },
        ].map(({ icon: Icon, title, content }) => (
          <div key={title} className="card text-center">
            <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Icon size={18} className="text-primary-600" />
            </div>
            <h3 className="text-sm font-bold font-heading text-slate-900 mb-3">{title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{content}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-bold font-heading text-slate-900 text-center mb-10">Core Values</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Heart,  title: 'Compassion', desc: 'We care deeply about the people we serve and the professionals we support.' },
            { icon: Shield, title: 'Integrity',  desc: 'We operate with complete transparency, honesty, and accountability in every relationship.' },
            { icon: Award,  title: 'Excellence', desc: 'We set the bar high — in our training programs, our vetting standards, and our service delivery.' },
            { icon: Users,  title: 'Community',  desc: 'We are invested in the health and strength of Ontario communities, from the city core to rural towns.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="text-center">
              <Icon size={18} className="text-accent-500 mx-auto mb-3" />
              <div className="font-semibold text-slate-900 text-sm mb-1">{title}</div>
              <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Leadership = () => (
  <section className="section-padding bg-white">
    <div className="container-custom">
      <SectionHeader
        badge="Our Team"
        title="Leadership with Purpose"
        subtitle="PowerCare is led by experienced healthcare and staffing professionals who bring firsthand understanding to every decision."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'Dr. Priya Nair',    role: 'Founder & CEO',                    initial: 'P', bio: 'Former RN and healthcare operations director with 18 years in Ontario LTC and community care settings.' },
          { name: 'Marcus Thompson',   role: 'Director of Staffing Operations',  initial: 'M', bio: 'Staffing industry veteran with deep expertise in healthcare workforce management and compliance.' },
          { name: 'Amara Osei',        role: 'Director of Training & Quality',   initial: 'A', bio: "Registered Practical Nurse turned training specialist; architect of PowerCare's in-house certification programs." },
        ].map(({ name, role, initial, bio }) => (
          <div key={name} className="card text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-lg font-bold text-primary-700">{initial}</span>
            </div>
            <div className="font-bold text-sm font-heading text-slate-900">{name}</div>
            <div className="text-accent-500 text-xs font-medium mt-1 mb-3">{role}</div>
            <p className="text-slate-500 text-xs leading-relaxed">{bio}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Accreditations = () => (
  <section className="section-padding bg-primary-900">
    <div className="container-custom text-center">
      <SectionHeader
        badge="Credentials & Compliance"
        title="Accredited, Insured & Compliant"
        subtitle="PowerCare meets and exceeds all Ontario healthcare staffing regulations and industry standards."
        light
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { icon: Shield,       title: 'WSIB Compliant',      desc: 'All placed workers are WSIB covered for your protection.' },
          { icon: CheckCircle,  title: 'Background Checked',  desc: 'Thorough criminal record and vulnerable sector screening.' },
          { icon: Award,        title: 'CNO & COTO Verified', desc: 'Registered nurses and therapy staff are college-verified.' },
          { icon: Star,         title: 'Quality Audited',     desc: 'Regular performance reviews and placement quality audits.' },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-white/5 border border-white/10 rounded-xl p-5 text-white">
            <Icon size={18} className="text-accent-500 mx-auto mb-3" />
            <div className="font-semibold text-sm mb-2">{title}</div>
            <p className="text-white/50 text-xs leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AboutCTA = () => (
  <section className="section-padding bg-white">
    <div className="container-custom text-center">
      <h2 className="section-title mb-4">Ready to Work with PowerCare?</h2>
      <p className="section-subtitle mx-auto mb-8">
        Whether you need to fill a shift today or build a long-term staffing strategy, we're here.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/contact" className="btn-primary text-sm px-5 py-2.5">Partner With Us <ArrowRight size={16} /></Link>
        <Link to="/careers" className="btn-secondary text-sm px-5 py-2.5">Find a Job <ArrowRight size={16} /></Link>
      </div>
    </div>
  </section>
);

const AboutUs = () => (
  <main>
    <SEO page="about" />
    <PageHero />
    <OurStory />
    <MissionVisionValues />
    <Leadership />
    <Accreditations />
    <FAQ faqs={aboutFAQs} badge="About PowerCare" title="Questions About Our Company" subtitle="Learn more about PowerCare's mission, values, and commitment to healthcare staffing excellence." />
    <AboutCTA />
  </main>
);

export default AboutUs;
