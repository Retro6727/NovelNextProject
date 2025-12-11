import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Novel Solutions</h3>
            <p className="text-sm mb-4">
              Premium B2B manufacturing solutions trusted by businesses across India.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-400 transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Twitter</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Facebook</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="hover:text-blue-400 transition-colors">Products</Link></li>
              <li><Link href="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="/pricing" className="hover:text-blue-400 transition-colors">Pricing</Link></li>
              <li><Link href="/blog" className="hover:text-blue-400 transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/faq" className="hover:text-blue-400 transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
              <li><Link href="/shipping" className="hover:text-blue-400 transition-colors">Shipping Info</Link></li>
              <li><Link href="/returns" className="hover:text-blue-400 transition-colors">Returns</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">Get in Touch</h4>
            <ul className="space-y-2 text-sm">
              <li>Email: <a href="mailto:novelsolution.trade@gmail.com" className="hover:text-blue-400 transition-colors">novelsolution.trade@gmail.com</a></li>
              <li>Phone: <a href="tel:+911234567890" className="hover:text-blue-400 transition-colors">+91-9867473095/ 8779502710</a></li>
              <li>Address: <span>Kalyan West, India</span></li>
              <li className="text-xs mt-4">GeM Registered Business</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; 2025 Novel Solutions. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
              <Link href="/cookies" className="hover:text-blue-400 transition-colors">Cookie Policy</Link>
              <Link href="/policies" className="hover:text-blue-400 transition-colors">Policies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
