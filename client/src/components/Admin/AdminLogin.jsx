"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import AdminImage from "./../../assets/Authh/RegisterImage.jpg"; // Change to Admin Image

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check if admin is already logged in
    const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (isAdminLoggedIn) {
      router.push("/superuser/dashboard");
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Admin Login Successful!");

        // Store admin login status
        localStorage.setItem("isAdminLoggedIn", "true");
        localStorage.setItem("adminId", data.admin._id);

        // Store authentication token in cookies
        Cookies.set("adminAuthToken", data.token, { expires: 30, path: "/" });

        // Redirect admin to dashboard
        router.push("/suuperuser/dashboard");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        
        {/* Left Side Image */}
        <div className="w-1/2 hidden md:flex items-center justify-center bg-gray-200">
          <Image src={AdminImage} alt="Admin Login" className="w-full h-auto" />
        </div>

        {/* Right Side - Admin Login Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-900">Admin Login</h2>
          <p className="text-gray-500 text-sm mb-6">Enter your credentials</p>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <form onSubmit={handleLogin}>
            <input 
              type="email" 
              placeholder="Admin Email" 
              className="w-full px-4 py-2 border rounded-md mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full px-4 py-2 border rounded-md mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />

            <div className="flex justify-between items-center">
              <button 
                type="submit" 
                className="bg-blue-500 text-white py-2 px-6 rounded-md font-semibold hover:bg-blue-600 transition"
              >
                Log In
              </button>
              <Link href="/admin/forgot-password" className="text-blue-500 text-sm font-semibold hover:underline">
                Forget Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
