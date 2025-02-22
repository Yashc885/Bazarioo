'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaUserCircle } from 'react-icons/fa'
import logo1 from './../../../public/logo1.png' // Import logo

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen)

  return (
    <nav className="bg-gradient-to-r from-black to-gray-800 text-white fixed w-full z-50 shadow-md">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src={logo1} alt="Logo" width={56} height={56} className="h-14 w-14" priority />
        </Link>

        {/* Hamburger Icon */}
        <button 
          className="lg:hidden text-white p-2 focus:outline-none" 
          onClick={toggleMenu} 
          aria-expanded={isOpen} 
          aria-label="Toggle navigation"
        >
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </button>

        {/* Navbar Links */}
        <div className={`lg:flex lg:items-center lg:space-x-8 ${isOpen ? 'block' : 'hidden'} lg:block`}>
          <ul className="flex flex-col lg:flex-row lg:space-x-8 items-center">
            {['Home', 'About', 'Services', 'Contact'].map((item) => (
              <li key={item}>
                <Link 
                  href={`/${item.toLowerCase()}`} 
                  className="text-lg hover:text-yellow-400 transition duration-300"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          {/* Avatar & Dropdown */}
          <div className="relative mt-4 lg:mt-0">
            <button 
              onClick={toggleDropdown} 
              className="text-white p-2 rounded-full focus:outline-none"
            >
              <FaUserCircle className="text-3xl" />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 bg-gray-800 rounded-lg shadow-lg mt-2 w-48">
                <ul className="text-white py-2">
                  {['Login', 'Register'].map((option) => (
                    <li key={option}>
                      <Link 
                        href={`/${option.toLowerCase()}`} 
                        className="block px-4 py-2 text-lg hover:bg-yellow-400 transition duration-300"
                      >
                        {option}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
