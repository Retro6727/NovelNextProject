'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCart, removeFromCart, updateQuantity } from '@/lib/cart';
import Footer from '@/components/Footer';

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load cart initially + listen to cart changes
  useEffect(() => {
    setCart(getCart());

    const updateHandler = (e) => {
      setCart(e.detail.cart);
    };

    window.addEventListener('novelsols_cart_changed', updateHandler);

    return () => {
      window.removeEventListener('novelsols_cart_changed', updateHandler);
    };
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleQuantityChange = async (id, newQuantity) => {
    if (newQuantity < 1) return;
    setLoading(true);
    await updateQuantity(id, newQuantity);
    setLoading(false);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-8 bg-white rounded-2xl shadow-xl flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1 4c-.5 2-2.3 3.5-4.5 3.5s-4-1.5-4.5-3.5l-.5-2" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-xl text-gray-600 mb-8">No items yet. Start shopping to fill your cart!</p>
          <Link 
            href="/products" 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-3xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1"
          >
            Start Shopping →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Your Cart
          </h1>
          <p className="text-xl text-gray-600">Review your items before checkout</p>
        </div>

        {/* Cart Items */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="group bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl hover:border-indigo-200 transition-all duration-300 overflow-hidden">
                <div className="p-8 flex items-center gap-6">
                  {/* Product Image */}
                  <div className="relative">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-24 h-24 object-cover rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-1 leading-tight">{item.name}</h3>
                    <p className="text-sm text-gray-500 mb-4">₹{item.price.toLocaleString()} each</p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <button
                        className="w-12 h-12 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl shadow-md hover:shadow-lg hover:from-gray-200 hover:to-gray-300 transition-all duration-200 flex items-center justify-center text-lg font-semibold disabled:opacity-50"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={loading}
                      >
                        -
                      </button>
                      <span className="w-16 text-center text-2xl font-bold text-gray-900">{item.quantity}</span>
                      <button
                        className="w-12 h-12 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl shadow-md hover:shadow-lg hover:from-gray-200 hover:to-gray-300 transition-all duration-200 flex items-center justify-center text-lg font-semibold disabled:opacity-50"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        disabled={loading}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Price & Remove */}
                  <div className="text-right flex flex-col items-end gap-3">
                    <p className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                    <button
                      className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200 flex items-center gap-1 group/remove"
                      onClick={() => removeFromCart(item.id)}
                      disabled={loading}
                    >
                      <svg className="w-4 h-4 group-hover/remove:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-lg">
                  <span>Subtotal ({cart.length} items):</span>
                  <span className="font-semibold">₹{total.toLocaleString()}</span>
                </div>
                {/* <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div> */}
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
              </div>

              <div className="text-3xl font-bold text-gray-900 mb-8 text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
                Total: ₹{total.toLocaleString()}
              </div>

              <div className="space-y-3">
                <Link 
                  href="/ordered"
                  className="block w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-5 px-6 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 transform hover:-translate-y-1 text-center"
                >
                  Order Now ➡️
                </Link>
                
                <Link 
                  href="/products"
                  className="block w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl hover:from-gray-200 hover:to-gray-300 transition-all duration-300 transform hover:-translate-y-0.5 text-center border border-gray-200"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>      
      <Footer />
    </div>
  );
}
