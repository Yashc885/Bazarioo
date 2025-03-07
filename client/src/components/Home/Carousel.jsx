'use client';
import { useState } from "react";
import Image from "next/image";
import cara1 from './../../assets/topSection/cara1.png';

const slides = [
  { id: 1, image: cara1, link: "/products" },
  { id: 2, image: cara1, link: "/products" },
  { id: 3, image: cara1, link: "/products" },
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="w-full max-w-screen-lg mx-auto p-8 py-12 lg:py-16">
      {/* Box Container */}
      <div className="relative w-full h-[250px] md:h-[300px] shadow-xl overflow-hidden bg-gray-100">
        {/* Slider Wrapper */}
        <div
          className="flex transition-transform duration-700 h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="min-w-full h-full relative">
              {/* Banner Image */}
              <Image
                src={slide.image}
                alt="Banner"
                width={1000}
                height={300}
                className="w-full h-full object-cover"
              />
              {/* Shop Now Button */}
              <a 
                href={slide.link} 
                className="absolute bottom-6 left-6 md:left-12 text-white text-sm md:text-base font-medium flex items-center gap-2 px-5 py-2 border border-gray-400 rounded-full bg-opacity-50 hover:bg-opacity-100 transition-all"
              >
                Shop Now →
              </a>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`h-3 w-3 rounded-full transition-all ${
                currentSlide === index ? "bg-red-500 scale-125" : "bg-gray-300"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
