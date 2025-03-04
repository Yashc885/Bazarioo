"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaRegCreditCard, FaTrash } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId") || "67b96c13ceaa5650421786bb";
    setUserId(storedUserId);
  }, []);

  useEffect(() => {
    if (!userId) return;
    
    const fetchCart = async () => {
      try {
        const { data } = await axios.get(`/api/cart?userId=${userId}`);
        setCartItems(
          data.cart.products.map((item) => ({
            id: item.product._id,
            title: item.product.title,
            offerPrice: item.product.offerPrice,
            quantity: item.quantity,
            image: item.product.images?.length ? item.product.images[0] : "placeholder.jpg",
          }))
        );
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    
    fetchCart();
  }, [userId]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.offerPrice * item.quantity, 0);
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
        <div>
          <form className="space-y-4">
            {["First Name", "Street Address", "Town/City", "State", "Pincode", "Phone Number", "Email Address"].map((label, index) => (
              <div key={index}>
                <label className="block font-semibold">{label}*</label>
                <input 
                  type="text" 
                  placeholder={label} 
                  className="w-full border border-black p-2 rounded-md placeholder-gray-400" 
                />
              </div>
            ))}
          </form>
        </div>

        <div>
          <div className="bg-white p-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <Image src={item.image} alt={item.title} width={50} height={50} className="rounded-lg" />
                  <span className="font-medium">{item.title} (x{item.quantity})</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                  <button onClick={() => removeItem(item.id)} className="text-red-500"><FaTrash /></button>
                </div>
                <span className="font-semibold">₹{item.offerPrice * item.quantity}</span>
              </div>
            ))}
            <hr />

            <div className="mt-4 space-y-2 text-lg">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="text-green-600 font-semibold">{shipping}</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-xl">
                <span>Total:</span>
                <span>₹{total}</span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={() => setPaymentMethod("cash")}
                  />
                  <span>Cash on Delivery</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                  />
                  <span className="flex items-center gap-2">
                    <FaRegCreditCard /> Credit/Debit Card
                  </span>
                </label>
              </div>
            </div>

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
