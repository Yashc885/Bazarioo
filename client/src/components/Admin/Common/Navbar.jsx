"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";

const categories = [
  "All", "Clothing", "Beauty", "Watches", "Home", "Headphones",
  "Jewelleries", "Shoes", "Games", "Festive", "Spiritual", "Others"
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  return (
    <nav className="bg-gray-100 px-6 py-3 flex justify-between items-center shadow-md fixed top-0 w-full z-50">
      {/* Logo */}
      <div className="w-20">
        <Image src="/logo2.png" alt="Logo" width={80} height={40} className="object-contain" />
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        <Link href="/superuser/dashboard" className="text-gray-700 font-semibold hover:text-red-500">Dashboard</Link>
        <Link href="/superuser/today" className="text-gray-700 font-semibold hover:text-red-500">Todays</Link>
        <Link href="/superuser/grev" className="text-gray-700 font-semibold hover:text-red-500">Greviance</Link>
        <div className="relative">
          <button
            onClick={() => setShowCategories(!showCategories)}
            className="text-gray-700 font-semibold hover:text-red-500 flex items-center gap-1"
          >
            Products <FiChevronDown className={`transition-transform ${showCategories ? "rotate-180" : ""}`} />
          </button>
          {showCategories && (
            <div className="absolute top-10 left-0 bg-white shadow-md rounded-lg p-2 w-60">
              {categories.map((category, index) => (
                <Link 
                  key={index} 
                  href={category === "All" ? "/superuser/product" : `/superuser/product?category=${category}`}
                  className="block px-4 py-2 hover:text-red-500 text-gray-700"
                >
                  {category}
                </Link>
              ))}
            </div>
          )}
        </div>
        <Link href="/superuser/order" className="text-gray-700 font-semibold hover:text-red-500">Orders</Link>
      </div>

      {/* Mobile Menu Button */}
      <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-2xl">
        {isMobileMenuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg md:hidden">
          <Link href="/superuser/dashboard" className="block px-6 py-3 text-gray-700 hover:text-red-500">Dashboard</Link>
          <button
            onClick={() => setShowCategories(!showCategories)}
            className="w-full text-left px-6 py-3 text-gray-700 hover:text-red-500 flex justify-between"
          >
            Products <FiChevronDown className={`transition-transform ${showCategories ? "rotate-180" : ""}`} />
          </button>
          {showCategories && (
            <div className="bg-gray-100">
              {categories.map((category, index) => (
                <Link 
                  key={index} 
                  href={category === "All" ? "/superuser/product" : `/superuser/product?category=${category}`}
                  className="block px-10 py-2 text-gray-700 hover:text-red-500"
                >
                  {category}
                </Link>
              ))}
            </div>
          )}
          <Link href="/superuser/order" className="block px-6 py-3 text-gray-700 hover:text-red-500">Orders</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
