"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// Category Data
const categories = [
  { name: "Clothing", icon: "👕" },
  { name: "Beauty", icon: "💄" },
  { name: "Watches", icon: "⌚" },
  { name: "Home", icon: "🏠" },
  { name: "Headphones", icon: "🎧" },
  { name: "Shoes", icon: "👟" },
  { name: "Gaming", icon: "🎮" },
  { name: "Smartphones", icon: "📱" },
  { name: "Laptops", icon: "💻" },
  { name: "Fitness", icon: "🏋️" },
];

const Category = () => {
  const [active, setActive] = useState("Clothing");

  return (
    <div className="p-6 lg:py-8">
      {/* Header Section */}
      <div className="flex items-center mb-4">
        <div className="bg-red-500 w-2 h-6 rounded-full mr-2"></div>
        <h2 className="text-red-500 font-semibold">Categories</h2>
      </div>

      {/* Title & Navigation */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex-1">All Categories</h1>
        <div className="flex space-x-2 flex-1 justify-end">
          <div className="custom-swiper-button-prev bg-red-500 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-md cursor-pointer hover:bg-red-600 transition">
            ❮
          </div>
          <div className="custom-swiper-button-next bg-red-500 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-md cursor-pointer hover:bg-red-600 transition">
            ❯
          </div>
        </div>
      </div>

      {/* Swiper Container */}
      <div className="relative">
        <Swiper
          slidesPerView={2}
          spaceBetween={15}
          autoplay={{ delay: 2000, disableOnInteraction: true }}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          navigation={{
            nextEl: ".custom-swiper-button-next",
            prevEl: ".custom-swiper-button-prev",
          }}
          modules={[Navigation]}
          className="pb-6"
        >
          {categories.map((category) => (
            <SwiperSlide key={category.name}>
              <Link href={`/products?category=${category.name}`} passHref>
                <div
                  className={`border p-6 rounded-lg cursor-pointer flex flex-col items-center text-center transition-all ${
                    active === category.name ? "bg-red-500 text-white" : ""
                  }`}
                  onClick={() => setActive(category.name)}
                >
                  <span className="text-3xl">{category.icon}</span>
                  <p className="mt-2 text-sm lg:text-lg font-medium">{category.name}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex flex-col items-center mt-10">
        <div className="w-full max-w-5xl border-t border-gray-300 mt-12 lg:mt-16"></div>
      </div>
    </div>
  );
};

export default Category;
