'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaShoppingCart } from 'react-icons/fa'
import { FiSearch, FiHeart } from 'react-icons/fi'
import logo2 from './../../../public/logo2.png'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="w-full fixed top-0 z-50 bg-white shadow-md">
      {/* Top Banner */}
      <div className="w-full bg-black text-white text-center py-2 text-sm">
        Wedding Sale For All Jewellery Products – OFF 50%!{' '}
        <Link href="/products" className="font-bold underline">
          Shop Now
        </Link>
      </div>

      {/* Main Navbar */}
      <div className="max-w-screen-xl px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image src={logo2} alt="Logo" width={74} height={12} priority />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex space-x-8 text-black font-medium">
          <li>
            <Link href="/products" className="hover:border-b-2 hover:border-black pb-1 transition">
              Products
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:border-b-2 hover:border-black pb-1 transition">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:border-b-2 hover:border-black pb-1 transition">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/register" className="hover:border-b-2 hover:border-black pb-1 transition">
              Sign Up
            </Link>
          </li>
        </ul>

        {/* Desktop Search, Wishlist, Cart Icons */}
        <div className="hidden lg:flex items-center space-x-6">
          <div className="relative">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="bg-gray-100 px-4 py-2 rounded-md text-sm w-64 outline-none"
            />
            <FiSearch className="absolute top-3 right-4 text-gray-500" />
          </div>
          <FiHeart className="text-2xl cursor-pointer" />
          <Link href="/cart" className="relative">
            <FaShoppingCart className="text-2xl cursor-pointer" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Icons & Hamburger */}
        <div className="lg:hidden flex items-center space-x-4">
          <FiHeart className="text-2xl cursor-pointer" />
          <Link href="/cart" className="relative">
            <FaShoppingCart className="text-2xl cursor-pointer" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button className="text-black p-2 focus:outline-none" onClick={toggleMenu}>
            <span className="block w-6 h-0.5 bg-black mb-1"></span>
            <span className="block w-6 h-0.5 bg-black mb-1"></span>
            <span className="block w-6 h-0.5 bg-black"></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-md absolute w-full left-0 top-full">
          <ul className="flex flex-col text-center text-black font-medium py-4 space-y-3">
            <li>
              <Link href="/products" className="block py-2 hover:bg-gray-100" onClick={() => setIsOpen(false)}>
                Products
              </Link>
            </li>
            <li>
              <Link href="/about" className="block py-2 hover:bg-gray-100" onClick={() => setIsOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="block py-2 hover:bg-gray-100" onClick={() => setIsOpen(false)}>
                Contact
              </Link>
            </li>
            <li>
              <Link href="/register" className="block py-2 hover:bg-gray-100" onClick={() => setIsOpen(false)}>
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar
