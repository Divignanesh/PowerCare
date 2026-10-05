import { MapPin, Clock, CurrencyDollar } from '@phosphor-icons/react';

/** A posting's location, schedule and pay, each with its icon; blanks skipped. */
const JobFacts = ({ job, className = '' }) => (
  <ul className={`flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-600 ${className}`}>
    {[
      [MapPin, job.location],
      [Clock, job.type],
      [CurrencyDollar, job.pay],
    ].filter(([, text]) => text).map(([Icon, text]) => (
      <li key={text} className="flex items-center gap-1.5">
        <Icon size={17} className="text-primary-700 flex-shrink-0" aria-hidden="true" />
        {text}
      </li>
    ))}
  </ul>
);

export default JobFacts;
