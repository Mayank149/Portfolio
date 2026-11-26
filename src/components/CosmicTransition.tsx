import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface CosmicTransitionProps {
  children: ReactNode;
}

const ROUTE_VARIANTS: Record<
  string,
  {
    initial: { opacity: number; x?: number; y?: number; scale?: number };
    animate: { opacity: number; x: number; y: number; scale: number };
    exit: { opacity: number; x?: number; y?: number; scale?: number };
  }
> = {
  '/': {
    initial: { opacity: 0, scale: 0.97, y: 12 },
    animate: { opacity: 1, x: 0, y: 0, scale: 1 },
    exit: { opacity: 0, scale: 1.02, y: -10 },
  },
  '/projects': {
    initial: { opacity: 0, y: 32, scale: 0.985 },
    animate: { opacity: 1, x: 0, y: 0, scale: 1 },
    exit: { opacity: 0, y: -24, scale: 0.99 },
  },
  '/skills': {
    initial: { opacity: 0, x: 42 },
    animate: { opacity: 1, x: 0, y: 0, scale: 1 },
    exit: { opacity: 0, x: -32 },
  },
  '/about': {
    initial: { opacity: 0, x: -42 },
    animate: { opacity: 1, x: 0, y: 0, scale: 1 },
    exit: { opacity: 0, x: 32 },
  },
  '/publications': {
    initial: { opacity: 0, y: -24, scale: 0.98 },
    animate: { opacity: 1, x: 0, y: 0, scale: 1 },
    exit: { opacity: 0, y: 24, scale: 0.98 },
  },
  '/contact': {
    initial: { opacity: 0, scale: 1.03, y: 16 },
    animate: { opacity: 1, x: 0, y: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.97, y: -12 },
  },
};

export function CosmicTransition({ children }: CosmicTransitionProps) {
  const { pathname } = useLocation();
  const variant = ROUTE_VARIANTS[pathname] ?? ROUTE_VARIANTS['/'];

  return (
    <motion.div
      initial={variant.initial}
      animate={variant.animate}
      exit={variant.exit}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="page-shell"
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}
