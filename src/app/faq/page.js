'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const FAQ_DATA = [
  {
    category: 'General',
    questions: [
      {
        q: 'What is Novel Solutions?',
        a: 'Novel Solutions is a GeM-registered B2B e-commerce platform specializing in high-quality manufacturing products at consistent prices. We serve businesses across India with premium industrial components and materials.'
      },
      {
        q: 'Is Novel Solutions an official GeM vendor?',
        a: 'Yes, we are officially registered on the Government e-Marketplace (GeM) and fully compliant with all government procurement standards.'
      },
      {
        q: 'Who can buy from Novel Solutions?',
        a: 'We cater to B2B customers including manufacturers, businesses, enterprises, and government organizations. Individual retail purchases are not our primary focus.'
      }
    ]
  },
  {
    category: 'Products & Ordering',
    questions: [
      {
        q: 'What is your minimum order quantity?',
        a: 'Most products have no strict minimum order. However, certain items may have suggested minimums for bulk pricing. Check individual product pages for details.'
      },
      {
        q: 'How do I order?',
        a: 'Browse our product catalog, select items, add to cart, and proceed to checkout. You can also request a custom quote for bulk orders.'
      },
      {
        q: 'Do you offer bulk discounts?',
        a: 'Yes! We offer attractive discounts on orders of 50+ units. Contact our sales team for customized bulk pricing.'
      },
      {
        q: 'Can I order customized products?',
        a: 'Yes, we can handle custom manufacturing requests. Please contact our sales team with your specifications for a quote.'
      }
    ]
  },
  {
    category: 'Pricing & Payment',
    questions: [
      {
        q: 'Why do your prices vary?',
        a: 'We maintain consistent pricing for individual orders. Discounts apply based on quantity tiers, order size, and bulk purchases.'
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept bank transfers, NEFT, RTGS, online payments, and for government buyers, direct GeM payment gateways.'
      },
      {
        q: 'Is there a payment plan option?',
        a: 'For bulk orders and corporate customers, we offer flexible payment terms. Contact our sales team to discuss options.'
      },
      {
        q: 'Do you offer GST invoices?',
        a: 'Yes, all invoices include proper GST calculations and are compliant with Indian tax laws.'
      }
    ]
  },
  {
    category: 'Shipping & Delivery',
    questions: [
      {
        q: 'How long does delivery take?',
        a: 'Delivery times vary based on location and product availability. Most orders are delivered within 5-10 business days.'
      },
      {
        q: 'Do you ship across India?',
        a: 'Yes, we have a reliable logistics network covering all major cities and regions across India.'
      },
      {
        q: 'What are the shipping charges?',
        a: 'Shipping costs vary based on location and order weight. Free shipping is available on orders above ₹50,000.'
      },
      {
        q: 'Do you offer international shipping?',
        a: 'Currently, we primarily serve the Indian market. International shipping is available upon special request.'
      }
    ]
  },
  {
    category: 'Quality & Returns',
    questions: [
      {
        q: 'What quality standards do your products meet?',
        a: 'All products meet ISO standards and undergo rigorous quality control. We guarantee that every item meets specifications before dispatch.'
      },
      {
        q: 'What is your warranty policy?',
        a: 'We offer a 24-month warranty on most products from the date of purchase. Specific warranty details are available on product pages.'
      },
      {
        q: 'What is your return policy?',
        a: 'We accept returns within 30 days of delivery for unused items in original packaging. Custom orders and bulk purchases have specific conditions.'
      },
      {
        q: 'How do I initiate a return?',
        a: 'Contact our customer support team with your order details. We will provide instructions and arrange pickup if needed.'
      }
    ]
  },
  {
    category: 'Account & Support',
    questions: [
      {
        q: 'Do I need an account to order?',
        a: 'Yes, creating an account helps track orders and access personalized features. It\'s quick and free!'
      },
      {
        q: 'How do I track my order?',
        a: 'Once your order ships, you\'ll receive a tracking number via email. Use it to monitor delivery status in real-time.'
      },
      {
        q: 'How can I contact customer support?',
        a: 'Reach us via email at support@novasols.com or call +91-123-456-7890 during business hours (9 AM - 6 PM, Monday-Saturday).'
      }
    ]
  }
];

export default function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleFAQ = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl opacity-90">Find answers to common questions about Novel Solutions</p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="space-y-8">
            {FAQ_DATA.map((category, categoryIdx) => (
              <div key={categoryIdx}>
                <h2 className="text-2xl font-bold mb-6 text-blue-600 border-b pb-4">{category.category}</h2>
                <div className="space-y-4">
                  {category.questions.map((faq, qIdx) => {
                    const globalIndex = `${categoryIdx}-${qIdx}`;
                    const isExpanded = expandedIndex === globalIndex;

                    return (
                      <div key={qIdx} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <button
                          onClick={() => toggleFAQ(globalIndex)}
                          className="w-full px-6 py-4 text-left font-semibold flex justify-between items-center hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-gray-800">{faq.q}</span>
                          <span className={`text-blue-600 text-2xl transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                            ▼
                          </span>
                        </button>
                        {isExpanded && (
                          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                            <p className="text-gray-700">{faq.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-16 bg-blue-50 border-l-4 border-blue-600 p-8 rounded">
            <h3 className="text-2xl font-bold mb-4">Didn't find your answer?</h3>
            <p className="text-gray-700 mb-6">
              Contact our customer support team for personalized assistance with your queries.
            </p>
            <a
              href="/contact"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
