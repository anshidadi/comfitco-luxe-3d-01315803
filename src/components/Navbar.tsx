import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, SlidersHorizontal, Shield } from 'lucide-react';
import { LogoIcon } from './LogoIcon';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onCartClick: () => void;
  onWishlistClick: () => void;
  onFilterClick: () => void;
  onAdminClick: () => void;
}

export const Navbar = ({ 
  cartCount, 
  wishlistCount, 
  onCartClick, 
  onWishlistClick, 
  onFilterClick,
  onAdminClick 
}: NavbarProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-4 py-3 md:px-8 md:py-4"
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="glass-strong rounded-2xl px-4 py-3 md:px-8 md:py-4 flex items-center justify-between"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {/* Left icons */}
            <div className="flex items-center gap-2 md:gap-4">
              <NavIcon icon={SlidersHorizontal} onClick={onFilterClick} label="Filter" />
              <NavIcon 
                icon={Heart} 
                onClick={onWishlistClick} 
                label="Wishlist"
                badge={wishlistCount}
              />
            </div>

            {/* Center Logo */}
            <motion.div
              className="flex items-center gap-2 md:gap-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <LogoIcon size={32} className="text-foreground" />
              </motion.div>
              <h1 className="logo-text text-xl md:text-2xl tracking-[0.2em] text-foreground">
                comfitco
              </h1>
            </motion.div>

            {/* Right icons */}
            <div className="flex items-center gap-2 md:gap-4">
              <NavIcon 
                icon={ShoppingBag} 
                onClick={onCartClick} 
                label="Cart"
                badge={cartCount}
              />
              <NavIcon 
                icon={Shield} 
                onClick={onAdminClick} 
                label="Admin"
                subtle
              />
            </div>
          </motion.div>
        </div>
      </motion.nav>
    </AnimatePresence>
  );
};

interface NavIconProps {
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
  label: string;
  badge?: number;
  subtle?: boolean;
}

const NavIcon = ({ icon: Icon, onClick, label, badge, subtle }: NavIconProps) => (
  <motion.button
    className={`relative p-2 rounded-xl transition-colors ${
      subtle 
        ? 'text-muted-foreground/50 hover:text-muted-foreground' 
        : 'text-foreground hover:text-accent'
    }`}
    onClick={onClick}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    aria-label={label}
  >
    <Icon className="w-5 h-5 md:w-6 md:h-6" />
    {badge !== undefined && badge > 0 && (
      <motion.span
        className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 20 }}
      >
        {badge}
      </motion.span>
    )}
  </motion.button>
);
