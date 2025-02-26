"use client";

import Image from "next/image";
import { FiMenu } from "react-icons/fi";
import { MdArrowDropDown } from "react-icons/md";

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="bg-gray-100 px-6 py-3 flex justify-between items-center shadow-md">
      {/* Left - Sidebar Toggle */}
      <button onClick={toggleSidebar} className="text-gray-700 text-2xl md:hidden">
        <FiMenu />
      </button>

      {/* Admin Dropdown */}
      <div className="relative flex items-center gap-4">

        {/* Logo */}
        <div className="w-20">
          <Image src="/logo2.png" alt="Logo" width={80} height={40} className="object-contain" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
