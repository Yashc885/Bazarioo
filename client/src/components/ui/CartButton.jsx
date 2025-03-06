"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function CartButton({ product }) {
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const router = useRouter();

  const handleAddToCart = async () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userId = localStorage.getItem("userId");

    if (!isLoggedIn || !userId) {
      router.push("/login");
      return;
    }

    if (loading) return; // Prevent duplicate clicks
    setLoading(true);
    setAdded(false);

    try {
      const response = await axios.post("/api/cart", {
        userId,
        products: [{ productId: product._id, quantity: 1 }],
      });

      if (response.status === 200) {
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
      }
    } catch (error) {
      console.error("Cart Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`w-full py-2 mt-2 rounded-md text-lg font-semibold transition ${
        added ? "bg-green-500 text-white" : "bg-black text-white hover:bg-gray-600"
      }`}
    >
      {loading ? "Adding..." : added ? "Added!" : "Add To Cart"}
    </button>
  );
}
