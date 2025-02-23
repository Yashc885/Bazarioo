"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import RegisterImage from "./../../assets/Authh/RegisterImage.jpg"; // Update path as needed

const Register = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        
        {/* Left Side Image - Hidden on Mobile */}
        <div className="w-1/2 hidden md:flex items-center justify-center bg-blue-100">
          <Image src={RegisterImage} alt="Shopping" className="w-full h-auto" />
        </div>

        {/* Right Side - Registration Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-900">Create an account</h2>
          <p className="text-gray-500 text-sm mb-6">Enter your details below</p>

          <form>
            <input type="text" placeholder="Name" className="w-full px-4 py-2 border rounded-md mb-4 focus:ring-2 focus:ring-red-500 focus:outline-none" />
            <input type="email" placeholder="Email or Phone Number" className="w-full px-4 py-2 border rounded-md mb-4 focus:ring-2 focus:ring-red-500 focus:outline-none" />
            <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded-md mb-4 focus:ring-2 focus:ring-red-500 focus:outline-none" />

            <button type="submit" className="w-full bg-red-500 text-white py-2 rounded-md font-semibold hover:bg-red-600 transition">
              Create Account
            </button>
          </form>

          {/* Google Signup */}
          <button className="w-full flex items-center justify-center mt-4 border rounded-md py-2 text-gray-700 hover:bg-gray-100 transition">
            <FaGoogle className="mr-2 text-red-500" /> Sign up with Google
          </button>

          {/* Login Link */}
          <p className="text-gray-500 text-sm text-center mt-4">
            Already have an account? <Link href="/login" className="text-red-500 font-semibold hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
