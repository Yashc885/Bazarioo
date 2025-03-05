"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId") || "67b96c13ceaa5650421786bb";
    setUserId(storedUserId);
  }, []);

  useEffect(() => {
    if (!userId) return;
  
    const fetchWishlist = async () => {
      try {
        const { data } = await axios.get(`/api/wishlist?userId=${userId}`);
  
        // Ensure the API response has `wishlist` and `products`
        if (!data?.wishlist || !Array.isArray(data.wishlist.products)) {
          throw new Error("Invalid wishlist response");
        }
  
        setWishlistItems(
          data.wishlist.products
            .filter((item) => item && item._id) // Ensure item is defined and has an ID
            .map((item) => ({
              id: item._id,
              title: item.title || "Unnamed Product",
              price: item.offerPrice || "N/A",
              image: item.images?.length ? item.images[0] : "/placeholder.jpg",
            }))
        );
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };
  
    fetchWishlist();
  }, [userId]);
  

  const removeFromWishlist = async (id) => {
    try {
      await axios.delete(`/api/wishlist?userId=${userId}&productId=${id}`);
      setWishlistItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-extrabold text-gray-800 mb-6">
        ❤️ Your Wishlist ({wishlistItems.length})
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-md relative">
            <button
              onClick={() => removeFromWishlist(item.id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
            <Image
              src={item.image}
              alt={item.title}
              width={100}
              height={100}
              className="rounded-lg"
            />
            <h2 className="font-bold text-lg mt-2 text-center">{item.title}</h2>
            <p className="text-gray-600 text-center">₹{item.price}</p>
            <Link href="/cart">
              <button className="w-full bg-black text-white px-4 py-2 rounded-lg mt-3 hover:bg-gray-800 transition">
                Add to Cart
              </button>
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link href="/">
          <button className="border border-gray-800 px-6 py-2 rounded-lg text-gray-800 hover:bg-gray-800 hover:text-white transition">
            Return To Shop
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Wishlist;
