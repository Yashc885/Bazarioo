"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaRegCreditCard } from "react-icons/fa";
import mobile from "@/assets/Today/mobile.jpg";
import Link from "next/link";

const initialCartItems = [
  { id: 1, name: "LCD Monitor", price: 650, image: mobile },
  { id: 2, name: "HI Gamepad", price: 1100, image: mobile },
];

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const subtotal = initialCartItems.reduce((acc, item) => acc + item.price, 0);
  const shipping = "Free";
  const total = subtotal;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Breadcrumb with Links */}
      <nav className="text-gray-500 text-sm mb-4">
        <Link href="/account" className="hover:text-black">My Account</Link> / 
        <Link href="/product" className="hover:text-black"> Product</Link> / 
        <Link href="/cart" className="hover:text-black"> Cart</Link> / 
        <span className="text-black font-semibold"> CheckOut</span>
      </nav>

      <h1 className="text-2xl font-extrabold text-gray-800 mb-6">Billing Details</h1>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Billing Form */}
        <div>
          <form className="space-y-4">
            {[
              { label: "First Name*", required: true },
              { label: "Street Address*", required: true },
              { label: "Apartment, floor, etc. (optional)", required: false },
              { label: "Town/City*", required: true },
              { label: "State*", required: true },
              { label: "Pincode*", required: true },             
              { label: "Phone Number*", required: true },
              { label: "Email Address*", required: true }
            ].map(({ label, required }, index) => (
              <div key={index}>
                <label className="block font-semibold">
                  <span className={required ? "text-black" : ""}>{label}</span>
                </label>
                <input 
                  type="text" 
                  placeholder={label.replace("*", "").trim()} 
                  className="w-full border border-black p-2 rounded-md placeholder-gray-400" 
                />
              </div>
            ))}
          </form>
        </div>

        {/* Cart Summary & Payment Section */}
        <div>
          {/* Cart Items */}
          <div className="bg-white p-6">
            {initialCartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <Image src={item.image} alt={item.name} width={50} height={50} className="rounded-lg" />
                  <span className="font-medium">{item.name}</span>
                </div>
                <span className="font-semibold">${item.price}</span>
              </div>
            ))}
            <hr />

            {/* Price Summary */}
            <div className="mt-4 space-y-2 text-lg">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="text-green-600 font-semibold">{shipping}</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-xl">
                <span>Total:</span>
                <span>${total}</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
              <div className="space-y-2">
              </div>
            </div>
            {/* Place Order Button */}
            <button className="w-full bg-red-500 text-white px-6 py-3 mt-6 rounded-md hover:bg-red-600 text-lg">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
