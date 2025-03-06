"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import CartButton from "./../ui/CartButton";

export default function HomeProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/product");
        const data = response.data;
        if (data && Array.isArray(data.products)) {
          const limitedProducts = data.products.slice(0, 20); // Max 20 products
          setProducts(limitedProducts);
        } else {
          setProducts([]); // Fallback for unexpected response
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  // Split products into two unique sets for each Swiper
  const halfLength = Math.ceil(products.length / 2);
  const firstHalf = products.slice(0, halfLength);
  const secondHalf = products.slice(halfLength, 20);

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
        autoplay={{ delay: 1500, disableOnInteraction: false }} // Faster speed
        className="mb-8"
      >
        {firstHalf.map((product) => (
          <SwiperSlide key={product._id}>
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
        autoplay={{
          delay: 1200, // Even faster for better effect
          disableOnInteraction: false,
          reverseDirection: true,
        }}
      >
        {secondHalf.map((product) => (
          <SwiperSlide key={product._id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* View All Products Button */}
      <div className="flex justify-center mt-10">
        <Link href="/products">
          <button className="bg-red-500 text-white py-2 px-6 rounded-md text-lg font-semibold hover:bg-red-600 transition">
            View All Products
          </button>
        </Link>
      </div>
      <div className="w-full max-w-5xl border-t border-gray-300 mt-12 lg:mt-16 justify-center items-center"></div>
    </div>
  );
}

// Product Card Component with Add to Cart functionality
const ProductCard = ({ product }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white hover:shadow-xl transition-all w-[250px] h-[320px] flex flex-col justify-between">
      <Image
        src={product.images[0]}
        alt={product.title}
        width={220}
        height={220}
        className="w-full h-[180px] object-cover mb-3 rounded-md"
        unoptimized
      />
      <h3 className="font-semibold text-center text-sm">{product.title}</h3>
      <p className="text-red-500 font-bold text-center">${product.offerPrice}</p>
      <CartButton product={product} />
    </div>
  );
};
