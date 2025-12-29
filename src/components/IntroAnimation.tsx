import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogoIcon } from './LogoIcon';

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [phase, setPhase] = useState<'logo' | 'text' | 'exit'>('logo');

  useEffect(() => {
    // Play intro sound
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => {});

    // Phase transitions
    const logoTimer = setTimeout(() => setPhase('text'), 800);
    const exitTimer = setTimeout(() => setPhase('exit'), 2500);
    const completeTimer = setTimeout(() => onComplete(), 3000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary to-background" />
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle at 50% 50%, hsl(40 30% 85% / 0.1) 0%, transparent 50%)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-accent/30"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: 0,
                }}
                animate={{
                  y: [null, -100],
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <div className="relative flex flex-col items-center gap-8">
            {/* 3D Logo Icon */}
            <motion.div
              className="relative"
              initial={{ scale: 0, rotateY: -180 }}
              animate={{ 
                scale: 1, 
                rotateY: 0,
              }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 15,
                duration: 0.8,
              }}
            >
              <motion.div
                animate={{
                  rotateY: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
              >
                <LogoIcon size={140} />
              </motion.div>
              
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 blur-2xl opacity-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-full h-full bg-accent rounded-full" />
              </motion.div>
            </motion.div>

            {/* Text Logo */}
            <AnimatePresence>
              {phase === 'text' && (
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  <motion.h1
                    className="logo-text text-5xl md:text-7xl tracking-[0.5em] text-foreground"
                    initial={{ letterSpacing: '1em', opacity: 0 }}
                    animate={{ letterSpacing: '0.3em', opacity: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  >
                    comfitco
                  </motion.h1>
                  
                  {/* Underline animation */}
                  <motion.div
                    className="absolute -bottom-2 left-0 h-[2px] bg-accent"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  />
                  
                  {/* Glow text */}
                  <motion.div
                    className="absolute inset-0 blur-lg opacity-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <h1 className="logo-text text-5xl md:text-7xl tracking-[0.3em] text-accent">
                      comfitco
                    </h1>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
