"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Upload, CheckCircle, XCircle, Trash2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const categories = [
  "All", "Clothing", "Beauty", "Watches", "Home", "Headphones",
  "Jewelleries", "Shoes", "Games", "Festive", "Spiritual", "Others"
];

const UpdateProduct = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("product_id");

  const [product, setProduct] = useState(null);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    if (productId) {
      axios.get(`/api/products/${productId}`)
        .then(({ data }) => setProduct(data))
        .catch(() => setPopup({ type: "error", message: "Failed to fetch product details!" }));
    }
  }, [productId]);

  const onDrop = (acceptedFiles) => {
    if (product.images.length + acceptedFiles.length > 5) {
      setPopup({ type: "error", message: "Maximum 5 images allowed!" });
      return;
    }
    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) }))]
    }));
  };

  const removeImage = (index) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/products/${productId}`, product);
      setPopup({ type: "success", message: "Product updated successfully!" });
      setTimeout(() => router.push("/superuser/products"), 1500);
    } catch (error) {
      setPopup({ type: "error", message: "Failed to update product!" });
    }
  };

  if (!product) return <p className="text-center text-red-500">Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Update Product</h2>
      {popup && (
        <div className={`p-3 rounded-md text-white mb-4 ${popup.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {popup.type === "success" ? <CheckCircle className="inline mr-2" /> : <XCircle className="inline mr-2" />} 
          {popup.message}
        </div>
      )}
      <form onSubmit={handleUpdate} className="grid grid-cols-1 gap-4">
        <input 
          type="text" 
          placeholder="Product Name" 
          className="border p-2 rounded w-full" 
          value={product.name} 
          onChange={(e) => setProduct({ ...product, name: e.target.value })} 
        />
        <textarea
          placeholder="Description"
          className="border p-2 rounded w-full h-32"
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
        ></textarea>
        <select
          className="border p-2 rounded w-full"
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Regular Price (₹)"
            className="border p-2 rounded w-full"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
          <input
            type="text"
            placeholder="Offer Price (₹)"
            className="border p-2 rounded w-full"
            value={product.offerPrice}
            onChange={(e) => setProduct({ ...product, offerPrice: e.target.value })}
          />
        </div>
        <div {...getRootProps()} className="border-dashed border-2 p-4 text-center cursor-pointer rounded-md bg-gray-50">
          <input {...getInputProps()} />
          <Upload className="mx-auto mb-2" />
          <p>Drag & drop images here, or click to select</p>
          <small className="text-gray-500">Minimum 1, Maximum 5 images</small>
        </div>
        <div className="grid grid-cols-5 gap-2 mt-2">
          {product.images.map((file, index) => (
            <div key={index} className="relative">
              <img src={file.preview || file} className="w-full h-20 object-cover rounded-md" alt="preview" />
              <button type="button" className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full" onClick={() => removeImage(index)}>
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
        <button type="submit" className="bg-red-500 text-white p-2 rounded-md shadow-md w-full">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
