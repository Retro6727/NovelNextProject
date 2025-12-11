'use client';

import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PoliciesModal from '@/components/PoliciesModal';
import { getProducts } from '@/lib/products';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <PoliciesModal />
      <main className="flex-grow">
        {/* Animated Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white py-32 px-6">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
                    🚀 GeM Certified Partner
                  </span>
                  <h1 className="text-6xl lg:text-7xl font-black mb-8 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent leading-tight">
                    Novel Solutions
                  </h1>
                  <p className="text-2xl font-light mb-8 max-w-lg leading-relaxed">
                    Premium B2B Manufacturing & Trading Solutions
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/products"
                      className="group relative bg-white text-blue-600 px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-200 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="relative">Browse Products</span>
                    </Link>
                    <Link
                      href="#about"
                      className="border-2 border-white/50 backdrop-blur-sm px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 hover:border-white transition-all duration-300"
                    >
                      Learn More
                    </Link>
                  </div>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="relative"
              >
                <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-12 flex items-center justify-center h-96 shadow-2xl border border-white/30">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="text-9xl"
                  >
                    📦
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Floating elements */}
          <motion.div
            className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </section>

        {/* Animated Value Proposition */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-5xl font-black text-center mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              Why Novel Solutions?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 text-center mb-20 max-w-2xl mx-auto"
            >
              Trusted partner delivering exceptional value for your business
            </motion.p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: "✅", title: "GeM Supported", desc: "Officially registered for government procurement" },
                { icon: "💰", title: "Fixed Pricing", desc: "Transparent pricing without hidden costs" },
                { icon: "⭐", title: "Premium Quality", desc: "Industry-leading standards guaranteed" }
              ].map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group bg-white/70 backdrop-blur-sm p-10 rounded-3xl shadow-xl hover:shadow-2xl border border-white/50 transition-all duration-300 cursor-pointer"
                >
                  <div className="text-6xl group-hover:scale-110 transition-transform mb-6">{feature.icon}</div>
                  <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-105 transition-all">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Slider Section */}
        <section className="py-24 px-6 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Featured Products
              </h2>
              <p className="text-xl text-gray-600">Discover our premium manufacturing collection</p>
            </motion.div>
            <ProductSlider />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.3 }}
              className="text-center mt-16"
            >
              <Link
                href="/products"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-5 rounded-3xl font-bold text-m shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300 group"
              >
                View All Products
                <motion.span
                  className="group-hover:translate-x-2 transition-transform"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative py-24 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-700/90" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative max-w-4xl mx-auto text-center text-white"
          >
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-7xl mb-8"
            >
              🤝
            </motion.div>
            <h2 className="text-5xl font-black mb-8 drop-shadow-lg">
              Ready to Partner With Us?
            </h2>
            <p className="text-2xl mb-12 opacity-90 drop-shadow-lg max-w-2xl mx-auto">
              Contact our B2B team for bulk orders and custom requirements
            </p>
            <Link
              href="#contact"
              className="inline-block bg-white text-blue-600 px-12 py-6 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300 backdrop-blur-sm"
            >
              Get In Touch Now
            </Link>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

// Enhanced Product Slider with Proper Image Handling
function ProductSlider() {
  const [featured, setFeatured] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const items = [...getProducts()];
    const shuffled = pickFeatured(items);
    setFeatured(shuffled);
  }, []);

  useEffect(() => {
    if (isHovering) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.max(1, featured.length));
    }, 4000);
    return () => clearInterval(interval);
  }, [featured.length, isHovering]);

  const visibleProducts = featured.slice(currentIndex, currentIndex + 4);

  const getProductImage = (product) => {
    if (!product?.image) return null;
    
    // Handle different image formats from your original logic
    if (typeof product.image === 'string') {
      if (product.image.startsWith('data:') || product.image.startsWith('http')) {
        return product.image;
      }
      // If it's an emoji or icon string, return null for proper image display
      return null;
    }
    
    if (product.image?.url) {
      return product.image.url;
    }
    
    return null;
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Slider Track */}
      <div className="flex gap-6 overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl shadow-2xl p-8 border border-white/50">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex gap-6 min-w-full"
          >
            {visibleProducts.map((product, idx) => {
              const imageSrc = getProductImage(product);
              
              return (
                <motion.div
                  key={`${currentIndex}-${product.id}`}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="flex-1 bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-xl hover:shadow-2xl border border-blue-100/50 transition-all duration-300 overflow-hidden group relative"
                >
                  {/* Product Image Container */}
                  <div className="relative h-48 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center mb-6 overflow-hidden group">
                    {imageSrc ? (
                      // Real product image
                      <img 
                        src={imageSrc} 
                        alt={product.name}
                        className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-500 shadow-lg"
                        onError={(e) => {
                          // Fallback to emoji if image fails to load
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                    ) : (
                      // Emoji/icon fallback
                      <motion.div
                        className="text-5xl z-10 relative flex items-center justify-center w-full h-full"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        {product.image || "📦"}
                      </motion.div>
                    )}
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Image shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-shimmer" />
                  </div>

                  {/* Product Info */}
                  <h3 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-black text-blue-600 drop-shadow-lg">
                      ₹{product.price}
                    </span>
                    <Link
                      href={`/products/${product.id}`}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 whitespace-nowrap"
                    >
                      View Details
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Custom CSS for shimmer effect */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>

      {/* Slider Indicators */}
      {featured.length > 4 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(featured.length / 4) }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx * 4)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                Math.floor(currentIndex / 4) === idx 
                  ? 'bg-blue-600 scale-125 shadow-lg' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function pickFeatured(items) {
  const arr = Array.isArray(items) ? [...items] : [];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, Math.min(12, arr.length));
}
