"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import RegisterImage from "./../../assets/Authh/RegisterImage.jpg";
import { useRouter } from "next/navigation"; // For redirection
import Cookies from "js-cookie"; // Import js-cookie

const Register = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        setError(data.message);
        return;
      }

      // Store token in cookies
      Cookies.set("authToken", data.token, { expires: 30 }); // 30 days

      // Store user info in localStorage
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("userId", data.user._id);

      // Redirect to home/dashboard
      router.push("/"); // Change to your desired page

    } catch (error) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        
        {/* Left Side Image - Hidden on Mobile */}
        <div className="w-1/2 hidden md:flex items-center justify-center bg-blue-100">
          <Image src={RegisterImage} alt="Shopping" className="w-full h-auto" />
        </div>

        {/* Right Side - Registration Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-900">Create an account</h2>
          <p className="text-gray-500 text-sm mb-6">Enter your details below</p>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="name"
              placeholder="Name" 
              value={formData.name} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border rounded-md mb-4 focus:ring-2 focus:ring-red-500 focus:outline-none" 
              required
            />
            <input 
              type="email" 
              name="email"
              placeholder="Email" 
              value={formData.email} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border rounded-md mb-4 focus:ring-2 focus:ring-red-500 focus:outline-none" 
              required
            />
            <input 
              type="password" 
              name="password"
              placeholder="Password" 
              value={formData.password} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border rounded-md mb-4 focus:ring-2 focus:ring-red-500 focus:outline-none" 
              required
            />

            <button 
              type="submit" 
              className="w-full bg-red-500 text-white py-2 rounded-md font-semibold hover:bg-red-600 transition"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Google Signup */}
          <button className="w-full flex items-center justify-center mt-4 border rounded-md py-2 text-gray-700 hover:bg-gray-100 transition">
            <FaGoogle className="mr-2 text-red-500" /> Sign up with Google
          </button>

          {/* Login Link */}
          <p className="text-gray-500 text-sm text-center mt-4">
            Already have an account? <Link href="/login" className="text-red-500 font-semibold hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
