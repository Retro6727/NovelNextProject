'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4">About Novel Solutions</h1>
            <p className="text-xl opacity-90">Trusted Manufacturing Partner for B2B Excellence</p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Company Overview */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-700 text-lg mb-4">
              NOVEL SOLUTION is a trusted GeM-supported B2B Manufacturer, supplier & distributor offering high-quality products at competitive prices. Include all types of materials for businesses, institutions, and government buyers. Quality products, best pricing, and timely delivery.
            </p>
            <p className="text-gray-700 text-lg mb-4">
              As a GeM-registered business, we're committed to supporting government and institutional procurement while maintaining the same premium standards for all our customers.
            </p>
            <p className="text-gray-700 text-lg">
              Our extensive experience in manufacturing and procurement has enabled us to build a network of trusted suppliers and deliver exceptional value to our B2B customers.
            </p>
          </section>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="bg-blue-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-blue-600">Our Mission</h3>
              <p className="text-gray-700">
                To be the most trusted source for high-quality manufacturing products, delivering consistent value through transparency, reliability, and exceptional customer service.
              </p>
            </div>
            <div className="bg-green-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-green-600">Our Vision</h3>
              <p className="text-gray-700">
                To empower businesses across India with access to premium manufacturing products at fair prices, enabling economic growth and industrial excellence.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="text-5xl mb-4">🎯</div>
                <h4 className="text-xl font-bold mb-2">Quality First</h4>
                <p className="text-gray-700">Every product undergoes rigorous quality checks before delivery</p>
              </div>
              <div className="text-center p-6">
                <div className="text-5xl mb-4">💎</div>
                <h4 className="text-xl font-bold mb-2">Transparency</h4>
                <p className="text-gray-700">Clear pricing and honest communication at every step</p>
              </div>
              <div className="text-center p-6">
                <div className="text-5xl mb-4">🤝</div>
                <h4 className="text-xl font-bold mb-2">Reliability</h4>
                <p className="text-gray-700">Consistent service and timely delivery you can depend on</p>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-12 mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">By The Numbers</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold mb-2">500+</div>
                <p className="opacity-90">Products Available</p>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">2500+</div>
                <p className="opacity-90">Happy Customers</p>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">10K+</div>
                <p className="opacity-90">Orders Fulfilled</p>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">99%</div>
                <p className="opacity-90">Customer Satisfaction</p>
              </div>
            </div>
          </section>

          {/* Team */}
          <section>
            <h2 className="text-3xl font-bold mb-8">Why Partner With Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <span className="text-3xl">✅</span>
                <div>
                  <h4 className="font-bold text-lg mb-2">GeM Registered</h4>
                  <p className="text-gray-700">Approved for government and institutional procurement</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-3xl">📦</span>
                <div>
                  <h4 className="font-bold text-lg mb-2">Fast Shipping</h4>
                  <p className="text-gray-700">Efficient logistics network across India</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-3xl">💰</span>
                <div>
                  <h4 className="font-bold text-lg mb-2">Bulk Discounts</h4>
                  <p className="text-gray-700">Special pricing for large volume orders</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-3xl">🛡️</span>
                <div>
                  <h4 className="font-bold text-lg mb-2">Quality Guarantee</h4>
                  <p className="text-gray-700">24-month warranty on all products</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
