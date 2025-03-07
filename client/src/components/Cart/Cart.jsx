"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import mobile from "@/assets/Today/mobile.jpg";
import Link from "next/link";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId") || "67b96c13ceaa5650421786bb";
    setUserId(storedUserId);
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchCart = async () => {
      try {
        const { data } = await axios.get(`/api/cart?userId=${userId}`);
        const items = data.cart.products.map((item) => ({
          id: item.product._id,
          title: item.product.title || "Unnamed Product",
          price: item.product.offerPrice,
          quantity: item.quantity,
          image: item.product.images?.length ? item.product.images[0] : mobile,
        }));

        setCartItems(items);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, [userId]);

  // ✅ Remove product from cart and update cartQty
  const removeItem = async (id) => {
    try {
      await axios.delete(`/api/cart?userId=${userId}&productId=${id}`);
      const updatedCart = cartItems.filter((item) => item.id !== id);
      setCartItems(updatedCart);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // ✅ Update product quantity and cartQty
  const updateQuantity = async (id, newQuantity) => {
    try {
      await axios.put(`/api/cart`, {
        userId,
        products: [{ productId: id, quantity: newQuantity }],
      });

      setCartItems((prevCart) =>
        prevCart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // ✅ Calculate total cart quantity
  useEffect(() => {
    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    localStorage.setItem("cartQty", totalQuantity);
  }, [cartItems]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="p-6 max-w-5xl mx-auto py-16">
      <h1 className="text-2xl font-extrabold text-gray-800 mb-6">🛒 Your Shopping Cart</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cartItems.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4">
            <Image
              src={item.image}
              alt={item.name || "Product image"} 
              width={80}
              height={80}
              className="rounded-lg"
            />
            <div className="flex-1">
              <h2 className="font-bold text-lg">{item.title}</h2>
              <p className="text-gray-600">₹{item.price}</p>
              <div className="flex items-center gap-2 mt-2">
                <select
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="border p-1 rounded-md"
                >
                  {[...Array(10).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                </select>
                <p className="font-semibold">Total: ₹{item.price * item.quantity}</p>
              </div>
            </div>
            <button onClick={() => removeItem(item.id)}>
              <FaTrash className="text-red-500 hover:text-red-700 text-lg" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <Link href="/">
          <button className="border border-gray-800 px-6 py-2 rounded-lg text-gray-800 hover:bg-gray-800 hover:text-white transition">
            Return To Shop
          </button>
        </Link>
        <div className="border p-6 rounded-lg shadow-md w-full md:max-w-xs text-lg bg-gray-50">
          <h2 className="font-semibold mb-2">Cart Summary</h2>
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Shipping:</span>
            <span className="text-green-600 font-semibold">Free</span>
          </div>
          <hr className="my-3" />
          <div className="flex justify-between text-xl font-bold">
            <span>Total:</span>
            <span>₹{subtotal}</span>
          </div>
          <Link href="/checkout">
            <button className="w-full bg-red-500 text-white px-6 py-3 mt-4 rounded-lg hover:bg-red-600 transition text-lg">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
