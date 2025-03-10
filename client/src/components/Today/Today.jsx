"use client";
import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import Image from "next/image";
import Link from "next/link";
import mobile from "@/assets/Today/mobile.jpg";

const products = [
  { id: 1, name: "HAVIT HV-G92 Gamepad", price: 120, originalPrice: 160, discount: 40, image: mobile, reviews: 88 },
  { id: 2, name: "AK-900 Wired Keyboard", price: 960, originalPrice: 1160, discount: 35, image: mobile, reviews: 75 },
  { id: 3, name: "IPS LCD Gaming Monitor", price: 370, originalPrice: 400, discount: 30, image: mobile, reviews: 99 },
  { id: 4, name: "S-Series Comfort Chair", price: 375, originalPrice: 400, discount: 25, image: mobile, reviews: 99 },
  { id: 5, name: "AK-900 Wired Keyboard", price: 960, originalPrice: 1160, discount: 35, image: mobile, reviews: 75 },
  { id: 6, name: "IPS LCD Gaming Monitor", price: 370, originalPrice: 400, discount: 30, image: mobile, reviews: 99 },
];

const getRemainingTime = () => {
  const now = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(now.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  const difference = tomorrow - now;
  return {
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const Today = () => {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    setTimeLeft(getRemainingTime()); // Set initial time only on client
    const interval = setInterval(() => {
      setTimeLeft(getRemainingTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="p-6 bg-white ">
      <div className="flex items-center mb-4">
        <div className="bg-red-500 w-2 h-6 rounded-full mr-2"></div>
        <h2 className="text-red-500 font-semibold">Today's</h2>
      </div>

      <div className="flex justify-between items-center mb-6">
        {/* Deals Title */}
        <h1 className="text-3xl font-bold flex-1">Deal's</h1>

        {/* Timer - Hidden on Small Screens */}
        {timeLeft && (
          <div className="hidden md:flex items-center space-x-3 text-center flex-1 justify-center">
            {["Hours", "Minutes", "Seconds"].map((label, index) => {
              const timeValues = [timeLeft.hours, timeLeft.minutes, timeLeft.seconds];
              return (
                <div key={label} className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-black">{String(timeValues[index]).padStart(2, "0")}</div>
                  <div className="text-xs text-gray-500">{label}</div>
                </div>
              );
            }).reduce((acc, curr, idx) => idx === 0 ? [curr] : [...acc, <span key={idx} className="text-red-500 text-2xl">:</span>, curr], [])}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex space-x-2 flex-1 justify-end">
          <div className="custom-swiper-button-prev bg-red-500 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-md cursor-pointer hover:bg-red-600 transition">
            ❮
          </div>
          <div className="custom-swiper-button-next bg-red-500 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-md cursor-pointer hover:bg-red-600 transition">
            ❯
          </div>
        </div>
      </div>

      <div className="relative">
        <Swiper
          modules={[Autoplay, Navigation]}
          slidesPerView={1}
          spaceBetween={20}
          autoplay={{ delay: 2000, disableOnInteraction: true }}
          loop={true}
          navigation={{ nextEl: ".custom-swiper-button-next", prevEl: ".custom-swiper-button-prev" }}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 }, 1280: { slidesPerView: 4 } }}
          className="relative"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="relative border p-4 rounded-lg shadow-sm hover:shadow-md transition bg-white">
                <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">-{product.discount}%</span>
                <div className="absolute top-2 right-2 flex flex-col space-y-2">
                  <FaHeart className="text-gray-500 hover:text-red-500 cursor-pointer transition" />
                </div>
                <Image src={product.image} alt={product.name} width={200} height={350} className="w-full h-40 object-cover mb-4" />
                <h3 className="text-sm font-semibold">{product.name}</h3>
                <div className="text-red-500 font-bold">${product.price} <span className="text-gray-400 line-through">${product.originalPrice}</span></div>
                <span className="text-xs text-gray-500">({product.reviews} Reviews)</span>
                <button className="w-full bg-black text-white py-2 mt-2 rounded-md text-lg font-semibold hover:bg-gray-600 transition">Add To Cart</button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex flex-col items-center mt-10">
        <Link href="/offers">
          <button className="bg-red-500 text-white py-2 px-6 rounded-md text-lg font-semibold hover:bg-red-600 transition">View All</button>
        </Link>
        <div className="w-full max-w-5xl border-t border-gray-300 mt-12 lg:mt-16 justify-center items-center"></div>
      </div>
    </section>
  );
};

export default Today;
