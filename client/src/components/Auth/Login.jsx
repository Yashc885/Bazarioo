'use client'
import React from 'react'
import Image from "next/image";
const login = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
    <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md text-center animate-fadeIn">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Please Sign In</h1>
      <form className="space-y-4">
        <div className="relative">
          <input
            type="email"
            id="email"
            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="name@example.com"
          />
          {/* <label htmlFor="email" className="absolute left-3  text-gray-500 text-sm">
            Email Address
          </label> */}
        </div>
        <div className="relative">
          <input
            type="password"
            id="password"
            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Password"
          />
          {/* <label htmlFor="password" className="absolute left-3  text-gray-500 text-sm">
            Password
          </label> */}
        </div>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="rounded border-gray-300" />
            <span>Remember me</span>
          </label>
          <a href="#" className="text-indigo-500 hover:underline">Forgot password?</a>
        </div>
        <button className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105">
          Sign In
        </button>
      </form>
      <p className="mt-5 text-gray-400 text-sm">&copy; 2024 - 2025</p>
    </div>
  </main>
  )
}

export default login