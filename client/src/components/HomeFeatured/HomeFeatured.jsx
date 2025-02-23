"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Link from "next/link";
import Image from "next/image";

import cara1 from '@/assets/topSection/cara1.png';

const featuredProducts = [
  { id: 1, image: cara1, title: "PlayStation 5", description: "Black and White version of the PS5 coming out on sale.", link: "/shop" },
  { id: 2, image: cara1, title: "Women’s Collections", description: "Featured woman collections that give you another vibe.", link: "/shop" },
  { id: 3, image: cara1, title: "Speakers", description: "Amazon wireless speakers", link: "/shop" },
//   { id: 4, image: cara1, title: "Perfume", description: "GUCCI INTENSE OUD EDP", link: "/shop" },
];

export default function HomeFeatured() {
  return (
    <div className="w-full px-4 md:px-8 lg:px-16 py-8">
      {/* Section Header */}
      <div className="flex items-center mb-4">
        <div className="bg-red-500 w-2 h-6 rounded-full mr-2"></div>
        <h2 className="text-red-500 font-semibold">Featured</h2>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">New Arrival</h1>

      {/* Large Screen Layout */}
      <div className="hidden md:grid grid-cols-2 gap-4">
        {/* Left Large Image */}
        <div className="relative col-span-1">
          <Image src={featuredProducts[0].image} alt={featuredProducts[0].title} className="w-full h-full object-cover rounded-lg" />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-lg font-bold">{featuredProducts[0].title}</h3>
            <p className="text-sm">{featuredProducts[0].description}</p>
            <Link href={featuredProducts[0].link} className="text-white font-semibold underline">
              Shop Now
            </Link>
          </div>
        </div>

        {/* Right Grid (3 Small Boxes) */}
        <div className="grid grid-rows-2 gap-4">
          {featuredProducts.slice(1).map((product) => (
            <div key={product.id} className="relative bg-black text-white p-6 rounded-lg">
              <Image src={product.image} alt={product.title} className="w-full h-full object-cover rounded-lg opacity-40" />
              <div className="absolute inset-0 flex flex-col justify-center items-start p-6">
                <h3 className="text-lg font-bold">{product.title}</h3>
                <p className="text-sm">{product.description}</p>
                <Link href={product.link} className="text-white font-semibold underline">
                  Shop Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Swiper Carousel (Hidden on Medium and Large Screens) */}
      <div className="md:hidden">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
        >
          {featuredProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="relative w-full h-64 bg-black rounded-lg overflow-hidden">
                <Image src={product.image} alt={product.title} className="w-full h-full object-cover opacity-40" />
                <div className="absolute inset-0 flex flex-col justify-center items-start p-6 text-white">
                  <h3 className="text-lg font-bold">{product.title}</h3>
                  <p className="text-sm">{product.description}</p>
                  <Link href={product.link} className="text-white font-semibold underline">
                    Shop Now
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
