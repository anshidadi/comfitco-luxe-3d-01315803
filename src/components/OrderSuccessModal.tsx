import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderSuccessModal = ({ isOpen, onClose }: OrderSuccessModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/90 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Content */}
          <motion.div
            className="relative text-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, y: -50 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          >
            {/* Success icon with 3D effect */}
            <motion.div
              className="relative mb-8"
              initial={{ rotateY: -180, scale: 0 }}
              animate={{ rotateY: 0, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', damping: 15 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div
                className="w-32 h-32 mx-auto rounded-full bg-accent/20 flex items-center justify-center"
                animate={{
                  boxShadow: [
                    '0 0 30px hsl(40 30% 85% / 0.3)',
                    '0 0 60px hsl(40 30% 85% / 0.5)',
                    '0 0 30px hsl(40 30% 85% / 0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <CheckCircle className="w-16 h-16 text-accent" />
              </motion.div>

              {/* Particles */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-accent"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  initial={{ x: '-50%', y: '-50%', scale: 0 }}
                  animate={{
                    x: `calc(-50% + ${Math.cos((i * 30 * Math.PI) / 180) * 100}px)`,
                    y: `calc(-50% + ${Math.sin((i * 30 * Math.PI) / 180) * 100}px)`,
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    delay: 0.3 + i * 0.05,
                    duration: 1,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-3xl font-display tracking-wider mb-4">
                ORDER PLACED!
              </h2>
              <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                Thank you for your order! We'll contact you shortly to confirm your purchase.
              </p>

              <motion.button
                className="px-8 py-3 bg-foreground text-background font-semibold rounded-xl"
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Continue Shopping
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
