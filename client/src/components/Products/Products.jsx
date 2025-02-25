"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa";
import { FiFilter } from "react-icons/fi"; // Filter Icon

import mobile from "@/assets/Today/mobile.jpg";

const categories = [
  "All", "Clothing", "Beauty", "Watches", "Home", "Headphones", "Jewelleries",
  "Shoes", "Games", "Festive", "Spiritual", "Others"
];

const products = [
  { id: 1, name: "Gradient Graphic T-shirt", price: 145, originalPrice: 200, discount: 30, category: "Clothing", image: mobile },
  { id: 2, name: "Polo with Tipping Details", price: 180, originalPrice: 250, discount: 20, category: "Clothing", image: mobile },
  { id: 3, name: "Black Striped T-shirt", price: 120, originalPrice: 180, discount: 15, category: "Clothing", image: mobile },
  { id: 4, name: "Skinny Fit Jeans", price: 240, originalPrice: 300, discount: 25, category: "Clothing", image: mobile },
];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const router = useRouter();

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "All" || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* 🔥 Search Bar + Filter (Hidden on Laptop, Visible on Mobile) */}
      <div className="sticky top-0 bg-white z-10 p-2 shadow-md flex items-center justify-between gap-2 md:gap-4 md:hidden">
        {/* 🔍 Search Bar */}
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border rounded-full w-full md:w-72 text-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* 🎛️ Filter Button (Only on Mobile) */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="p-2 border rounded-md text-sm flex items-center gap-1"
        >
          <FiFilter className="text-gray-500" /> Filter
        </button>
      </div>

      {/* 📌 Categories (Always visible on Desktop, Toggled on Mobile) */}
      <div
        className={`bg-white  p-2 mt-2 ${showFilters ? "block" : "hidden"} md:flex md:items-center md:gap-3 md:mt-2`}
      >
        <div className="flex gap-3 whitespace-nowrap overflow-x-scroll scrollbar-hide md:flex-wrap md:overflow-hidden sm:pb-2">
          {categories.map((category) => (
            <Link key={category} href={`/products?category=${encodeURIComponent(category)}`}>
              <button
                className={`px-4 py-2 text-sm rounded-lg ${
                  selectedCategory === category ? "bg-red-600 text-white" : "bg-gray-100 text-red-600"
                }`}
                onClick={() => {
                  setSelectedCategory(category);
                  setShowFilters(false);
                  router.push(`/products?category=${encodeURIComponent(category)}`);
                }}
              >
                {category}
              </button>
            </Link>
          ))}
        </div>
      </div>

      {/* 🛍️ Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link key={product.id} href="/productDetails">
              <div className="relative border p-4 rounded-lg shadow-sm hover:shadow-md transition bg-white cursor-pointer">
                
                {/* 🔖 Discount Badge */}
                <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
                  -{product.discount}%
                </span>

                {/* ❤️ Wishlist Button */}
                <div className="absolute top-2 right-2">
                  <FaHeart className="text-gray-500 hover:text-red-500 cursor-pointer transition" />
                </div>

                {/* 🖼️ Product Image */}
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  width={200} 
                  height={350} 
                  className="w-full h-40 object-cover mb-4 rounded-md"
                  unoptimized
                />

                {/* 🏷️ Product Info */}
                <h3 className="text-sm font-semibold">{product.name}</h3>
                <div className="text-red-500 font-bold">
                  ${product.price} <span className="text-gray-400 line-through">${product.originalPrice}</span>
                </div>
                
                {/* 🏷️ Category Name */}
                <span className="text-xs text-gray-500">{product.category}</span>

                {/* 🛒 Add to Cart Button */}
                <button className="w-full bg-black text-white py-2 mt-2 rounded-md text-lg font-semibold hover:bg-gray-700 transition">
                  Add To Cart
                </button>
              </div>
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
}
