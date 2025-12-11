import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getCart } from '@/lib/cart';

export default function Header() {
  const [cartCount, setCartCount] = useState(0);

  // Fetch cart count from localStorage or state
  useEffect(() => {
    const cart = getCart();
    setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
  }, []);

  const isAuthenticated = false; // Replace with actual authentication check
  const isAdmin = false;

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" aria-label="Novel Solutions home" className="flex items-center gap-4">
          <div className="relative w-28 h-14 rounded-lg overflow-hidden shadow-xl bg-white">
            <Image
              src="/images/companylogo.jpg"
              alt="Novel Solutions"
              fill
              style={{ objectFit: 'contain' }}
              priority
              sizes="112px"
            />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-white text-2xl font-extrabold tracking-wide select-none drop-shadow-lg">
              Novel Solutions
            </span>
            <span className="mt-1 text-sm bg-white/25 text-white px-3 py-1 rounded-full font-semibold drop-shadow-sm">
              GeM Certified
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex gap-10">
          {['Home', 'Products', 'About', 'Contact'].map((item) => (
            <Link
              key={item}
              href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              className="relative text-white text-lg font-semibold hover:text-yellow-300 transition-all duration-300 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-yellow-300 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <Link
            href="/cart"
            className="relative group flex items-center gap-1 text-white font-semibold hover:text-yellow-300 transition-colors"
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.98-1.75L23 6H6" />
            </svg>
            <span className="sr-only">Cart items count</span>
            <span className="absolute -top-1 -right-2 min-w-[18px] h-5 flex items-center justify-center rounded-full bg-yellow-400 text-black text-xs font-bold shadow-lg shadow-yellow-500/60 animate-pulse">
              {cartCount}
            </span>
          </Link>

          {isAdmin && (
            <Link
              href="/admin"
              className="text-white text-sm font-semibold px-3 py-1 rounded-md hover:bg-yellow-400 hover:text-black transition-colors"
              aria-label="Admin Panel"
              title="Admin Panel"
            >
              ⚙️ Admin
            </Link>
          )}

          {isAuthenticated ? (
            <Link
              href="/logout"
              className="rounded-full bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2 font-bold transition-colors shadow-lg shadow-yellow-300"
            >
              Logout
            </Link>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2 font-bold transition-colors shadow-lg shadow-yellow-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
