"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { FiPhone, FiMail } from "react-icons/fi";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",  // Changed from 'phone' to 'phoneNumber'
    message: "",
    userId: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  // Fetch userId from localStorage on component mount
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setFormData((prev) => ({ ...prev, userId: storedUserId }));
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const res = await axios.post("/api/contact", formData);
      setResponseMessage(res.data.message);
      setFormData({ name: "", email: "", phoneNumber: "", message: "", userId: formData.userId });
    } catch (error) {
      setResponseMessage(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-16 py-6 lg:py-8">
      <nav className="text-gray-500 text-sm">
        <Link href="/" className="hover:text-black">Home</Link> /
        <span className="text-black font-semibold"> Contact</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 lg:py-8">
        {/* Contact Info */}
        <div className="bg-white shadow-md rounded-lg p-6 border">
          <div className="flex items-center mb-6">
            <div className="ml-4">
              <h2 className="font-semibold text-lg py-2">Call To Us</h2>
              <p className="text-gray-500 text-sm mt-1 py-2">We are available 24/7, 7 days a week.</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-500 text-white flex items-center justify-center rounded-full">
                  <FiPhone size={18} />
                </div>
                <p className="font-medium ml-3">+8801611122222</p>
              </div>
            </div>
          </div>
          <hr className="border-gray-300" />

          <div className="flex items-center mt-6">
            <div className="ml-4">
              <h2 className="font-semibold text-lg py-2">Write To Us</h2>
              <p className="text-gray-500 text-sm mt-1">Fill out our form and we will contact you within 24 hours.</p>
              <div className="mt-2 flex flex-col space-y-2">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-red-500 text-white flex items-center justify-center rounded-full">
                    <FiMail size={18} />
                  </div>
                  <p className="font-medium ml-3">customer@exclusive.com</p>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-red-500 text-white flex items-center justify-center rounded-full">
                    <FiMail size={18} />
                  </div>
                  <p className="font-medium ml-3">support@exclusive.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2 bg-white shadow-md rounded-lg p-8 border">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name *"
                className="border rounded-md px-4 py-3 w-full focus:ring-2 focus:ring-red-400 outline-none bg-gray-100"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email *"
                className="border rounded-md px-4 py-3 w-full focus:ring-2 focus:ring-red-400 outline-none bg-gray-100"
                required
              />
              <input
                type="tel"
                name="phoneNumber"  // Fixed: Changed from 'phone' to 'phoneNumber'
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Your Phone *"
                className="border rounded-md px-4 py-3 w-full focus:ring-2 focus:ring-red-400 outline-none bg-gray-100"
                required
              />
            </div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="border rounded-md px-4 py-3 w-full h-48 mt-4 focus:ring-2 focus:ring-red-400 outline-none bg-gray-100"
              required
            ></textarea>
            <div className="flex justify-center md:justify-end py-4">
              <button
                type="submit"
                disabled={loading}
                className="w-[200px] bg-red-500 text-white text-lg rounded-lg py-3 hover:bg-red-600 transition"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
          {responseMessage && (
            <p className="text-center text-green-600 mt-4">{responseMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
