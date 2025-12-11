'use client';
import React from 'react';
import Login from '@/components/login';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function Register() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Register Page</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Username:</label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email:</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Password:</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Register
            </button>
            <a href="/login" className="block text-center text-blue-600 hover:underline mt-4">
              Back To Login
            </a>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
