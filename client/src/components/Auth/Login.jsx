"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import RegisterImage from "./../../assets/Authh/RegisterImage.jpg"; // Importing the image

const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        
        {/* Left Side Image - Hidden on Mobile */}
        <div className="w-1/2 hidden md:flex items-center justify-center bg-blue-100">
          <Image src={RegisterImage} alt="Shopping" className="w-full h-auto" />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-900">Log in to Exclusive</h2>
          <p className="text-gray-500 text-sm mb-6">Enter your details below</p>

          <form>
            <input type="email" placeholder="Email or Phone Number" className="w-full px-4 py-2 border rounded-md mb-4 focus:ring-2 focus:ring-red-500 focus:outline-none" />
            <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded-md mb-4 focus:ring-2 focus:ring-red-500 focus:outline-none" />

            <div className="flex justify-between items-center">
              <button type="submit" className="bg-red-500 text-white py-2 px-6 rounded-md font-semibold hover:bg-red-600 transition">
                Log In
              </button>
              <Link href="/forgot-password" className="text-red-500 text-sm font-semibold hover:underline">
                Forget Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
