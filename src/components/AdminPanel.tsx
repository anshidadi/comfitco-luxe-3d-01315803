import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Package, ShoppingBag, Upload, Trash2 } from 'lucide-react';
import { Product, Order } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  orders: Order[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onDeleteProduct: (id: string) => void;
}

export const AdminPanel = ({
  isOpen,
  onClose,
  products,
  orders,
  onAddProduct,
  onDeleteProduct,
}: AdminPanelProps) => {
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('orders');
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'casual' as Product['category'],
    image: '',
  });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) return;

    onAddProduct({
      name: newProduct.name,
      price: Number(newProduct.price),
      category: newProduct.category,
      image: newProduct.image,
    });

    setNewProduct({ name: '', price: '', category: 'casual', image: '' });
    setIsAddingProduct(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[80] flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/90 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="relative ml-auto w-full max-w-4xl h-full bg-card border-l border-border overflow-hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-card/90 backdrop-blur-sm border-b border-border p-6 z-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-display tracking-wider">ADMIN PANEL</h2>
                <motion.button
                  className="p-2 rounded-full hover:bg-secondary transition-colors"
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Tabs */}
              <div className="flex gap-2">
                <motion.button
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'orders' 
                      ? 'bg-foreground text-background' 
                      : 'bg-secondary hover:bg-muted'
                  }`}
                  onClick={() => setActiveTab('orders')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingBag className="w-4 h-4" />
                  Orders ({orders.length})
                </motion.button>
                <motion.button
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'products' 
                      ? 'bg-foreground text-background' 
                      : 'bg-secondary hover:bg-muted'
                  }`}
                  onClick={() => setActiveTab('products')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Package className="w-4 h-4" />
                  Products ({products.length})
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto h-[calc(100vh-140px)]">
              <AnimatePresence mode="wait">
                {activeTab === 'orders' && (
                  <motion.div
                    key="orders"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    {orders.length === 0 ? (
                      <div className="text-center py-20 text-muted-foreground">
                        <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>No orders yet</p>
                      </div>
                    ) : (
                      orders.map((order, index) => (
                        <motion.div
                          key={order.id}
                          className="p-4 bg-secondary rounded-2xl card-3d"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ y: -5 }}
                        >
                          <div className="flex gap-4">
                            <img
                              src={order.productImage}
                              alt={order.productName}
                              className="w-20 h-24 object-cover rounded-xl"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="font-semibold truncate">
                                    {order.productName}
                                  </h3>
                                  <p className="text-accent font-bold">
                                    ₹{order.productPrice.toLocaleString()} × {order.quantity}
                                  </p>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(order.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Customer:</span>
                                  <p className="font-medium">{order.customerName}</p>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Mobile:</span>
                                  <p className="font-medium">{order.mobileNumber}</p>
                                </div>
                                <div className="col-span-2">
                                  <span className="text-muted-foreground">Address:</span>
                                  <p className="font-medium">{order.address}</p>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Size:</span>
                                  <p className="font-medium">{order.size}</p>
                                </div>
                                {order.message && (
                                  <div className="col-span-2">
                                    <span className="text-muted-foreground">Message:</span>
                                    <p className="font-medium">{order.message}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </motion.div>
                )}

                {activeTab === 'products' && (
                  <motion.div
                    key="products"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    {/* Add product button */}
                    {!isAddingProduct && (
                      <motion.button
                        className="w-full p-4 border-2 border-dashed border-border rounded-2xl flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                        onClick={() => setIsAddingProduct(true)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <Plus className="w-5 h-5" />
                        Add New Product
                      </motion.button>
                    )}

                    {/* Add product form */}
                    <AnimatePresence>
                      {isAddingProduct && (
                        <motion.div
                          className="p-6 bg-secondary rounded-2xl space-y-4"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <h3 className="font-semibold text-lg">Add New Product</h3>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                              <label className="block text-sm font-medium mb-2">
                                Product Name
                              </label>
                              <input
                                type="text"
                                value={newProduct.name}
                                onChange={(e) =>
                                  setNewProduct({ ...newProduct, name: e.target.value })
                                }
                                className="w-full px-4 py-3 bg-card rounded-xl border border-border focus:border-accent outline-none"
                                placeholder="Enter product name"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-2">Price (₹)</label>
                              <input
                                type="number"
                                value={newProduct.price}
                                onChange={(e) =>
                                  setNewProduct({ ...newProduct, price: e.target.value })
                                }
                                className="w-full px-4 py-3 bg-card rounded-xl border border-border focus:border-accent outline-none"
                                placeholder="0"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-2">Category</label>
                              <select
                                value={newProduct.category}
                                onChange={(e) =>
                                  setNewProduct({
                                    ...newProduct,
                                    category: e.target.value as Product['category'],
                                  })
                                }
                                className="w-full px-4 py-3 bg-card rounded-xl border border-border focus:border-accent outline-none"
                              >
                                <option value="casual">Casual</option>
                                <option value="party-wear">Party Wear</option>
                                <option value="ethnic">Ethnic</option>
                                <option value="trendy">Trendy</option>
                              </select>
                            </div>

                            <div className="col-span-2">
                              <label className="block text-sm font-medium mb-2">Image URL</label>
                              <input
                                type="url"
                                value={newProduct.image}
                                onChange={(e) =>
                                  setNewProduct({ ...newProduct, image: e.target.value })
                                }
                                className="w-full px-4 py-3 bg-card rounded-xl border border-border focus:border-accent outline-none"
                                placeholder="https://example.com/image.jpg"
                              />
                            </div>
                          </div>

                          <div className="flex gap-2 pt-4">
                            <motion.button
                              className="flex-1 py-3 bg-foreground text-background font-semibold rounded-xl"
                              onClick={handleAddProduct}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Upload className="w-4 h-4 inline mr-2" />
                              Add Product
                            </motion.button>
                            <motion.button
                              className="px-6 py-3 bg-card rounded-xl"
                              onClick={() => setIsAddingProduct(false)}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              Cancel
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Products list */}
                    <div className="grid gap-4">
                      {products.map((product, index) => (
                        <motion.div
                          key={product.id}
                          className="p-4 bg-secondary rounded-2xl flex gap-4 items-center"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ y: -2 }}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-20 object-cover rounded-xl"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold">{product.name}</h3>
                            <p className="text-accent font-bold">
                              ₹{product.price.toLocaleString()}
                            </p>
                            <span className="text-xs text-muted-foreground capitalize">
                              {product.category}
                            </span>
                          </div>
                          <motion.button
                            className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                            onClick={() => onDeleteProduct(product.id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Trash2 className="w-5 h-5" />
                          </motion.button>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
