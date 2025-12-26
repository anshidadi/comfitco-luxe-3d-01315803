import { motion } from 'framer-motion';

interface LogoIconProps {
  size?: number;
  className?: string;
  animate?: boolean;
}

export const LogoIcon = ({ size = 40, className = '', animate = false }: LogoIconProps) => {
  const strokeWidth = size / 20;
  
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
        d="M50 5 L95 50 L50 95 L5 50 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
        initial={animate ? { pathLength: 0 } : { pathLength: 1 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />
      
      {/* Inner geometric arrow/chevron - matching the logo */}
      <motion.g
        initial={animate ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {/* Left arrow part */}
        <path
          d="M30 35 L50 55 L50 75 L30 55 Z"
          fill="currentColor"
        />
        {/* Right arrow part */}
        <path
          d="M70 35 L50 55 L50 75 L70 55 Z"
          fill="currentColor"
        />
        {/* Top connector */}
        <path
          d="M30 35 L50 15 L70 35 L50 55 Z"
          fill="currentColor"
        />
      </motion.g>
    </motion.svg>
  );
};
