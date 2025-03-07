"use client";
import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaChevronRight } from "react-icons/fa";

const categories = [
  "Clothing", "Beauty", "Watches", "Home", "Jewelleries",
  "Festive", "Spiritual"
];

const Sidebar = () => {
  const [active, setActive] = useState(null);
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") || "";

  return (
    <aside className="hidden lg:block w-64 bg-white p-4 border-r py-12">
      <ul className="space-y-3 text-base font-medium">
        {categories.map((category, index) => (
          <li
            key={index}
            className="flex items-center justify-between px-4 py-2 cursor-pointer transition"
            onMouseEnter={() => setActive(index)}
            onMouseLeave={() => setActive(null)}
          >
            <Link href={`/products?category=${encodeURIComponent(category)}`} className="w-full flex justify-between items-center">
              <span className={`hover:border-b-2 hover:border-black ${selectedCategory === category ? "font-bold" : ""}`}>
                {category}
              </span>
              <FaChevronRight className={`text-xs transition ${active === index ? "text-black" : "text-gray-500"}`} />
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
