'use client';
import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";

const categories = [
  "Jewelleries",
  "Electronics & Watches",
  "Home & Lifestyle",
  "Clothing",
  "Games & Sports",
  "Health & Beauty",
  "Others",
];

const Sidebar = () => {
  const [active, setActive] = useState(null);

  return (
    <aside className="hidden lg:block w-64 bg-white p-4 border-r">
      <ul className="space-y-3 text-base font-medium">
        {categories.map((category, index) => (
          <li
            key={index}
            className="flex items-center justify-between px-4 py-2 cursor-pointer pb-1 transition"
            onMouseEnter={() => setActive(index)}
            onMouseLeave={() => setActive(null)}
          >
            <span className="hover:border-b-2 hover:border-black">{category}</span>
            <FaChevronRight
              className={`text-xs transition ${
                active === index ? "text-black" : "text-gray-500"
              }`}
            />
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
