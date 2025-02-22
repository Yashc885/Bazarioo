"use client";
import React, { useState } from "react";
// import { useRouter } from "next/router"; // Directly use useRouter at the top

const Register = () => {
  // State hooks for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  // Initialize useRouter directly at the top level
//   const router = useRouter();

  // Handle change for each input field
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const submit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Registration failed");
      } else {
        // Redirect to login page after successful registration
        console.log('Done')
      }
    } catch (err) {
      setError("An error occurred, please try again.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-600 to-teal-600 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md text-center animate-fadeIn">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Create an Account</h1>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <form className="space-y-4" onSubmit={submit}>
          <div className="relative">
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Full Name"
            />
          </div>
          <div className="relative">
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="name@example.com"
            />
          </div>
          <div className="relative">
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Password"
            />
          </div>
          <div className="relative">
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Confirm Password"
            />
          </div>
          <button
            className="w-full py-3 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition-transform transform hover:scale-105"
            type="submit"
          >
            Register
          </button>
        </form>
        <p className="mt-5 text-gray-400 text-sm">&copy; 2017 - 2024</p>
      </div>
    </main>
  );
};

export default Register;
