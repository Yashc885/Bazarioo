"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, CheckCircle, XCircle, Trash2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const categories = [
  "All", "Clothing", "Beauty", "Watches", "Home", "Headphones",
  "Jewelleries", "Shoes", "Games", "Festive", "Spiritual", "Others"
];

const AddProduct = () => {
  const router = useRouter();
  const [product, setProduct] = useState({
    title: "",
    description: "",
    category: "All",
    price: "",
    offerPrice: "",
    discount: "",
    images: []
  });
  const [popup, setPopup] = useState(null);
  const [loading, setLoading] = useState(false);

  const onDrop = (acceptedFiles) => {
    if (product.images.length + acceptedFiles.length > 5) {
      setPopup({ type: "error", message: "Maximum 5 images allowed!" });
      return;
    }

    const imagePromises = acceptedFiles.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then((imageData) => {
      setProduct((prev) => ({
        ...prev,
        images: [...prev.images, ...imageData]
      }));
    });
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (product.images.length < 1) {
      setPopup({ type: "error", message: "At least 1 image is required!" });
      return;
    }

    setLoading(true);
    try {
      await axios.post("/api/product", product);
      setPopup({ type: "success", message: "Product added successfully!" });
      setTimeout(() => router.push("/superuser/product"), 1500);
    } catch (error) {
      setPopup({ type: "error", message: "Failed to add product!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      {popup && (
        <div className={`p-3 rounded-md text-white mb-4 ${popup.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {popup.type === "success" ? <CheckCircle className="inline mr-2" /> : <XCircle className="inline mr-2" />}
          {popup.message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="flex gap-4">
          {product.images.length > 0 && (
            <img src={product.images[0]} className="w-40 h-40 object-cover rounded-md" alt="preview" />
          )}
          <div className="flex-1 space-y-2">
            <input
              type="text"
              placeholder="Product Title"
              className="border p-2 rounded w-full"
              value={product.title}
              onChange={(e) => setProduct({ ...product, title: e.target.value })}
              required
            />
            <select
              className="border p-2 rounded w-full"
              value={product.category}
              onChange={(e) => setProduct({ ...product, category: e.target.value })}
            >
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
            <textarea
              placeholder="Description"
              className="border p-2 rounded w-full h-28"
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
              required
            ></textarea>
          </div>
        </div>
        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Price (₹)"
            className="border p-2 rounded w-1/3"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Offer Price (₹)"
            className="border p-2 rounded w-1/3"
            value={product.offerPrice}
            onChange={(e) => setProduct({ ...product, offerPrice: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Discount (%)"
            className="border p-2 rounded w-1/3"
            value={product.discount}
            onChange={(e) => setProduct({ ...product, discount: e.target.value })}
            required
          />
        </div>
        <div {...getRootProps()} className="border-dashed border-2 p-4 text-center cursor-pointer rounded-md bg-gray-50">
          <input {...getInputProps()} />
          <Upload className="mx-auto mb-2" />
          <p>Drag & drop images here, or click to select</p>
          <small className="text-gray-500">Minimum 1, Maximum 5 images</small>
        </div>
        <div className="grid grid-cols-5 gap-2 mt-2">
          {product.images.map((image, index) => (
            <div key={index} className="relative">
              <img src={image} className="w-full h-20 object-cover rounded-md" alt="preview" />
              <button type="button" className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full" onClick={() => removeImage(index)}>
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
        <button type="submit" className="bg-red-500 text-white p-2 rounded-md shadow-md w-full" disabled={loading}>
          {loading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
