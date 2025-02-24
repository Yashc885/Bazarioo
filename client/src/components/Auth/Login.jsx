"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Import js-cookie
import RegisterImage from "./../../assets/Authh/RegisterImage.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      router.push("/");
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login Successful!");

        // Store login status in localStorage
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userId", data.user._id);

        // Store authentication token in cookies for session management (valid for 30 days)
        Cookies.set("authToken", data.token, { expires: 30, path: "/" });

        // Redirect user to dashboard
        router.push("/");
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
        <div className="w-1/2 hidden md:flex items-center justify-center bg-blue-100">
          <Image src={RegisterImage} alt="Shopping" className="w-full h-auto" />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-900">Log in to Exclusive</h2>
          <p className="text-gray-500 text-sm mb-6">Enter your details below</p>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <form onSubmit={handleLogin}>
            <input 
              type="email" 
              placeholder="Email or Phone Number" 
              className="w-full px-4 py-2 border rounded-md mb-4 focus:ring-2 focus:ring-red-500 focus:outline-none" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full px-4 py-2 border rounded-md mb-4 focus:ring-2 focus:ring-red-500 focus:outline-none" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />

            <div className="flex justify-between items-center">
              <button 
                type="submit" 
                className="bg-red-500 text-white py-2 px-6 rounded-md font-semibold hover:bg-red-600 transition"
              >
                Log In
              </button>
              <Link href="/forgot-password" className="text-red-500 text-sm font-semibold hover:underline">
                Forget Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
