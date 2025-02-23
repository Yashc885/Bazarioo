"use client";
import React from "react";
import { FaHeart } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
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

const TopSelling = () => {
  return (
    <section className="p-6 bg-white py-8 ">
      <div className="flex items-center mb-4">
        <div className="bg-red-500 w-2 h-6 rounded-full mr-2"></div>
        <h2 className="text-red-500 font-semibold">Top Selling</h2>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Exclusive</h1>
        <Link href="/offers">
            <button className="bg-red-500 text-white py-2 px-6 rounded-md text-lg font-semibold hover:bg-red-600 transition">
            View All
            </button>
        </Link>
        </div>


      <div className="relative">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          spaceBetween={20}
          autoplay={{ delay: 2000, disableOnInteraction: true }}
          loop={true}
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
        <div className="w-full max-w-5xl border-t border-gray-300 mt-8 lg:mt-12"></div>
      </div>
    </section>
  );
};

export default TopSelling;
