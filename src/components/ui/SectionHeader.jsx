const SectionHeader = ({ badge, title, subtitle, centered = true, light = false }) => {
  return (
    <div className={`mb-10 ${centered ? 'text-center' : ''}`}>
      {badge && (
        <span className={`inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase mb-3 ${
          light ? 'text-accent-400' : 'text-accent-600'
        }`}>
          {badge}
        </span>
      )}
      <h2 className={`text-2xl lg:text-3xl font-bold font-heading leading-tight ${
        light ? 'text-white' : 'text-slate-900'
      }`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-sm max-w-2xl leading-relaxed ${centered ? 'mx-auto' : ''} ${
          light ? 'text-white/60' : 'text-slate-500'
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
