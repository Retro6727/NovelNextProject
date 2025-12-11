'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { getProducts, CATEGORIES as CATEGORY_TREE, CATEGORY_OPTIONS } from '@/lib/products';

const CATEGORIES = CATEGORY_OPTIONS;

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [sortBy, setSortBy] = useState('newest');
  const [priceFilter, setPriceFilter] = useState(null);
  const [ratingFilter, setRatingFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  useEffect(() => {
    const sync = () => setProducts(getProducts());
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  // Filter by category
  let filteredProducts = selectedCategory === 'All Products'
    ? products
    : products.filter(p => p.category === selectedCategory || p.subcategory === selectedCategory);

  // Price filter
  if (priceFilter) {
    filteredProducts = filteredProducts.filter(p => {
      switch (priceFilter) {
        case 'under-1000': return p.price < 1000;
        case '1000-5000': return p.price >= 1000 && p.price <= 5000;
        case '5000-10000': return p.price > 5000 && p.price <= 10000;
        case 'above-10000': return p.price > 10000;
        default: return true;
      }
    });
  }

  // Rating filter
  if (ratingFilter) {
    filteredProducts = filteredProducts.filter(p => p.rating >= ratingFilter);
  }

  // Search
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(q)
    );
  }

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      default: return 0;
    }
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="bg-white px-6 py-4 shadow-sm">
          <div className="max-w-7xl mx-auto">
            <Link href="/" className="text-blue-600 hover:underline">Home</Link>
            <span className="text-gray-500 mx-2">/</span>
            <span className="text-gray-700">Products</span>
          </div>
        </div>

        {/* Page Header */}
        <section className="px-6 py-12 bg-white border-b">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl font-bold mb-4 text-gray-900">Our Products</h1>
            <p className="text-gray-600 text-xl">Browse our comprehensive catalog of high-quality manufacturing products</p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* SIDEBAR (unchanged) */}
            <div className={`lg:col-span-1 bg-white p-6 rounded-lg shadow-md ${isSidebarOpen ? 'block' : 'hidden lg:block'}`}>
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden mb-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                {isSidebarOpen ? 'Hide Filters' : 'Show Filters'}
              </button>

              {/* Categories */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Categories</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('All Products')}
                    className={`block w-full text-left px-4 py-3 rounded-lg ${
                      selectedCategory === 'All Products'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    All Products
                  </button>

                  {CATEGORY_TREE.map(group => (
                    <div key={group.name} className="mt-4">
                      <div className="px-4 py-2 bg-gray-100 rounded text-sm font-semibold">
                        {group.name}
                      </div>
                      <div className="pl-4">
                        <button
                          onClick={() => setSelectedCategory(group.name)}
                          className={`block w-full text-left px-4 py-2 rounded-lg ${
                            selectedCategory === group.name
                              ? 'bg-blue-600 text-white'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {group.name}
                        </button>

                        {group.subs.map(sub => (
                          <button
                            key={sub}
                            onClick={() => setSelectedCategory(sub)}
                            className={`block w-full text-left px-6 py-2 rounded-lg ${
                              selectedCategory === sub
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Price Range</h3>
                <div className="space-y-3">
                  {[
                    { label: "All Prices", value: null },
                    { label: "Under ₹1,000", value: "under-1000" },
                    { label: "₹1,000 - ₹5,000", value: "1000-5000" },
                    { label: "₹5,000 - ₹10,000", value: "5000-10000" },
                    { label: "Above ₹10,000", value: "above-10000" }
                  ].map(item => (
                    <label key={item.label} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        checked={priceFilter === item.value}
                        onChange={() => setPriceFilter(item.value)}
                        className="mr-3"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <h3 className="text-xl font-bold mb-4">Rating</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={ratingFilter === null}
                      onChange={() => setRatingFilter(null)}
                      className="mr-3"
                    />
                    <span>All Ratings</span>
                  </label>

                  {[5, 4, 3].map(stars => (
                    <label key={stars} className="flex items-center">
                      <input
                        type="radio"
                        checked={ratingFilter === stars}
                        onChange={() => setRatingFilter(stars)}
                        className="mr-3"
                      />
                      <span>⭐ {stars}+ Stars</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* MAIN CONTENT WITH NEW SECTION */}
            <div className="lg:col-span-3">

              {/* Search Bar */}
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg"
                />
              </div>

              {/* Sort Bar */}
              <div className="flex justify-between items-center mb-8 pb-4 border-b bg-white p-4 rounded-lg shadow-sm">
                <p className="text-gray-600">
                  Showing <span className="font-bold">{sortedProducts.length}</span> products
                </p>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded-lg px-4 py-2"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* ⭐ SELECTED CATEGORY TITLE + DIVIDER */}
              <h2 className="text-3xl font-bold mb-4">{selectedCategory}</h2>
              <div className="w-full h-1 bg-gray-200 mb-8"></div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map(product => (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <div className="bg-white border rounded-xl overflow-hidden hover:shadow-xl transition cursor-pointer transform hover:-translate-y-1">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 h-48 flex items-center justify-center">
                        {product.image ? (
                          typeof product.image === 'string' ? (
                            product.image.startsWith('data:') || product.image.startsWith('http') ? (
                              <img src={product.image} alt={product.name} className="max-h-40 object-contain" />
                            ) : (
                              <span className="text-6xl">{product.image}</span>
                            )
                          ) : (
                            product.image.url ? (
                              <img src={product.image.url} alt={product.name} className="max-h-40 object-contain" />
                            ) : (
                              <span className="text-5xl">📦</span>
                            )
                          )
                        ) : (
                          <span className="text-5xl">📦</span>
                        )}
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                        <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {product.description || 'No description available'}
                        </p>

                        <div className="flex items-center justify-between mb-4">
                          <span className="text-3xl font-bold text-blue-600">₹{product.price}</span>
                          <div className="text-sm text-yellow-500 flex items-center">
                            <span>⭐</span> {product.rating}
                          </div>
                        </div>

                        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
                          View Product
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {sortedProducts.length === 0 && (
                <div className="text-center py-12 text-gray-500 text-lg">
                  No products found matching your criteria.
                </div>
              )}
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
