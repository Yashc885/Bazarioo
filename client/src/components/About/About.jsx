'use client';
import Image from "next/image";
import Link from "next/link";
import { FiShoppingBag, FiUsers, FiDollarSign } from "react-icons/fi";
import AboutUs from './../../assets/About/AboutUs.jpg';
const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-16 py-8 lg:py-16">
      {/* Breadcrumb */}
      <nav className="text-gray-500 text-sm mb-6">
        <Link href="/" className="hover:text-black">Home</Link> /
        <span className="text-black font-semibold"> About</span>
      </nav>

      {/* About Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left Side - Text Content */}
        <div>
        <div className="flex items-center mb-4">
            <div className="bg-red-500 w-2 h-6 rounded-full mr-2"></div>
            <h2 className="text-red-500 font-semibold">Today's</h2>
        </div>
          <p className="text-gray-600 leading-relaxed">
            Launched in 2015, Exclusive is South Asia’s premier online shopping marketplace with an active presence in Bangladesh. Supported by a wide range of tailored marketing, data, and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 million customers across the region.
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            Exclusive has more than 1 Million products to offer, growing at a very fast rate. Exclusive offers a diverse assortment in categories ranging from consumer goods to lifestyle products.
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="flex justify-center">
          <Image
            src= {AboutUs} 
            alt="Shopping"
            width={500}
            height={350}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center mt-12 py-6 lg:py-10 " >
        {/* Sellers Card */}
        <div className="border rounded-lg p-6 shadow-md">
          <FiUsers className="text-3xl text-gray-700 mx-auto mb-3" />
          <h3 className="text-2xl font-semibold">10.5k</h3>
          <p className="text-gray-500">Sellers active on our site</p>
        </div>

        {/* Monthly Sales Card - Highlighted in Red */}
        <div className="bg-red-500 text-white border rounded-lg p-6 shadow-md">
          <FiShoppingBag className="text-3xl mx-auto mb-3" />
          <h3 className="text-2xl font-semibold">33k</h3>
          <p className="text-white">Monthly Product Sale</p>
        </div>

        {/* Customers Card */}
        <div className="border rounded-lg p-6 shadow-md">
          <FiUsers className="text-3xl text-gray-700 mx-auto mb-3" />
          <h3 className="text-2xl font-semibold">45.5k</h3>
          <p className="text-gray-500">Customer active in our site</p>
        </div>
      </div>
    </div>
  );
};

export default About;
