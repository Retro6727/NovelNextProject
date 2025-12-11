'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm();
  };

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const submitForm = async () => {
    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const body = await res.json();
      if (!res.ok) {
        console.error('Contact submit error', body);
        setErrorMessage(body?.error || 'Failed to submit. Please try again later.');
        setIsLoading(false);
        return;
      }

      setSuccessMessage('Thank you — your message has been sent. We will get back to you soon.');
      setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
    } catch (err) {
      console.error('Submit error', err);
      setErrorMessage('Network error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-xl opacity-90">We're here to help with your manufacturing needs</p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
              
              <div className="mb-8">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <span className="text-2xl">📍</span> Address
                </h4>
                <p className="text-gray-700">
                  Novel Solutions <br />
                  Kalyan West, India<br />
                  PIN: 421301
                </p>
              </div>
              <div className="mb-8">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <span className="text-2xl">📞</span> Phone
                </h4>
                <p className="text-gray-700">
                  <a href="tel:+919867473095/ +91-8779502710" className="text-blue-600 hover:underline">
                    +91-9867473095 / +91-8779502710
                  </a>
                </p>
              </div>

              <div className="mb-8">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <span className="text-2xl">✉️</span> Email
                </h4>
                <p className="text-gray-700">
                  <a href="mailto:novelsolution.trade@gmail.com" className="text-blue-600 hover:underline">
                    novelsolution.trade@gmail.com
                  </a>
                  <br />
                </p>
              </div>

              <div className="mb-8">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <span className="text-2xl">🕐</span> Business Hours
                </h4>
                <p className="text-gray-700">
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-bold mb-2">🎯 Quick Support</h4>
                <p className="text-sm text-gray-700">
                  For urgent queries, call our sales team directly during business hours.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-8">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {successMessage && (
                  <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded mb-2">{successMessage}</div>
                )}
                {errorMessage && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded mb-2">{errorMessage}</div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-semibold mb-2 text-gray-700">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2 text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-semibold mb-2 text-gray-700">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="+91-XXXXXXXXXX"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2 text-gray-700">Company Name</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="Your company"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-2 text-gray-700">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="">Select a subject</option>
                    <option value="inquiry">Product Inquiry</option>
                    <option value="bulk">Bulk Order</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-2 text-gray-700">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                    placeholder="Tell us about your inquiry..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-60"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>

          {/* FAQ Section */}
          <section className="mt-20 pt-20 border-t">
            <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold mb-2 text-blue-600">What is your minimum order quantity?</h4>
                <p className="text-gray-700">Most products have a minimum order of 1 unit. However, bulk orders (50+ units) qualify for special discounts.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold mb-2 text-blue-600">Do you offer international shipping?</h4>
                <p className="text-gray-700">Currently, we serve customers across India. International shipping is available upon request.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold mb-2 text-blue-600">What is your return policy?</h4>
                <p className="text-gray-700">We offer a 30-day return policy for unused items in original packaging. Custom orders are non-returnable.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold mb-2 text-blue-600">How do I request a bulk quote?</h4>
                <p className="text-gray-700">Use the contact form above or email sales@novasols.com with your requirements for a customized quote.</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
