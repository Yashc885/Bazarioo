"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, ChevronRight } from "lucide-react";
import mobile from './../../../assets/Today/mobile.jpg'
const products = Array(30).fill({
  _id: "1234567890abcdef", // Placeholder ID, will be fetched from DB later
  name: "Lorem Ipsum",
  category: "Battery",
  price: "₹110.40",
  description: "Lorem ipsum is placeholder text commonly used in the graphic industry. It helps to visualize content before final text is added.",
  image: mobile ,
});

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentProducts.map((product, index) => (
          <div key={index} className="bg-white p-4 shadow-md rounded-lg">
            <Image src={product.image} alt={product.name} width={100} height={100} className="mx-auto" />
            <h3 className="mt-4 font-bold text-black">{product.name}</h3>
            <p className="text-red-500 font-semibold">{product.category}</p>
            <p className="text-lg font-bold text-black">{product.price}</p>
            <p className="text-gray-600 text-sm">{product.description.split(" ").slice(0, 30).join(" ")}...</p>
            <p className="text-xs text-gray-400 mt-2">Product ID: {product._id}</p>
            <Link
              href={`/superuser/updateProduct?product=${product._id}`}
              className="mt-3 flex items-center justify-center w-full py-2 bg-red-500 text-white rounded-md shadow-md"
            >
              <Pencil className="w-4 h-4 mr-2" /> Update
            </Link>
          </div>
        ))}
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
