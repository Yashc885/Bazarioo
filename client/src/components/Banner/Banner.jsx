"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Banner1 from './../../assets/Banner/Banner1.png'; // Replace with your actual image path

const Banner = () => {
  return (
    <div className="p-2 py-8 pb-8 ">
    <Link href="/offers" className="block">
      <div className="relative w-[1200px] h-[400px] mx-auto rounded-xl overflow-hidden cursor-pointer py-8 ">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-gray-800"></div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-between px-12 text-white">
          {/* Left Side (Text) */}
          <div className="space-y-4">
            <p className="text-green-400 uppercase text-sm font-semibold">Categories</p>
            <h1 className="text-4xl font-bold leading-tight">
              Enhance Your <br /> Music Experience
            </h1>
            <div className="flex space-x-4 text-center">
              {["23 Hours", "05 Days", "59 Minutes", "35 Seconds"].map((item, index) => (
                <div key={index} className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-md text-sm font-semibold">
                  {item}
                </div>
              ))}
            </div>
            <button className="mt-4 px-6 py-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition">
              Buy Now!
            </button>
          </div>

          {/* Right Side (Image) */}
          <div className="relative w-2/5">
            <Image src={Banner1} alt="Speaker" width={350} height={350} className="w-full h-auto drop-shadow-lg" />
          </div>
        </div>
      </div>
    </Link>
    </div>
  );
};

export default Banner;
