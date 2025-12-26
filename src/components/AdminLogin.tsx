import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, X } from 'lucide-react';

interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ADMIN_CODE = '101010';

export const AdminLogin = ({ isOpen, onClose, onSuccess }: AdminLoginProps) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (code === ADMIN_CODE) {
      onSuccess();
      setCode('');
      setError(false);
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

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

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-sm bg-card rounded-3xl border border-border p-8"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              x: shake ? [0, -10, 10, -10, 10, 0] : 0
            }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ 
              type: 'spring', 
              damping: 25, 
              stiffness: 200,
              x: { duration: 0.4 }
            }}
          >
            {/* Close button */}
            <motion.button
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Icon */}
            <motion.div
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 360] }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <Lock className="w-10 h-10 text-accent" />
            </motion.div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-center mb-2">Admin Access</h2>
            <p className="text-muted-foreground text-center text-sm mb-6">
              Enter the admin lock code to continue
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setError(false);
                  }}
                  className={`w-full px-4 py-4 bg-secondary rounded-xl text-center text-2xl tracking-[0.5em] font-mono border-2 transition-colors outline-none ${
                    error ? 'border-destructive' : 'border-transparent focus:border-accent'
                  }`}
                  placeholder="••••••"
                  maxLength={6}
                  autoFocus
                />
                {error && (
                  <motion.p
                    className="text-destructive text-sm text-center mt-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Invalid code. Please try again.
                  </motion.p>
                )}
              </div>

              <motion.button
                type="submit"
                className="w-full py-4 bg-foreground text-background font-semibold rounded-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Unlock
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
