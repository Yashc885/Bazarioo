'use client';
import Link from "next/link";
import { FiPhone, FiMail } from "react-icons/fi"; // Importing icons

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-16 py-8 lg:py-16">
      {/* Breadcrumb - Aligned Left */}
      <nav className="text-gray-500 text-sm mb-6">
        <Link href="/" className="hover:text-black">Home</Link> /
        <span className="text-black font-semibold"> Contact</span>
      </nav>

      {/* Contact Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 lg:py-12">
        {/* Left Section - Contact Info */}
        <div className="bg-white shadow-md rounded-lg p-6 border">
          {/* Call Us */}
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-red-500 text-white flex items-center justify-center rounded-full">
              <FiPhone size={24} />
            </div>
            <div className="ml-4">
              <h2 className="font-semibold text-lg py-2">Call To Us</h2>
              <p className="text-gray-500 text-sm mt-1 py-2">
                We are available 24/7, 7 days a week.
              </p>
              <p className="font-medium pb-2">Phone: +8801611122222</p>
            </div>
          </div>
          <hr className="border-gray-300" />

          {/* Write to Us */}
          <div className="flex items-center mt-6">
            <div className="w-12 h-12 bg-red-500 text-white flex items-center justify-center rounded-full">
              <FiMail size={24} />
            </div>
            <div className="ml-4">
              <h2 className="font-semibold text-lg py-2">Write To Us</h2>
              <p className="text-gray-500 text-sm mt-1">
                Fill out our form and we will contact you within 24 hours.
              </p>
              {/* Emails with Circular Background */}
              <div className="mt-2 flex flex-col space-y-2">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-red-500 text-white flex items-center justify-center rounded-full">
                    <FiMail size={18} />
                  </div>
                  <p className="font-medium ml-3">customer@exclusive.com</p>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-red-500 text-white flex items-center justify-center rounded-full">
                    <FiMail size={18} />
                  </div>
                  <p className="font-medium ml-3">support@exclusive.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Contact Form */}
        <div className="md:col-span-2 bg-white shadow-md rounded-lg p-8 border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
            <input
              type="text"
              placeholder="Your Name *"
              className="border rounded-md px-4 py-3 w-full focus:ring-2 focus:ring-red-400 outline-none bg-gray-100"
            />
            <input
              type="email"
              placeholder="Your Email *"
              className="border rounded-md px-4 py-3 w-full focus:ring-2 focus:ring-red-400 outline-none bg-gray-100"
            />
            <input
              type="tel"
              placeholder="Your Phone *"
              className="border rounded-md px-4 py-3 w-full focus:ring-2 focus:ring-red-400 outline-none bg-gray-100"
            />
          </div>
          <textarea
            placeholder="Your Message"
            className="border rounded-md px-4 py-3 w-full h-48 mt-4 focus:ring-2 focus:ring-red-400 outline-none bg-gray-100"
          ></textarea>
          <div className="flex justify-center md:justify-end py-4">
            <button className="w-[200px] bg-red-500 text-white text-lg rounded-lg py-3 hover:bg-red-600 transition">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
