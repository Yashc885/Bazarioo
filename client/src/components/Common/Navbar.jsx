'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaShoppingCart } from 'react-icons/fa'
import { FiSearch, FiHeart } from 'react-icons/fi'
import { BiUser, BiLogOut } from 'react-icons/bi'
import { AiOutlineShopping } from 'react-icons/ai'
import { MdFavorite } from 'react-icons/md'
import Cookies from 'js-cookie'
import logo2 from './../../../public/logo2.png'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0) // Initialize cart count
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check login state
    const checkLoginStatus = () => {
      const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true'
      setIsLoggedIn(loggedInStatus)
    }

    // Fetch cart quantity from localStorage
    const fetchCartQuantity = () => {
      const cartQty = localStorage.getItem('cartQty')
      setCartCount(cartQty ? parseInt(cartQty, 10) : 0)
    }

    checkLoginStatus()
    fetchCartQuantity()

    // Listen for localStorage changes (optional, useful for real-time updates)
    const handleStorageChange = () => {
      checkLoginStatus()
      fetchCartQuantity()
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen)

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userId')
    Cookies.remove('authToken')
    setIsLoggedIn(false)
    setDropdownOpen(false)
    window.location.reload()
  }

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
      <div className="max-w-screen-xl mx-auto px-6 flex justify-between items-center py-4">
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
          {!isLoggedIn && (
            <li>
              <Link href="/register" className="hover:border-b-2 hover:border-black pb-1 transition">
                Sign Up
              </Link>
            </li>
          )}
        </ul>

        {/* Desktop Icons & User Dropdown */}
        <div className="hidden lg:flex items-center space-x-6 relative">
          <div className="relative">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="bg-gray-100 px-4 py-2 rounded-md text-sm w-64 outline-none"
            />
            <FiSearch className="absolute top-3 right-4 text-gray-500" />
          </div>
          <Link href="/wishlist">
            <FiHeart className="text-2xl cursor-pointer" />
          </Link>
          <Link href="/cart" className="relative">
            <FaShoppingCart className="text-2xl cursor-pointer" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Icon & Dropdown */}
          {isLoggedIn && (
            <div className="relative">
              <button onClick={toggleDropdown} className="relative">
                <BiUser className="text-2xl cursor-pointer text-white bg-red-500 rounded-full p-1" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gradient-to-b from-black/30 to-black/70 backdrop-blur-2xl shadow-lg rounded-lg overflow-hidden z-50">
                  <ul className="text-white text-sm">
                    <li className="px-4 py-2 flex items-center hover:text-black">
                      <AiOutlineShopping className="mr-2" /> My Orders
                    </li>
                    <li className="px-4 py-2 flex items-center hover:text-black">
                      <FaShoppingCart className="mr-2" /> My Cart
                    </li>
                    <li className="px-4 py-2 flex items-center hover:text-black">
                      <MdFavorite className="mr-2" /> My Liked
                    </li>
                    <li
                      className="px-4 py-2 flex items-center hover:text-red-600 cursor-pointer text-red-400"
                      onClick={handleLogout}
                    >
                      <BiLogOut className="mr-2" /> Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu */}
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

          {/* User Icon & Dropdown */}
          {isLoggedIn && (
            <div className="relative">
              <button onClick={toggleDropdown} className="relative">
                <BiUser className="text-2xl cursor-pointer text-white bg-red-500 rounded-full p-1" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-gradient-to-b from-black/30 to-black/70 shadow-lg rounded-lg overflow-hidden z-50">
                  <ul className="text-white text-sm">
                    <li className="px-4 py-2 flex items-center hover:text-black">
                      <AiOutlineShopping className="mr-2" /> My Orders
                    </li>
                    <li className="px-4 py-2 flex items-center hover:text-black">
                      <FaShoppingCart className="mr-2" /> My Cart
                    </li>
                    <li className="px-4 py-2 flex items-center hover:text-black">
                      <MdFavorite className="mr-2" /> My Liked
                    </li>
                    <li
                      className="px-4 py-2 flex items-center hover:text-red-600 cursor-pointer text-red-400"
                      onClick={handleLogout}
                    >
                      <BiLogOut className="mr-2" /> Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
