import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onOrder: (product: Product) => void;
  onWishlist: (product: Product) => void;
  isWishlisted: boolean;
  index: number;
}

export const ProductCard = ({ 
  product, 
  onOrder, 
  onWishlist, 
  isWishlisted,
  index 
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative bg-card rounded-2xl overflow-hidden card-3d"
        whileHover={{ 
          y: -10,
          rotateX: 5,
          rotateY: -5,
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Image container */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            animate={{ 
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Overlay gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Quick actions */}
          <motion.div
            className="absolute top-4 right-4 flex flex-col gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              className={`p-3 rounded-full glass ${
                isWishlisted ? 'text-accent' : 'text-foreground'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onWishlist(product);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </motion.button>
          </motion.div>

          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 glass text-xs font-medium uppercase tracking-wider rounded-full">
              {product.category}
            </span>
          </div>

          {/* Order button overlay */}
          <motion.div
            className="absolute bottom-4 left-4 right-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              className="w-full py-3 bg-foreground text-background font-semibold rounded-xl flex items-center justify-center gap-2"
              onClick={() => onOrder(product)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ShoppingBag className="w-4 h-4" />
              Order Now
            </motion.button>
          </motion.div>
        </div>

        {/* Product info */}
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 truncate">{product.name}</h3>
          <div className="flex items-center justify-between">
            <p className="text-accent font-bold text-xl">
              ₹{product.price.toLocaleString()}
            </p>
            <motion.button
              className="p-2 rounded-lg hover:bg-secondary transition-colors md:hidden"
              onClick={() => onOrder(product)}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingBag className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* 3D shadow effect */}
        <motion.div
          className="absolute -bottom-4 left-4 right-4 h-8 bg-accent/20 blur-xl rounded-full"
          animate={{ 
            opacity: isHovered ? 0.6 : 0.2,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};
