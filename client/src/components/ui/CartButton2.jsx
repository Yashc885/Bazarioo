"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function CartButton2({ product }) {
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
    <Link href="/cart">
      <button
        onClick={handleAddToCart}
        className={`bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition flex items-center gap-2 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        <ShoppingCart size={18} />
        {loading ? "Adding..." : added ? "Added!" : "Add to Cart"}
      </button>
    </Link>
  );
}
