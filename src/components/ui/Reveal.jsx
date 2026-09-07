import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

/**
 * Scroll-triggered reveal.
 *
 * One gesture used everywhere: content rises a short distance as it enters
 * the viewport, once. Reduced-motion visitors get the fade alone, and nothing
 * is ever left invisible if the observer never fires.
 */
export const Reveal = ({ children, delay = 0, y = 18, as = 'div', className = '', ...rest }) => {
  const reduce = useReducedMotion();
  const Tag = motion[as] ?? motion.div;

  return (
    <Tag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.6, ease: EASE, delay: reduce ? 0 : delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

/**
 * Reveals its children in sequence rather than as one block — for card grids
 * and ruled lists, where the eye should travel across the row.
 */
export const RevealGroup = ({ children, className = '', stagger = 0.07, as = 'div', ...rest }) => {
  const reduce = useReducedMotion();
  const Tag = motion[as] ?? motion.div;

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -60px 0px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : stagger } } }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

/** A single item inside a RevealGroup. */
export const RevealItem = ({ children, className = '', y = 18, as = 'div', ...rest }) => {
  const reduce = useReducedMotion();
  const Tag = motion[as] ?? motion.div;

  return (
    <Tag
      className={className}
      variants={{
        hidden: reduce ? { opacity: 0 } : { opacity: 0, y },
        show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
