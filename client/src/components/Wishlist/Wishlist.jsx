"use client";
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import mobile from "@/assets/Today/mobile.jpg";
import Link from "next/link";

const initialWishlistItems = [
  { id: 1, name: "Gucci duffle bag", price: 960, originalPrice: 1160, discount: 35, image: mobile },
  { id: 2, name: "RGB liquid CPU Cooler", price: 1960, image: mobile },
  { id: 3, name: "Quilted Satin Jacket", price: 750, image: mobile },
  { id: 4, name: "GP11 Shooter USB Gamepad", price: 550, image: mobile },
  { id: 5, name: "Quilted Satin Jacket", price: 750, image: mobile },
];

const recommendedItems = [
  { id: 5, name: "ASUS FHD Gaming Laptop", price: 960, originalPrice: 1160, discount: 35, image: mobile },
  { id: 6, name: "IPS LCD Gaming Monitor", price: 1160, image: mobile },
  { id: 7, name: "HAVIT HV-G92 Gamepad", price: 560, image: mobile },
  { id: 8, name: "AK-900 Wired Keyboard", price: 200, image: mobile },
];

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);

  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  return (
    <section className="p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl lg:text-2xl font-semibold">Wishlist ({wishlistItems.length})</h1>
        <button className="border px-4 py-2 rounded-md">Move All To Bag</button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {wishlistItems.map((item) => (
          <div key={item.id} className="relative border p-4 rounded-lg shadow-sm bg-white">
            {item.discount && (
              <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">-{item.discount}%</span>
            )}
            <FaTrash 
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 cursor-pointer" 
              onClick={() => removeFromWishlist(item.id)} 
            />
            <Image src={item.image} alt={item.name} width={200} height={150} className="w-full h-40 object-cover mb-4" />
            <h3 className="text-sm font-semibold">{item.name}</h3>
            <div className="text-red-500 font-bold">${item.price} {item.originalPrice && <span className="text-gray-400 line-through">${item.originalPrice}</span>}</div>
            <button className="w-full bg-black text-white py-2 mt-2 rounded-md text-lg font-semibold hover:bg-gray-600">Add To Cart</button>
          </div>
        ))}
      </div>
      
      <div className="flex items-center mt-12 mb-6">
        <div className="bg-red-500 w-2 h-6 rounded-full mr-2"></div>
        <h2 className="text-black font-semibold text-lg mg:text-xl mt-2 mb-2">Just For You</h2>
      </div>
      
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        spaceBetween={20}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 }, 1280: { slidesPerView: 4 } }}
        className="relative"
      >
        {recommendedItems.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative border p-4 rounded-lg shadow-sm bg-white">
              {item.discount && (
                <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">-{item.discount}%</span>
              )}
              <Image src={item.image} alt={item.name} width={200} height={150} className="w-full h-40 object-cover mb-4" />
              <h3 className="text-sm font-semibold">{item.name}</h3>
              <div className="text-red-500 font-bold">${item.price} {item.originalPrice && <span className="text-gray-400 line-through">${item.originalPrice}</span>}</div>
              <button className="w-full bg-black text-white py-2 mt-2 rounded-md text-lg font-semibold hover:bg-gray-600">Add To Cart</button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      <div className="flex justify-center mt-6">
        <Link href="/products">
          <button className="border px-4 py-2 rounded-md">See All</button>
        </Link>
      </div>
    </section>
  );
};

export default Wishlist;
