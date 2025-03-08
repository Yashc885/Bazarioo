"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const statusColors = {
  Canceled: "text-red-500",
  Accepted: "text-green-500",
  "On Way": "text-yellow-500",
  Delivered: "text-blue-500",
};

const Order = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 15;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/booking", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data.bookings); // Assuming API returns `{ bookings: [...] }`
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const currentOrders = orders.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Orders List</h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-max border-collapse">
              <thead>
                <tr className="border-b border-gray-300 bg-gray-100">
                  <th className="p-3 text-left">Product</th>
                  <th className="p-3 text-left">Order ID</th>
                  <th className="p-3 text-left">Customer Name</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Amount</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-200 cursor-pointer"
                    onClick={() => router.push(`/superuser/orderDetail?order=${order._id}`)}
                  >
                    <td className="p-3">{order.items[0]?.product?.title || "Unknown Product"}</td>
                    <td className="p-3">#{order._id}</td>
                    <td className="p-3">{order.firstName || "Unknown Customer"}</td>
                    <td className={`p-3 font-semibold ${statusColors[order.paymentStatuss] || "text-gray-500"}`}>
                      {order.paymentStatus}
                    </td>
                    <td className="p-3">₹{order.totalAmount?.toFixed(2) || "0.00"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-4 gap-2">
            <button
              className="p-2 bg-gray-300 rounded-full disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft />
            </button>
            <span className="text-lg font-semibold">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="p-2 bg-gray-300 rounded-full disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Order;
