"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa";
import { FiFilter } from "react-icons/fi"; // Filter Icon
import axios from "axios";

const categories = [
  "All", "Clothing", "Beauty", "Watches", "Home", "Jewelleries",
  "Festive", "Spiritual", "Others"
];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  const searchParams = useSearchParams();
  const router = useRouter();

  // ✅ Read category & page number from URL
  const selectedCategory = searchParams.get("category") || "All";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/product");
        const data = response.data;

        if (data && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts([]);
          console.error("Unexpected API response:", data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Filtering Logic (Category & Search)
  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "All" || product.category === selectedCategory) &&
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Pagination Logic (Max 20 per page)
  const maxProductsPerPage = 20;
  const startIndex = (currentPage - 1) * maxProductsPerPage;
  const endIndex = startIndex + maxProductsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // ✅ Pagination Handlers
  const handlePageChange = (newPage) => {
    router.push(`/products?category=${encodeURIComponent(selectedCategory)}&page=${newPage}`);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* 🔥 Search Bar + Filter */}
      <div className="sticky top-0 bg-white z-10 p-2 shadow-md flex items-center justify-between gap-2 md:gap-4 md:hidden">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border rounded-full w-full md:w-72 text-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="p-2 border rounded-md text-sm flex items-center gap-1"
        >
          <FiFilter className="text-gray-500" /> Filter
        </button>
      </div>

      {/* Categories */}
      <div className={`bg-white p-2 mt-2 ${showFilters ? "block" : "hidden"} md:flex md:items-center md:gap-3 md:mt-2`}>
        <div className="flex gap-3 whitespace-nowrap overflow-x-scroll scrollbar-hide md:flex-wrap md:overflow-hidden sm:pb-2">
          {categories.map((category) => (
            <Link key={category} href={`/products?category=${encodeURIComponent(category)}&page=1`} passHref>
              <button
                className={`px-4 py-2 text-sm rounded-lg ${
                  selectedCategory === category ? "bg-red-600 text-white" : "bg-gray-100 text-red-600"
                }`}
              >
                {category}
              </button>
            </Link>
          ))}
        </div>
      </div>

      {/* 🛍️ Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => (
            <Link key={product._id} href={`/productDetail/${product._id}`} passHref>
              <div className="relative border p-4 rounded-lg shadow-sm hover:shadow-md transition bg-white cursor-pointer">
                <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
                  -{product.discount}%
                </span>
                <div className="absolute top-2 right-2">
                  <FaHeart className="text-gray-500 hover:text-red-500 cursor-pointer transition" />
                </div>
                <Image 
                  src={product.images[0]} 
                  alt={product.title} 
                  width={200} 
                  height={350} 
                  className="w-full h-40 object-cover mb-4 rounded-md"
                  unoptimized
                />
                <h3 className="text-sm font-semibold">{product.title}</h3>
                <div className="text-red-500 font-bold">
                  ${product.offerPrice} <span className="text-gray-400 line-through">${product.price}</span>
                </div>
                <span className="text-xs text-gray-500">{product.category}</span>
                <button className="w-full bg-black text-white py-2 mt-2 rounded-md text-lg font-semibold hover:bg-gray-700 transition">
                  View Product
                </button>
              </div>
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No products found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className={`px-4 py-2 rounded-md text-white ${currentPage > 1 ? "bg-red-600 hover:bg-red-700" : "bg-gray-300 cursor-not-allowed"}`}
        >
          Previous
        </button>
        <span className="text-sm font-medium">Page {currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={endIndex >= filteredProducts.length}
          className={`px-4 py-2 rounded-md text-white ${endIndex < filteredProducts.length ? "bg-red-600 hover:bg-red-700" : "bg-gray-300 cursor-not-allowed"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
