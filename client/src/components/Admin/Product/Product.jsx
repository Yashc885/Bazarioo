"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, ChevronRight, Search } from "lucide-react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16;
  const fallbackImage = "/fallback.jpg"; // Ensure this image is in the public folder

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/product");
        console.log("API Response:", response.data);
        if (response.data && Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  console.log("Current Products State:", products);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">All Products</h2>
        <Link 
          href="/superuser/addProduct"
          className="flex items-center px-4 py-2 bg-black text-white rounded-md shadow-md">
          <Plus className="w-5 h-5 mr-2" /> Add New Product
        </Link>
      </div>

      {/* Search Box */}
      <div className="mb-6 flex items-center bg-white shadow-md p-3 rounded-md">
        <Search className="w-5 h-5 text-gray-500 mr-2" />
        <input 
          type="text" 
          placeholder="Search by title..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="w-full p-2 outline-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => {
          const productImage = Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : fallbackImage;
          
          return (
            <div key={product._id} className="bg-white shadow-md rounded-lg p-4 h-full flex flex-col">
              {/* Image with better quality */}
              <div className="w-full h-[200px] overflow-hidden rounded-md">
                <Image 
                  src={productImage} 
                  alt={product.name || "Product image"} 
                  width={300} 
                  height={200} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Text Content */}
              <div className="flex-grow flex flex-col ">
                <h3 className="font-bold text-black">{product.title}</h3>
                <p className="text-red-500 font-semibold">{product.category}</p>
                <p className="text-lg font-bold text-black">{product.offerPrice}</p>
                <p className="text-gray-600 text-sm min-h-[50px]">
                  {product.description?.split(" ").slice(0, 30).join(" ")}...
                </p>
                <p className="text-xs text-gray-400 ">Product ID: {product._id}</p>
              </div>

              {/* Button */}
              <Link
                href={`/superuser/updateProduct?product=${product._id}`}
                className="mt-3 flex items-center justify-center w-full py-2 bg-black text-white rounded-md shadow-md"
              >
                <Pencil className="w-4 h-4 mr-2" /> Update
              </Link>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center items-center gap-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded-md ${currentPage === i + 1 ? "bg-black text-white" : "bg-white text-black"}`}
          >
            {i + 1}
          </button>
        ))}
        {currentPage < totalPages && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-3 py-1 border rounded-md bg-white text-black flex items-center"
          >
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductList;
