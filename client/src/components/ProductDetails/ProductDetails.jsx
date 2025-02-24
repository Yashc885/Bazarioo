"use client";
import { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Truck, Globe, BadgeCheck, RotateCw } from "lucide-react"; // Icons
import mobile from "@/assets/Today/mobile.jpg";
import Link from "next/link";
const ProductDetails = () => {
  const [selectedMedia, setSelectedMedia] = useState(mobile); // Default selected media
  const [quantity, setQuantity] = useState(1);
  const price = 192.0; // Base price

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="container mx-auto p-4 md:p-8 lg:p-12  ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Side - Image Gallery */}
        <div className="flex gap-4">
          {/* Thumbnails */}
          <div className="flex flex-col gap-4">
            {[mobile, mobile, mobile, mobile, mobile].map((media, index) => (
              <div
                key={index}
                className={`cursor-pointer border-2 p-1  transition-all duration-300 ${
                  selectedMedia === media ? " scale-110" : "border-gray-300 hover:scale-105"
                }`}
                onClick={() => setSelectedMedia(media)}
              >
                <Image src={media} alt={`Thumbnail ${index}`} width={80} height={80} className="rounded-lg" />
              </div>
            ))}
          </div>

          {/* Large Image */}
          <div className="flex-1">
            <Image
              src={selectedMedia}
              alt="Selected Product"
              width={500}
              height={500}
              className="rounded-lg  transition-transform duration-300"
            />
          </div>
        </div>

        {/* Right Side - Product Details */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-red-600">Havic HV G-92 Gamepad</h1>
          <p className="text-lg font-semibold text-gray-700">${price.toFixed(2)}</p>

          <p className="text-gray-600 text-sm">
            Experience precise control and seamless gameplay with the Havic HV G-92 Gamepad. Designed for competitive gaming,
            this ergonomic controller offers <strong>zero-lag response</strong>, <strong>textured grip</strong> for comfort, and
            <strong>adaptive triggers</strong> to enhance gameplay. Compatible with multiple platforms, it's built for intense sessions.
          </p>

          {/* Quantity & Total Price */}
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="flex border rounded-md">
                <button onClick={decreaseQuantity} className="px-4 py-2 border-r hover:bg-gray-200 transition">
                  -
                </button>
                <span className="px-4 py-2">{quantity}</span>
                <button onClick={increaseQuantity} className="px-4 py-2 border-l hover:bg-gray-200 transition">
                  +
                </button>
              </div>
            </div>

            {/* Total Price Box */}
            <div className="p-2 border rounded-md bg-gray-100 w-fit ">
              <strong>Total Price:</strong> ${Number(price * quantity).toFixed(2)}
            </div>
            <div className="mt-4">
            <Link href="/cart">
                <button className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition flex items-center gap-2">
                <ShoppingCart size={18} />
                Add to Cart
                </button>
            </Link>
            </div>

          </div>

          {/* Delivery & Return Info */}
          <div className="border p-4 rounded-lg space-y-2 bg-white shadow-md">
            <div className="flex items-center gap-2">
                <Truck size={20} className="text-blue-500" />
                <p><strong>Fast Delivery</strong> - Get your order as quickly as possible.</p>
            </div>
                <div className="flex items-center gap-2">
                    <Globe size={20} className="text-purple-500" />
                    <p><strong>Delivery Everywhere</strong> - We ship to all locations worldwide.</p>
                </div>
                <div className="flex items-center gap-2">
                    <BadgeCheck size={20} className="text-green-500" />
                    <p><strong>High-Quality Product</strong> - Guaranteed premium build and durability.</p>
                </div>
                <div className="flex items-center gap-2">
                    <RotateCw size={20} className="text-green-500" />
                    <p><strong>30-Day Free Returns</strong> - Hassle-free, easy returns.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
