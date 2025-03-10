"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";
import Link from "next/link";
import CartButton from './../ui/CartButton';
const TopSelling = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/product");
        console.log("API Response:", response.data);
        
        // Filtering products with discount greater than 20%
        const filteredProducts = response.data.products.filter(product => product.discount > 10);
        
        setProducts(filteredProducts);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="p-6 bg-white py-8">
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

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
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
              <SwiperSlide key={product._id}>
                <div className="relative border p-4 rounded-lg shadow-sm hover:shadow-md transition bg-white">
                  <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
                    -{product.discount || 10}%
                  </span>
                  <div className="absolute top-2 right-2 flex flex-col space-y-2">
                    <FaHeart className="text-gray-500 hover:text-red-500 cursor-pointer transition" />
                  </div>
                  <Image
                    src={product.images[0] || "/fallback.jpg"}
                    alt={product.title}
                    width={200}
                    height={350}
                    className="w-full h-40 object-cover mb-4"
                  />
                  <h3 className="text-sm font-semibold">{product.title}</h3>
                  <div className="text-red-500 font-bold">
                    ${product.price}{" "}
                    {product.originalPrice && (
                      <span className="text-gray-400 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  <CartButton product={product} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      <div className="flex flex-col items-center mt-10">
        <div className="w-full max-w-5xl border-t border-gray-300 mt-8 lg:mt-12"></div>
      </div>
    </section>
  );
};

export default TopSelling;
