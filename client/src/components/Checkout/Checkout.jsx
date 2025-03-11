"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    streetAddress: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    email: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId") || "67b96c13ceaa5650421786bb";
    setUserId(storedUserId);
  }, []);

  useEffect(() => {
    if (!userId) return;
    const fetchCart = async () => {
      try {
        const { data } = await axios.get(`/api/cart?userId=${userId}`);
        setCartItems(
          data.cart.products.map((item) => ({
            id: item.product._id,
            title: item.product.title,
            offerPrice: item.product.offerPrice,
            quantity: item.quantity,
            image: item.product.images?.[0] || "/placeholder.jpg"
          }))
        );
      } catch (error) {
        console.error("Cart fetch error:", error);
      }
    };
    fetchCart();
  }, [userId]);

  const handleBillingChange = (e) => {
    setBillingDetails({ ...billingDetails, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!billingDetails.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!billingDetails.streetAddress.trim()) newErrors.streetAddress = "Street Address is required";
    if (!billingDetails.city.trim()) newErrors.city = "City is required";
    if (!billingDetails.state.trim()) newErrors.state = "State is required";
    if (!billingDetails.pincode.trim()) newErrors.pincode = "Pincode is required";
    if (!billingDetails.phone.trim()) newErrors.phone = "Phone is required";
    else if (!phoneRegex.test(billingDetails.phone)) newErrors.phone = "Enter valid 10-digit phone number";
    if (!billingDetails.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(billingDetails.email)) newErrors.email = "Invalid email address";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateQuantity = async (id, qty) => {
    if (qty < 1) return;
    try {
      await axios.put(`/api/cart/update`, {
        userId,
        productId: id,
        quantity: qty
      });
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
      );
    } catch (error) {
      console.error("Update quantity error:", error);
    }
  };

  const removeItem = async (id) => {
    try {
      await axios.delete(`/api/cart/remove`, {
        data: { userId, productId: id }
      });
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Remove item error:", error);
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.offerPrice * item.quantity, 0);
  const shipping = "Free";
  const total = subtotal;

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (!validateForm()) return;

    const orderData = {
      userId,
      items: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.offerPrice
      })),
      totalAmount: subtotal,
      ...billingDetails
    };

    try {
      setIsLoading(true);
      const res = await axios.post("/api/booking", orderData);
      if (res.status === 200) {
        alert("Order placed successfully!");
        setCartItems([]);
        router.push("/successful");
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("Order failed, try again!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen">
      <nav className="text-gray-600 text-sm mb-4">
        <Link href="/account" className="hover:text-black">My Account</Link> /{" "}
        <Link href="/product" className="hover:text-black">Product</Link> /{" "}
        <Link href="/cart" className="hover:text-black">Cart</Link> /{" "}
        <span className="font-semibold text-black">Checkout</span>
      </nav>

      <h2 className="text-2xl font-bold mb-6 text-center">Billing Details</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Billing Form */}
        <form className="bg-white p-6 shadow rounded-md space-y-4">
          {[
            { label: "First Name", name: "firstName", type: "text" },
            { label: "Street Address", name: "streetAddress", type: "text" },
            { label: "Town/City", name: "city", type: "text" },
            { label: "State", name: "state", type: "text" },
            { label: "Pincode", name: "pincode", type: "text" },
            { label: "Phone Number", name: "phone", type: "tel" },
            { label: "Email Address", name: "email", type: "email" }
          ].map((field) => (
            <div key={field.name}>
              <label className="font-semibold">{field.label} *</label>
              <input
                type={field.type}
                name={field.name}
                value={billingDetails[field.name]}
                onChange={handleBillingChange}
                className={`w-full border px-3 py-2 mt-1 rounded-md ${
                  errors[field.name] ? "border-red-500" : "border-gray-300"
                }`}
                placeholder={field.label}
              />
              {errors[field.name] && (
                <p className="text-sm text-red-500 mt-1">{errors[field.name]}</p>
              )}
            </div>
          ))}
        </form>

        {/* Cart Summary */}
        <div className="bg-white p-6 shadow rounded-md">
          <table className="w-full border border-gray-200 mb-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-2 border">Product</th>
                <th className="text-center p-2 border">Qty</th>
                <th className="text-center p-2 border">Price</th>
                <th className="text-center p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="border">
                  <td className="p-2 flex items-center gap-3">
                    <Image src={item.image} alt={item.title} width={50} height={50} className="object-cover rounded" />
                    <span>{item.title}</span>
                  </td>
                  <td className="p-2 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 bg-gray-200 rounded font-bold">-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 bg-gray-200 rounded font-bold">+</button>
                    </div>
                  </td>
                  <td className="text-center p-2 font-medium">₹{item.offerPrice * item.quantity}</td>
                  <td className="text-center p-2">
                    <button onClick={() => removeItem(item.id)} className="text-red-500 text-lg">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="space-y-2 text-lg">
            <div className="flex justify-between"><span>Subtotal:</span><span>₹{subtotal}</span></div>
            <div className="flex justify-between"><span>Shipping:</span><span>{shipping}</span></div>
            <hr />
            <div className="flex justify-between font-bold text-xl"><span>Total:</span><span>₹{total}</span></div>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={isLoading}
            className={`w-full mt-6 px-6 py-3 rounded-md text-white text-lg font-semibold ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {isLoading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
