import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

/**
 * Counts a figure up once it scrolls into view.
 *
 * The value is parsed out of the display string so surrounding characters —
 * "5,000+", "98%", "2 hrs" — survive untouched. Anything without a number
 * (like "24/7") is rendered as-is.
 */
const CountUp = ({ value, duration = 1400, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();

  const match = /^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/.exec(value);
  const countable = Boolean(match) && !value.includes('/');
  const target = countable ? Number(match[2].replace(/,/g, '')) : 0;
  const grouped = countable && match[2].includes(',');

  const [n, setN] = useState(0);

  useEffect(() => {
    // Reduced motion renders the final figure directly, so no state is set here.
    if (!countable || !inView || reduce) return;

    let raf; const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / duration, 1);
      // Ease-out so the number settles rather than stopping dead.
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, countable, target, duration, reduce]);

  if (!countable) return <span ref={ref} className={className}>{value}</span>;

  const shown = reduce ? target : n;

  return (
    <span ref={ref} className={className}>
      {match[1]}{grouped ? shown.toLocaleString('en-CA') : shown}{match[3]}
    </span>
  );
};

export default CountUp;
