"use client";

import { FiShoppingCart, FiTrendingUp, FiPackage, FiRefreshCw } from "react-icons/fi";
import { MoreVertical } from "lucide-react";

const Dashboard = () => {
  const orders = [
    { id: "#25426", date: "Nov 8th, 2023", customer: "Kavin", status: "Delivered", amount: "\u20B9200.00" },
    { id: "#25425", date: "Nov 7th, 2023", customer: "Komael", status: "Canceled", amount: "\u20B9200.00" },
    { id: "#25424", date: "Nov 6th, 2023", customer: "Nikhil", status: "Delivered", amount: "\u20B9200.00" },
    { id: "#25423", date: "Nov 5th, 2023", customer: "Shivam", status: "Canceled", amount: "\u20B9200.00" },
    { id: "#25422", date: "Nov 4th, 2023", customer: "Shadab", status: "Delivered", amount: "\u20B9200.00" },
    { id: "#25421", date: "Nov 2nd, 2023", customer: "Yogesh", status: "Delivered", amount: "\u20B9200.00" },
  ];

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-gray-600">Home &gt; Dashboard</p>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        {[
          { title: "Total Orders", icon: FiShoppingCart },
          { title: "Active Orders", icon: FiTrendingUp },
          { title: "Completed Orders", icon: FiPackage },
          { title: "Return Orders", icon: FiRefreshCw }
        ].map((stat, index) => (
          <div key={index} className="bg-white shadow-md p-4 rounded-lg flex items-center gap-4 border">
            <stat.icon className="text-red-500 text-3xl" />
            <div>
              <h2 className="text-gray-600">{stat.title}</h2>
              <p className="text-xl font-bold">\u20B9126,500</p>
              <span className="text-green-500">\u2191 34.7%</span>
            </div>
            <MoreVertical className="ml-auto text-gray-500" />
          </div>
        ))}
      </div>
      
      {/* Recent Orders */}
      <div className="bg-white shadow-md p-4 rounded-lg border mt-6 overflow-x-auto">
        <h2 className="text-lg font-bold mb-4">Recent Orders</h2>
        <table className="w-full text-left min-w-[600px]">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="py-2">Product</th>
              <th>Order ID</th>
              <th>Date</th>
              <th>Customer Name</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="py-2">Lorem Ipsum</td>
                <td>{order.id}</td>
                <td>{order.date}</td>
                <td>{order.customer}</td>
                <td className={order.status === "Canceled" ? "text-red-500" : "text-green-500"}>{order.status}</td>
                <td>{order.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
