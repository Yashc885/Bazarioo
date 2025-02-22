import Link from 'next/link'
import { FiSend } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-6">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-sm">
        {/* Exclusive (Subscription Section) */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Exclusive</h3>
          <p className="mb-2">Subscribe</p>
          <p className="mb-4">Get 10% off your first order</p>
          <div className="flex items-center border border-gray-500 rounded-md overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-black text-white px-3 py-2 w-full focus:outline-none"
            />
            <button className="bg-white text-black p-3">
              <FiSend />
            </button>
          </div>
        </div>

        {/* Support Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
          <p className="mt-2">exclusive@gmail.com</p>
          <p className="mt-2">+88015-88888-9999</p>
        </div>

        {/* Account Section (Hidden on Mobile, Visible on Larger Screens) */}
        <div className="hidden lg:block"> 
          <h3 className="text-lg font-semibold mb-3">Account</h3>
          <ul className="space-y-2">
            <li><Link href="/account" className="hover:underline">My Account</Link></li>
            <li><Link href="/login" className="hover:underline">Login / Register</Link></li>
            <li><Link href="/cart" className="hover:underline">Cart</Link></li>
            <li><Link href="/wishlist" className="hover:underline">Wishlist</Link></li>
            <li><Link href="/shop" className="hover:underline">Shop</Link></li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Link</h3>
          <ul className="space-y-2">
            <li><Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:underline">Terms Of Use</Link></li>
            <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Duplicate Quick Links Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Link</h3>
          <ul className="space-y-2">
            <li><Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:underline">Terms Of Use</Link></li>
            <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-10 text-center text-gray-400 text-xs">
        © Copyright Rimel 2022. All rights reserved
      </div>
    </footer>
  )
}

export default Footer
