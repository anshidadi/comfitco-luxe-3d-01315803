import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IntroAnimation } from '../components/IntroAnimation';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { ProductCard } from '../components/ProductCard';
import { CategoryFilter } from '../components/CategoryFilter';
import { OrderModal, OrderFormData } from '../components/OrderModal';
import { OrderSuccessModal } from '../components/OrderSuccessModal';
import { AdminLogin } from '../components/AdminLogin';
import { AdminPanel } from '../components/AdminPanel';
import { Footer } from '../components/Footer';
import { Product, Category } from '../types';
import { useProducts } from '../hooks/useProducts';
import { useOrders } from '../hooks/useOrders';
import { supabase } from '@/integrations/supabase/client';

// Initial products to seed if database is empty
const initialProducts: Omit<Product, 'id'>[] = [
  { name: 'Elegant Maxi Dress', price: 2499, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop', category: 'party-wear' },
  { name: 'Casual Summer Dress', price: 1299, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=800&fit=crop', category: 'casual' },
  { name: 'Traditional Anarkali', price: 3499, image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=800&fit=crop', category: 'ethnic' },
  { name: 'Trendy Wrap Dress', price: 1899, image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop', category: 'trendy' },
  { name: 'Floral Print Dress', price: 1599, image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop', category: 'casual' },
  { name: 'Sequin Party Dress', price: 4299, image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=800&fit=crop', category: 'party-wear' },
  { name: 'Bohemian Maxi', price: 2199, image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop', category: 'trendy' },
  { name: 'Classic Silk Saree', price: 5999, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop', category: 'ethnic' },
];

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const { products, loading: productsLoading, addProduct, deleteProduct } = useProducts();
  const { orders, createOrder } = useOrders();
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Seed initial products if database is empty
  useEffect(() => {
    const seedProducts = async () => {
      if (!productsLoading && products.length === 0) {
        const { count } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true });

        if (count === 0) {
          for (const product of initialProducts) {
            await addProduct(product);
          }
        }
      }
    };
    seedProducts();
  }, [productsLoading, products.length]);

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const handleOrder = (product: Product) => {
    setSelectedProduct(product);
    setShowOrderModal(true);
  };

  const handleOrderSubmit = async (formData: OrderFormData) => {
    if (!selectedProduct) return;
    
    const success = await createOrder({
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      productPrice: selectedProduct.price,
      ...formData,
    });

    if (success) {
      setShowOrderModal(false);
      setShowSuccessModal(true);
    }
  };

  const handleWishlist = useCallback((product: Product) => {
    setWishlist(prev => 
      prev.includes(product.id) 
        ? prev.filter(id => id !== product.id)
        : [...prev, product.id]
    );
  }, []);

  const handleAddProduct = async (product: Omit<Product, 'id'>) => {
    await addProduct(product);
  };

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id);
  };

  const scrollToCollection = () => {
    const element = document.getElementById('collection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}
      
      <Navbar
        cartCount={0}
        wishlistCount={wishlist.length}
        onCartClick={() => {}}
        onWishlistClick={() => {}}
        onFilterClick={scrollToCollection}
        onAdminClick={() => setShowAdminLogin(true)}
      />

      <main>
        <HeroSection onShopClick={scrollToCollection} />

        {/* Products Section */}
        <section id="collection" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.span 
                className="inline-block px-4 py-2 glass rounded-full text-sm font-medium text-accent mb-4"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Premium Collection
              </motion.span>
              <h2 className="text-4xl md:text-6xl font-display tracking-wider mb-4">
                OUR COLLECTION
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-lg">
                Handpicked styles curated for the modern woman. Each piece designed for comfort and elegance.
              </p>
            </motion.div>

            <div className="mb-12">
              <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
            </div>

            {productsLoading ? (
              <div className="flex justify-center py-20">
                <motion.div
                  className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              </div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
                layout
              >
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onOrder={handleOrder}
                    onWishlist={handleWishlist}
                    isWishlisted={wishlist.includes(product.id)}
                    index={index}
                  />
                ))}
              </motion.div>
            )}

            {!productsLoading && filteredProducts.length === 0 && (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-muted-foreground text-lg">No products found in this category.</p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {[
                { title: 'Premium Quality', description: 'Handcrafted with the finest materials for lasting elegance' },
                { title: 'Fast Delivery', description: 'Quick and secure shipping across India' },
                { title: 'Easy Returns', description: '7-day hassle-free return policy' },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="text-center p-8 glass rounded-2xl card-3d"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Modals */}
      <OrderModal
        product={selectedProduct}
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        onSubmit={handleOrderSubmit}
      />

      <OrderSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />

      <AdminLogin
        isOpen={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
        onSuccess={() => {
          setShowAdminLogin(false);
          setShowAdminPanel(true);
        }}
      />

      <AdminPanel
        isOpen={showAdminPanel}
        onClose={() => setShowAdminPanel(false)}
        products={products}
        orders={orders}
        onAddProduct={handleAddProduct}
        onDeleteProduct={handleDeleteProduct}
      />
    </div>
  );
};

export default Index;
