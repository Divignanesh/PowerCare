import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

/**
 * A row of tall photo cards that slides on its own, after lifecare.org.au's
 * "Choose the right service" strip.
 *
 * It moves on one card every five seconds (two in ten) and loops back to the
 * start. It is still a plain scroll container, so people can swipe, drag a
 * trackpad or use the arrows; any of those, a hover or keyboard focus pauses
 * the motion, and it stays still for anyone who asks for reduced motion or
 * while the section is off screen.
 */
const STEP_MS = 5000;
const RESUME_AFTER_MS = 10000;

// One card's width plus the gap after it.
const stepOf = (el) => {
  const card = el.firstElementChild;
  if (!card) return 0;
  const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
  return card.getBoundingClientRect().width + gap;
};

// Slide one card either way, wrapping round at both ends.
const move = (el, dir) => {
  if (!el) return;
  const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
  const atStart = el.scrollLeft <= 4;
  if (dir > 0 && atEnd) el.scrollTo({ left: 0, behavior: 'smooth' });
  else if (dir < 0 && atStart) el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
  else el.scrollBy({ left: dir * stepOf(el), behavior: 'smooth' });
};

const RoleCarousel = ({ title, intro, items }) => {
  const track = useRef(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const holdUntil = useRef(0);

  // Someone took over: leave them to it for a while before moving again.
  const hold = () => { holdUntil.current = Date.now() + RESUME_AFTER_MS; };

  useEffect(() => {
    const el = track.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !visible) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => {
      if (document.hidden || Date.now() < holdUntil.current) return;
      move(track.current, 1);
    }, STEP_MS);
    return () => clearInterval(id);
  }, [paused, visible]);

  const arrow =
    'w-12 h-12 rounded-xl border border-primary-200 bg-white text-primary-700 flex items-center justify-center ' +
    'transition-colors duration-200 hover:bg-primary-700 hover:text-white hover:border-primary-700';

  return (
    <section className="bg-primary-50">
      {/* On laptops the section is exactly one screen under the fixed header
          (within sensible limits); the cards take whatever height is left. */}
      <div className="container-custom flex flex-col py-12 lg:py-14 lg:h-[calc(100dvh-5rem)] lg:min-h-[560px] lg:max-h-[900px]">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="section-title max-w-xl text-balance">{title}</h2>
            {intro && <p className="mt-4 text-lg text-ink-700">{intro}</p>}
          </div>
          <div className="hidden sm:flex gap-3 flex-shrink-0">
            <button type="button" className={arrow} aria-label="Previous" onClick={() => { hold(); move(track.current, -1); }}>
              <ArrowLeft size={20} />
            </button>
            <button type="button" className={arrow} aria-label="Next" onClick={() => { hold(); move(track.current, 1); }}>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <ul
          ref={track}
          aria-label={title}
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onWheel={hold}
          onTouchStart={hold}
          className="no-scrollbar flex-1 min-h-0 flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth"
        >
          {items.map((s) => (
            <li key={s.id} className="snap-start flex-shrink-0 w-[82%] sm:w-[46%] lg:w-[31.5%]">
              <Link
                to="/services"
                className="group relative flex h-full min-h-[380px] lg:min-h-0 rounded-[1.75rem] overflow-hidden bg-ink-200"
              >
                <img
                  src={s.image}
                  alt=""
                  loading="lazy"
                  className={`absolute inset-0 w-full h-full object-cover ${s.imagePos || 'object-top'}
                              transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]`}
                />
                {/* Dulls the photo so the white type reads anywhere on it. */}
                <span
                  className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/35 to-ink-900/15"
                  aria-hidden="true"
                />
                <span className="relative mt-auto p-7">
                  <span className="block font-mono text-xs font-semibold uppercase tracking-widest text-white/80">
                    {s.category}
                  </span>
                  <span className="block mt-2 text-2xl lg:text-3xl font-heading font-bold text-white leading-tight text-balance">
                    {s.title}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-2 text-base font-semibold text-primary-200
                                   transition-colors group-hover:text-white">
                    Know more <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default RoleCarousel;
