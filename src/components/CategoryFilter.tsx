import { motion } from 'framer-motion';
import { Category } from '../types';

interface CategoryFilterProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const categories: { id: Category; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'casual', label: 'Casual' },
  { id: 'party-wear', label: 'Party Wear' },
  { id: 'ethnic', label: 'Ethnic' },
  { id: 'trendy', label: 'Trendy' },
];

export const CategoryFilter = ({ activeCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <motion.div
      className="flex flex-wrap justify-center gap-2 md:gap-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {categories.map((category, index) => (
        <motion.button
          key={category.id}
          className={`relative px-6 py-3 rounded-full font-medium transition-colors ${
            activeCategory === category.id
              ? 'text-background'
              : 'text-foreground hover:text-accent glass'
          }`}
          onClick={() => onCategoryChange(category.id)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {activeCategory === category.id && (
            <motion.div
              className="absolute inset-0 bg-foreground rounded-full"
              layoutId="activeCategoryBg"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10">{category.label}</span>
        </motion.button>
      ))}
    </motion.div>
  );
};
