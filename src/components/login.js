import {React, useState} from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', { email, password });
    alert('Login functionality is not implemented yet.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4">Login to Your Account</h1>
            <p className="text-xl opacity-90">Access your Novel Solutions dashboard</p>
            </div>
        </section>

        <div className="max-w-md mx-auto px-6 py-16">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8">
                <div className="mb-6">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">Login</button>
            </form>
        </div>
      </main>
      <Footer />
    </div>
    );
}