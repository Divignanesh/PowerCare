import { Link } from 'react-router-dom';
import Reveal from './Reveal';

/**
 * Closing call to action.
 *
 * A photograph under a white wash, one heading, one line, one button and a
 * row of short reassurances — the last thing on a page before the footer.
 */
const CtaBand = ({ image, imagePos = 'object-center', title, text, cta, to = '/contact', points = [] }) => (
  <section className="relative overflow-hidden">
    <img
      src={image}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className={`absolute inset-0 w-full h-full object-cover ${imagePos}`}
    />
    <div className="absolute inset-0 bg-white/75" aria-hidden="true" />

    <Reveal className="relative container-custom py-16 lg:py-20 text-center">
      <h2 className="text-display-sm font-heading font-semibold text-ink-900 max-w-3xl mx-auto text-balance">
        {title}
      </h2>
      <p className="mt-4 text-base text-ink-800 max-w-2xl mx-auto text-pretty">{text}</p>
      <Link to={to} className="btn-primary mt-8">{cta}</Link>

      {points.length > 0 && (
        <ul className="mt-8 flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
          {points.map((p, i) => (
            <li key={p} className="flex items-center gap-4 font-heading font-semibold text-ink-900 text-lg">
              {i > 0 && <span className="w-1.5 h-1.5 rounded-full bg-primary-500" aria-hidden="true" />}
              {p}
            </li>
          ))}
        </ul>
      )}
    </Reveal>
  </section>
);

export default CtaBand;
