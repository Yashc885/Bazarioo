"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiHome, FiShoppingCart, FiList, FiChevronDown } from "react-icons/fi";
import { MdCategory } from "react-icons/md";

const categories = [
  "All", "Clothing", "Beauty", "Watches", "Home", "Headphones", "Jewelleries",
  "Shoes", "Games", "Festive", "Spiritual", "Others"
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [showCategories, setShowCategories] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isOpen && !event.target.closest("#sidebar")) {
        toggleSidebar();
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isOpen]);

  return (
    <aside
      id="sidebar"
      className={`bg-white min-h-screen w-64 fixed top-0 left-0 transition-transform duration-300 shadow-lg z-50 
      ${isOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0 md:block`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <h1 className="text-xl font-bold">Bazario</h1>
        <button onClick={toggleSidebar} className="md:hidden text-xl">
          ×
        </button>
      </div>

      {/* Menu Items */}
      <nav className="mt-6">
        <ul>
          <li className="px-6 py-3 flex items-center gap-3 hover:bg-red-500 hover:text-white cursor-pointer">
            <Link href="/superuser/dashboard" className="flex items-center gap-3 w-full">
              <FiHome className="text-lg" /> Dashboard
            </Link>
          </li>
          <li
            className="px-6 py-3 flex items-center gap-3 hover:bg-red-500 hover:text-white cursor-pointer"
            onClick={() => setShowCategories(!showCategories)}
          >
            <FiShoppingCart className="text-lg" /> Products
            <FiChevronDown className="ml-auto cursor-pointer" />
          </li>

          {/* Categories */}
          {showCategories && (
            <>
              <li className="border-t border-gray-300 px-6 py-3 flex items-center gap-3 text-gray-600 cursor-pointer">
                <MdCategory className="text-lg text-black" /> Categories
              </li>
              <ul className="pl-10">
                {categories.map((category, index) => (
                  <li key={index} className="px-6 py-2 hover:bg-red-500 hover:text-white cursor-pointer">
                    <Link href={`/superuser/product?category=${category}`}>
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}

          <li className="px-6 py-3 flex items-center gap-3 hover:bg-red-500 hover:text-white cursor-pointer">
            <Link href="/superuser/order" className="flex items-center gap-3 w-full">
              <FiList className="text-lg" /> Order List
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
