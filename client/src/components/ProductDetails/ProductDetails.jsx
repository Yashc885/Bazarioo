"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Truck, Globe, BadgeCheck, RotateCw } from "lucide-react";
import Link from "next/link";
import CartButton2 from "./../ui/CartButton2";

const fallbackImage = "/images/default-product.jpg";

const ProductDetails = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(fallbackImage);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/product/${productId}`);
        if (!res.ok) throw new Error("Failed to fetch product");

        const data = await res.json();
        setProduct(data);
        setSelectedMedia(data.images?.[0] || fallbackImage);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!product) return <p>No product found</p>;

  return (
    <div className="container mx-auto p-4 md:p-8 lg:p-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left - Product Images */}
        <div className="flex gap-4">
          {product.images?.length > 0 ? (
            <div className="flex flex-col gap-4">
              {product.images.map((img, index) => (
                <div
                  key={index}
                  className="cursor-pointer border-2 p-1 transition-all duration-300 hover:scale-105"
                  onClick={() => setSelectedMedia(img)}
                >
                  <Image src={img || fallbackImage} alt={`Thumbnail ${index}`} width={80} height={80} className="rounded-lg" />
                </div>
              ))}
            </div>
          ) : (
            <p>No images available</p>
          )}

          {/* Main Image */}
          <div className="flex-1">
            <Image src={selectedMedia} alt={product.name || "Product Image"} width={500} height={500} className="rounded-lg transition-transform duration-300" />
          </div>
        </div>

        {/* Right - Product Details */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-red-600">{product.title}</h1>
          <p className="text-lg font-semibold text-gray-700">
            <span className="line-through text-gray-400">₹{product.price?.toFixed(2)}</span>  
            <span className="ml-2 text-xl lg:text-2xl text-black font-extrabold">₹{product.offerPrice?.toFixed(2)}</span>
          </p>
          <p className="text-gray-600 text-sm">{product.description || "No description available."}</p>
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="flex border rounded-md">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 border-r hover:bg-gray-200 transition">-</button>
                <span className="px-4 py-2">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 border-l hover:bg-gray-200 transition">+</button>
              </div>
            </div>

            {/* Total Price Box */}
            <div className="p-2 border rounded-md bg-gray-100 w-fit">
              <strong>Total Price:</strong> ₹{Number(product.offerPrice * quantity).toFixed(2)}
            </div>
            <div className="mt-4">
              <CartButton2 product={product} />
            </div>
          </div>

          {/* Additional Information */}
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
