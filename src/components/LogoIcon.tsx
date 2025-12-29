import { motion } from 'framer-motion';
import comfitcoLogo from '@/assets/comfitco-logo.png';

interface LogoIconProps {
  size?: number;
  className?: string;
  animate?: boolean;
}

export const LogoIcon = ({ size = 40, className = '', animate = false }: LogoIconProps) => {
  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      whileHover={animate ? { scale: 1.05 } : undefined}
    >
      <img
        src={comfitcoLogo}
        alt="Comfitco Logo"
        className="w-full h-full object-contain"
        style={{ 
          filter: 'brightness(0) invert(1)',
        }}
      />
    </motion.div>
  );
};