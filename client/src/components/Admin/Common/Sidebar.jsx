"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Correct import for Next.js 13+
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

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    if (menu !== "products") {
      setShowCategories(false);
    }
  };

  return (
    <aside
      className={`bg-white min-h-screen w-64 fixed left-0 top-0 transition-all duration-300 shadow-lg 
      ${isOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0`}
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
          <li 
            className="px-6 py-3 flex items-center gap-3 hover:bg-red-500 hover:text-white cursor-pointer"
            onClick={() => handleMenuClick("dashboard")}
          >
            <Link href="/superuser/dashboard" className="flex items-center gap-3 w-full">
              <FiHome className="text-lg" /> Dashboard
            </Link>
          </li>
          <li 
            className="px-6 py-3 flex items-center gap-3 hover:bg-red-500 hover:text-white cursor-pointer"
            onClick={() => { handleMenuClick("products"); setShowCategories(!showCategories); }}
          >
            <Link href="/superuser/product" className="flex items-center gap-3 w-full">
              <FiShoppingCart className="text-lg" /> All Products
            </Link>
            <FiChevronDown className="ml-auto cursor-pointer" onClick={() => setShowCategories(!showCategories)} />
          </li>
          <li 
            className="px-6 py-3 flex items-center gap-3 hover:bg-red-500 hover:text-white cursor-pointer"
            onClick={() => handleMenuClick("orders")}
          >
            <Link href="/superuser/order" className="flex items-center gap-3 w-full">
              <FiList className="text-lg" /> Order List
            </Link>
          </li>
          
          {/* Categories Section */}
          {showCategories && selectedMenu === "products" && (
            <>
              <li className="border-t border-gray-300 px-6 py-3 flex items-center gap-3 text-gray-600 cursor-pointer">
                <MdCategory className="text-lg text-black" /> Categories
              </li>
              <ul className="pl-10">
                {categories.map((category, index) => (
                  <li 
                    key={index} 
                    className="px-6 py-2 hover:bg-red-500 hover:text-white cursor-pointer"
                  >
                    <Link href={`/superuser/product?category=${category}`}>
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
