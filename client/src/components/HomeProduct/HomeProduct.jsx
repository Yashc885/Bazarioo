"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Link from "next/link";
import Image from "next/image";
import mobile from "@/assets/Today/mobile.jpg";

const products = [
  { id: 1, image: mobile, name: "Breed Dry Dog Food", price: "$100" },
  { id: 2, image: mobile, name: "CANON EOS DSLR Camera", price: "$360" },
  { id: 3, image: mobile, name: "ASUS FHD Gaming Laptop", price: "$700" },
  { id: 4, image: mobile, name: "Curology Product Set", price: "$500" },
  { id: 5, image: mobile, name: "Kids Electric Car", price: "$960" },
  { id: 6, image: mobile, name: "Jr. Zoom Soccer Cleats", price: "$1160" },
];

export default function HomeProduct() {
  return (
    <div className="w-full px-4 md:px-8 lg:px-16 py-8">
      {/* Section Header */}
      <div className="flex items-center mb-4">
        <div className="bg-red-500 w-2 h-6 rounded-full mr-2"></div>
        <h2 className="text-red-500 font-semibold">Our Product</h2>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">All Products</h1>

      {/* Swiper: Left to Right */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        loop={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        className="mb-8"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Swiper: Right to Left */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        loop={true}
        autoplay={{ delay: 2000, disableOnInteraction: false, reverseDirection: true }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* View All Products Button */}
      <div className="flex justify-center mt-10">
        <Link href="/offers">
          <button className="bg-red-500 text-white py-2 px-6 rounded-md text-lg font-semibold hover:bg-red-600 transition">
            View All Products
          </button>
        </Link>
      </div>
      <div className="w-full max-w-5xl border-t border-gray-300 mt-12 lg:mt-16 justify-center items-center"></div>
    </div>
  );
}

// Product Card Component
const ProductCard = ({ product }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white hover:shadow-xl transition-all">
      <Image
        src={product.image}
        alt={product.name}
        width={200}
        height={200}
        className="w-full h-40 object-cover mb-3 rounded-md"
      />
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-red-500 font-bold">{product.price}</p>
      <button className="w-full bg-black text-white py-2 mt-2 rounded-md text-lg font-semibold hover:bg-gray-600 transition">
        Add To Cart
      </button>
    </div>
  );
};
