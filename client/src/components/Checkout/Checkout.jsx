"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const router = useRouter(); // Next.js router for redirection

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

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
  
    const orderData = {
      userId,
      items: cartItems.map(item => ({
        productId: item.id, // Yeh fix hai, "product" nahi, "productId" bhejna tha
        quantity: item.quantity,
        price: item.offerPrice,
      })),
      totalAmount: subtotal, // Yeh already sahi hai
    };
  
    try {
      const response = await axios.post("/api/booking", orderData);
      if (response.status === 200) {
        alert("Order placed successfully!");
        window.location.href = "/successful"; // Redirect after order placement
      }
    } catch (error) {
      console.error("Order Placement Error:", error);
      alert("Failed to place order. Please try again.");
    }
  };
  
  

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen">
      <nav className="text-gray-500 text-sm mb-4">
        <Link href="/account" className="hover:text-black">My Account</Link> /
        <Link href="/product" className="hover:text-black"> Product</Link> /
        <Link href="/cart" className="hover:text-black"> Cart</Link> /
        <span className="text-black font-semibold"> CheckOut</span>
      </nav>
      <h1 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">Billing Details</h1>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <form className="space-y-4 bg-white p-6 shadow-lg rounded-md">
            {["First Name", "Street Address", "Town/City", "State", "Pincode", "Phone Number", "Email Address"].map((label, index) => (
              <div key={index}>
                <label className="block font-semibold">{label}*</label>
                <input 
                  type="text" 
                  placeholder={label} 
                  className="w-full border border-gray-300 p-2 rounded-md focus:border-red-500 focus:outline-none" 
                />
              </div>
            ))}
          </form>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-3 border">Product</th>
                <th className="text-center p-3 border">Quantity</th>
                <th className="text-center p-3 border">Price</th>
                <th className="text-center p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="border border-gray-300">
                  <td className="flex items-center gap-3 p-3">
                    <Image src={item.image} alt={item.title} width={50} height={50} className="rounded-lg border" />
                    <span className="font-medium">{item.title}</span>
                  </td>
                  <td className="text-center p-3">
                    <div className="flex justify-center items-center space-x-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 bg-gray-200 rounded text-lg font-bold">-</button>
                      <span className="font-semibold text-lg">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 bg-gray-200 rounded text-lg font-bold">+</button>
                    </div>
                  </td>
                  <td className="text-center p-3 font-semibold text-lg">₹{item.offerPrice * item.quantity}</td>
                  <td className="text-center p-3">
                    <button onClick={() => removeItem(item.id)} className="text-red-500 text-xl">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6 space-y-2 text-lg border-t pt-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold">₹{subtotal}</span>
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
          <button 
            onClick={handlePlaceOrder} 
            className="w-full bg-red-500 text-white px-6 py-3 mt-6 rounded-md hover:bg-red-600 text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
