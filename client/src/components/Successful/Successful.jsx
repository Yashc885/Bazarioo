"use client";
import React from "react";
import { CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

const Successful = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-6">
      {/* Success Icon */}
      <div className="relative flex items-center justify-center bg-red-500 p-6 rounded-full shadow-lg">
        <CheckCircle className="text-white w-16 h-16" />
        <div className="absolute -top-3 -left-3 w-3 h-3 bg-red-400 rounded-full animate-ping"></div>
        <div className="absolute -top-3 -right-3 w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
        <div className="absolute -bottom-3 left-1/2 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
      </div>

      {/* Success Message */}
      <h1 className="text-xl md:text-2xl font-bold text-gray-800 mt-6 text-center">
        Your Order has been accepted
      </h1>
      <p className="text-gray-500 text-center mt-2 text-sm md:text-base">
        Your items have been placed and are on their way to being processed
      </p>

      {/* Buttons */}
      <div className="mt-6 w-full max-w-xs">
        <Link href="/track-order">
          <button className="w-full bg-red-500 text-white py-3 rounded-lg text-lg shadow-md transition hover:bg-red-600">
            Track Order
          </button>
        </Link>
        <Link href="/">
          <div className="flex justify-center items-center mt-4 text-gray-500 hover:text-gray-700 cursor-pointer">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to home
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Successful;
