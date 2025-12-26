import { motion } from 'framer-motion';

interface LogoIconProps {
  size?: number;
  className?: string;
  animate?: boolean;
}

export const LogoIcon = ({ size = 40, className = '', animate = false }: LogoIconProps) => {
  const strokeWidth = size / 25;
  
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      style={{ transformStyle: 'preserve-3d' }}
      whileHover={animate ? { scale: 1.1, rotateY: 15 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Outer diamond shape */}
      <motion.path
        d="M50 2 L98 50 L50 98 L2 50 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
        initial={animate ? { pathLength: 0 } : { pathLength: 1 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />
      
      {/* Inner geometric arrow - recreating the exact logo shape */}
      <motion.g
        initial={animate ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {/* Main arrow shape pointing down-left */}
        {/* Upper left diagonal */}
        <path
          d="M28 30 L50 52 L50 30 L28 30"
          fill="currentColor"
        />
        {/* Upper right diagonal */}
        <path
          d="M50 30 L72 30 L50 52 L50 30"
          fill="currentColor"
        />
        {/* Lower left part */}
        <path
          d="M28 52 L50 74 L50 52 L28 52"
          fill="currentColor"
        />
        {/* Lower section connecting */}
        <path
          d="M28 30 L28 52 L50 52 L28 30"
          fill="currentColor"
        />
        {/* Right side triangle */}
        <path
          d="M50 52 L72 30 L72 52 L50 52"
          fill="currentColor"
        />
      </motion.g>
    </motion.svg>
  );
};