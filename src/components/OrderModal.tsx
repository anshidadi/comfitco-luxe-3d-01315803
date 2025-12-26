import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus } from 'lucide-react';
import { Product } from '../types';

interface OrderModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (orderData: OrderFormData) => void;
}

export interface OrderFormData {
  customerName: string;
  mobileNumber: string;
  address: string;
  size: string;
  quantity: number;
  message?: string;
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const OrderModal = ({ product, isOpen, onClose, onSubmit }: OrderModalProps) => {
  const [formData, setFormData] = useState<OrderFormData>({
    customerName: '',
    mobileNumber: '',
    address: '',
    size: 'M',
    quantity: 1,
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Play success sound
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2190/2190-preview.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => {});

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    onSubmit(formData);
    setIsSubmitting(false);
    setFormData({
      customerName: '',
      mobileNumber: '',
      address: '',
      size: 'M',
      quantity: 1,
      message: '',
    });
  };

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-card rounded-3xl border border-border shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 50, rotateX: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50, rotateX: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-card/90 backdrop-blur-sm p-6 border-b border-border flex items-center justify-between z-10">
              <h2 className="text-xl font-semibold">Place Order</h2>
              <motion.button
                className="p-2 rounded-full hover:bg-secondary transition-colors"
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Product preview */}
            <div className="p-6 border-b border-border">
              <div className="flex gap-4">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-32 object-cover rounded-xl"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-muted-foreground capitalize">{product.category}</p>
                  <p className="text-accent font-bold text-xl mt-2">
                    ₹{product.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Full Name */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label className="block text-sm font-medium mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full px-4 py-3 bg-secondary rounded-xl border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                  placeholder="Enter your full name"
                />
              </motion.div>

              {/* Mobile Number */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <label className="block text-sm font-medium mb-2">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.mobileNumber}
                  onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                  className="w-full px-4 py-3 bg-secondary rounded-xl border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                  placeholder="+91 XXXXX XXXXX"
                />
              </motion.div>

              {/* Address */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-sm font-medium mb-2">Full Address *</label>
                <textarea
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-secondary rounded-xl border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors resize-none"
                  placeholder="House no., Street, City, State, PIN Code"
                />
              </motion.div>

              {/* Size selection */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <label className="block text-sm font-medium mb-2">Select Size *</label>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <motion.button
                      key={size}
                      type="button"
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        formData.size === size
                          ? 'bg-foreground text-background'
                          : 'bg-secondary hover:bg-muted'
                      }`}
                      onClick={() => setFormData({ ...formData, size })}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Quantity */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-medium mb-2">Quantity</label>
                <div className="flex items-center gap-4">
                  <motion.button
                    type="button"
                    className="p-2 rounded-lg bg-secondary hover:bg-muted transition-colors"
                    onClick={() => setFormData({ 
                      ...formData, 
                      quantity: Math.max(1, formData.quantity - 1) 
                    })}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Minus className="w-4 h-4" />
                  </motion.button>
                  <span className="text-xl font-semibold w-12 text-center">
                    {formData.quantity}
                  </span>
                  <motion.button
                    type="button"
                    className="p-2 rounded-lg bg-secondary hover:bg-muted transition-colors"
                    onClick={() => setFormData({ 
                      ...formData, 
                      quantity: formData.quantity + 1 
                    })}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>

              {/* Optional message */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <label className="block text-sm font-medium mb-2">
                  Message <span className="text-muted-foreground">(Optional)</span>
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-3 bg-secondary rounded-xl border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors resize-none"
                  placeholder="Any special instructions..."
                />
              </motion.div>

              {/* Total */}
              <motion.div
                className="flex items-center justify-between py-4 border-t border-border"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <span className="text-muted-foreground">Total Amount</span>
                <span className="text-2xl font-bold text-accent">
                  ₹{(product.price * formData.quantity).toLocaleString()}
                </span>
              </motion.div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-foreground text-background font-semibold rounded-xl relative overflow-hidden disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <motion.div
                    className="flex items-center justify-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    Processing...
                  </motion.div>
                ) : (
                  'Place Order'
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
