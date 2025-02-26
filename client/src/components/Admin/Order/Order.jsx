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

const generateStaticOrders = () => {
  return Array.from({ length: 45 }, (_, index) => ({
    _id: `order-${index + 1}`,
    product: `Product ${index + 1}`,
    orderId: `ORD${1000 + index}`,
    customerName: `Customer ${index + 1}`,
    status: ["Accepted", "Canceled", "On Way", "Delivered"][index % 4],
    amount: (Math.random() * 1000).toFixed(2), // Random price
  }));
};

const Order = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 15;

  useEffect(() => {
    // Only generate orders on the client to prevent hydration mismatch
    setOrders(generateStaticOrders());
  }, []);

  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const currentOrders = orders.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Orders List</h2>

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
                <td className="p-3">{order.product}</td>
                <td className="p-3">#{order.orderId}</td>
                <td className="p-3">{order.customerName}</td>
                <td className={`p-3 font-semibold ${statusColors[order.status]}`}>{order.status}</td>
                <td className="p-3">₹{order.amount}</td>
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
    </div>
  );
};

export default Order;
