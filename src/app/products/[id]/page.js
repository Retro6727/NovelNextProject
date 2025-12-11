'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';  // Import useRouter
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getProducts } from '@/lib/products';
import { addToCart } from '@/lib/cart';

export default function ProductDetail() {
  const params = useParams();
  const productId = parseInt(params.id);
  const router = useRouter();  // Initialize useRouter

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState('');
  const [activeTab, setActiveTab] = useState('details');
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const items = getProducts();
    const found = items?.find(p => Number(p.id) === Number(productId));
    if (found) {
      setProduct(found);
      setMainImage(found.image);
      const related = items.filter(p => p.category === found.category && p.id !== found.id).slice(0, 4);
      setRelatedProducts(related);
    } else if (items?.length > 0) {
      setProduct(items[0]);
      setRelatedProducts([]);
    }
  }, [productId]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <main className="flex-grow flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🔍</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h2>
            <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
            <Link href="/products" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl">
              ← Back to Products
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const renderImage = (image) => {
    if (!image) return <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center"><span className="text-4xl">📦</span></div>;
    
    if (typeof image === 'string') {
      return (image.startsWith('data:') || image.startsWith('http')) ? 
        <img src={image} alt={product.name} className="w-full h-full object-contain rounded-xl" /> :
        <div className="w-full h-full flex items-center justify-center text-6xl rounded-xl bg-gradient-to-br from-blue-50 to-blue-100">{image}</div>;
    }
    return image?.url ? <img src={image.url} alt={product.name} className="w-full h-full object-contain rounded-xl" /> : 
      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center"><span className="text-4xl">📦</span></div>;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <main className="flex-grow pt-4">
        {/* Enhanced Breadcrumb */}
        <nav className="px-6 pb-8 max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">🏠 Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-blue-600 transition-colors">Products</Link>
            <span>/</span>
            <span className="font-medium text-gray-900 truncate max-w-[200px]">{product.name}</span>
          </div>
        </nav>

        {/* Main Product Section - 5 Column Grid */}
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 xl:gap-12">
            
            {/* Image Gallery - 2 Columns */}
            <div className="xl:col-span-2 space-y-4">
              {/* Main Image */}
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 aspect-[4/5]">
                {renderImage(mainImage)}
              </div>
              
              {/* Thumbnail Gallery (if multiple images available) */}
              {product.images?.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.slice(0, 4).map((img, idx) => (
                    <div 
                      key={idx}
                      className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer border-4 transition-all duration-200 hover:scale-105 ${
                        mainImage === img ? 'border-blue-500 shadow-md' : 'border-transparent hover:border-blue-300'
                      }`}
                      onClick={() => setMainImage(img)}
                    >
                      {renderImage(img)}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details - 2 Columns */}
            <div className="xl:col-span-2 space-y-6">
              <div>
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                  {product.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                  {product.name}
                </h1>
                
                {/* Rating */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-1">
                    <span className="text-2xl">⭐</span>
                    <span className="text-2xl font-bold text-yellow-500">{product.rating ?? '-'}</span>
                    <span className="text-sm text-gray-500">({product.reviews ?? 0} reviews)</span>
                  </div>
                </div>

                {/* Description Preview */}
                <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-2xl">
                  {product.description?.substring(0, 200)}...
                </p>
                {product.code && (
                  <div className="text-m">
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded-md">Code: {product.code}</span>
                  </div>
                )}
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 pb-6">
                <div className="flex gap-6 border-b">
                  {['details', 'specifications', 'reviews'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-4 px-1 font-semibold text-sm uppercase tracking-wide transition-all duration-200 ${
                        activeTab === tab
                          ? 'border-b-2 border-blue-600 text-blue-600 shadow-md'
                          : 'text-gray-500 hover:text-gray-900 hover:border-gray-300 border-b-2 border-transparent'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="pt-4">
                {activeTab === 'details' && (
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900">Product Description</h3>
                    <p className="text-gray-700 leading-relaxed">{product.description}</p>
                    {product.features?.length > 0 && (
                      <>
                        <h4 className="text-xl font-bold text-gray-900 mt-8 mb-4">Key Features</h4>
                        <ul className="space-y-3">
                          {product.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3 p-3 bg-white/50 rounded-xl backdrop-blur-sm hover:bg-white transition-all">
                              <span className="text-blue-600 font-bold text-xl mt-0.5 flex-shrink-0">✓</span>
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                )}
                {/* Add other tab contents similarly */}
              </div>
            </div>

            {/* Sticky Action Panel - 1 Column */}
            <div className="xl:col-span-1 sticky top-24 xl:top-32 self-start">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-300">
                <div className="space-y-6">
                  {/* Price */}
                  <div>
                    <span className="text-sm text-gray-500 tracking-wide uppercase font-medium">Price</span>
                    <div className="text-4xl xl:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mt-2">
                      ₹{product.price}
                    </div>
                    {product.bulkDiscount && (
                      <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mt-2">
                        {product.bulkDiscount}
                      </span>
                    )}
                  </div>

                  {/* Stock */}
                  <div className={`p-3 rounded-xl ${product.stock > 0 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                    <span className={`font-semibold text-sm uppercase tracking-wide ${
                      product.stock > 0 ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {product.stock > 0 ? `✓ In Stock (${product.stock})` : '✗ Out of Stock'}
                    </span>
                  </div>

                  {/* SKU - Updated to use product.code instead of product.nco */}
                  {product.code && (
                    <div className="text-xs text-gray-500">
                      <span className="font-mono bg-gray-100 px-2 py-1 rounded-md">Code: {product.code}</span>
                    </div>
                  )}

                  {/* Quantity */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Quantity</label>
                    <div className="flex items-center gap-3">
                      <div className="flex bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-4 py-3 hover:bg-gray-50 font-bold text-xl transition-colors"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-20 py-3 text-center text-lg font-semibold border-0 focus:outline-none"
                          min="1"
                        />
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="px-4 py-3 hover:bg-gray-50 font-bold text-xl transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm text-gray-500">Min: 1</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        addToCart(product, quantity);
                        setAddedMessage(`Added ${quantity} × ${product.name} to cart!`);
                        setTimeout(() => setAddedMessage(''), 3000);
                        router.push('/cart');
                      }}
                      disabled={product.stock === 0}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                    >
                      {product.stock > 0 ? '🛒 Add to Cart' : 'Out of Stock'}
                    </button>

                    {addedMessage && (
                      <div className="p-4 bg-green-100 border border-green-200 text-green-800 rounded-xl backdrop-blur-sm animate-pulse">
                        {addedMessage}
                      </div>
                    )}
                  </div>

                  {/* WhatsApp - Updated to use product.code instead of product.nco */}
                  <a
                    href={`https://wa.me/918779502710?text=${encodeURIComponent(`Hello! I'm interested in ${product.name} (Code: ${product.code || 'N/A'}). Qty: ${quantity}. Please share pricing & availability.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl font-semibold shadow-xl hover:shadow-2xl hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:-translate-y-0.5"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.52 3.48A11.92 11.92 0 0 0 12 0C5.373 0 .105 5.268.105 11.895c0 2.095.545 4.14 1.574 5.94L0 24l6.3-1.645A11.873 11.873 0 0 0 12 23.79c6.627 0 11.895-5.268 11.895-11.895 0-3.174-1.24-6.158-3.375-8.415zM12 21.79c-1.63 0-3.23-.41-4.64-1.187l-.33-.185-3.74.976.999-3.648-.214-.37A8.06 8.06 0 0 1 3.105 11.9c0-4.41 3.585-8 8-8 4.415 0 8 3.59 8 8 0 4.414-3.585 8-8 8z"/>
                    </svg>
                    Contact Vendor
                  </a>

                  {/* Info Box */}
                  <div className="pt-6 border-t border-gray-200 space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span className="font-semibold">Warranty:</span> {product.warranty || '1 Year'}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="font-semibold">Bulk Orders:</span> Special pricing available
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products - Keep original but enhanced styling */}
        {relatedProducts.length > 0 && (
          <section className="bg-white/50 backdrop-blur-sm py-20 px-6">
            <div className="max-w-7xl mx-auto">
              <h3 className="text-4xl font-bold text-gray-900 mb-12 text-center">Related Products</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {relatedProducts.map(product => (
                  <Link key={product.id} href={`/products/${product.id}`} className="group">
                    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-white/50 hover:border-blue-100">
                      <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl overflow-hidden mb-6 group-hover:scale-105 transition-transform duration-300">
                        {renderImage(product.image)}
                      </div>
                      <h4 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2">{product.name}</h4>
                      <p className="text-2xl font-bold text-blue-600 mb-4">₹{product.price}</p>
                      <span className="text-sm text-blue-600 font-semibold hover:underline">View Details →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
