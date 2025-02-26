"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ChevronLeft, ChevronRight, Download, Save, User, Package, Truck } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [note, setNote] = useState("Type some notes...");
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState("Pending");
  const ordersPerPage = 3;

  useEffect(() => {
    const fetchOrder = async () => {
      const data = {
        _id: id,
        orderId: "#6743",
        date: "Feb 16, 2022 - Feb 20, 2022",
        status: "Pending",
        customer: {
          name: "Shristi Singh",
          email: "shristi@gmail.com",
          phone: "+91 904 231 1212",
          address: "Dharam Colony, Palam Vihar, Gurgaon, Haryana",
        },
        payment: {
          method: "Master Card **** **** 6557",
        },
        items: Array(4).fill({ name: "Lorem Ipsum", orderId: "#25421", quantity: 2, total: "₹800.40" }),
        subtotal: "₹3,201.60",
        tax: "₹640.32",
        discount: "₹0",
        shipping: "₹0",
        total: "₹3,841.92",
      };
      setOrder(data);
      setStatus(data.status);
    };
    fetchOrder();
  }, [id]);

  const editor = useEditor({
    extensions: [StarterKit],
    content: note,
    onUpdate: ({ editor }) => {
      setNote(editor.getHTML());
    },
  });

  const totalPages = Math.ceil((order?.items.length || 0) / ordersPerPage);
  const currentItems = order?.items.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`Order Details - ${order.orderId}`, 20, 20);
    doc.autoTable({
      head: [["Product Name", "Order ID", "Quantity", "Total"]],
      body: order.items.map((item) => [item.name, item.orderId, item.quantity, item.total]),
    });
    doc.save("order-details.pdf");
  };

  if (!order) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-red-600">Order Details</h2>
      <div className="flex justify-between items-center mb-4">
        <p className="font-semibold text-lg">
          Order ID: {order.orderId} 
        </p>
        <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={`p-2 border-2 rounded-lg bg-white font-semibold ${
                status === "Canceled"
                ? "border-red-500 text-red-500"
                : status === "Accepted"
                ? "border-green-500 text-green-500"
                : status === "On Way"
                ? "border-yellow-500 text-yellow-500"
                : status === "Delivered"
                ? "border-blue-500 text-blue-500"
                : "border-gray-500 text-gray-500"
            }`}
            >
            <option value="Canceled">Canceled</option>
            <option value="Accepted">Accepted</option>
            <option value="On Way">On Way</option>
            <option value="Delivered">Delivered</option>
        </select>

      </div>
      <p className="text-gray-600 mb-4">{order.date}</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 border border-black rounded-lg flex flex-col bg-white shadow">
          <User className="mb-2 text-black font-semibold" />
          <p className="font-bold">Customer:</p>
          <p>{order.customer.name}</p>
          <p>{order.customer.email}</p>
          <p>{order.customer.phone}</p>
        </div>
        <div className="p-4 border border-black rounded-lg flex flex-col bg-white shadow">
          <Package className="mb-2 text-black font-semibold" />
          <p className="font-bold">Payment Info:</p>
          <p>{order.payment.method}</p>
        </div>
        <div className="p-4 border border-black rounded-lg flex flex-col bg-white shadow">
          <Truck className="mb-2 text-black font-semibold" />
          <p className="font-bold">Deliver to:</p>
          <p>{order.customer.address}</p>
        </div>
      </div>

      <div className="mb-6  rounded-lg p-4 bg-white">
        <h3 className="font-bold text-lg text-black mb-2">Notes:</h3>
        <div className="h-40 overflow-y-auto border border-black p-2 rounded-lg">
          <EditorContent editor={editor} />
        </div>
      </div>

      <h3 className="text-xl font-semibold text-black mb-2">Products</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b bg-red-100">
            <th className="p-3 text-left">Product Name</th>
            <th className="p-3 text-left">Order ID</th>
            <th className="p-3 text-left">Quantity</th>
            <th className="p-3 text-left">Total</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="p-3">{item.name}</td>
              <td className="p-3">{item.orderId}</td>
              <td className="p-3">{item.quantity}</td>
              <td className="p-3">{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center items-center mt-4 gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 bg-white border-2 border-red-500 text-black rounded-lg hover:bg-red-500 hover:text-white transition"
        >
          <ChevronLeft />
        </button>
        <span className="font-semibold text-black">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="p-2 bg-white border-2 border-red-500 text-black rounded-lg hover:bg-red-500 hover:text-white transition"
        >
          <ChevronRight />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 p-2 bg-red-600 text-white rounded shadow-md hover:bg-red-700 transition"
        >
          <Download className="w-5 h-5" /> Download Info
        </button>

        <button
          className="flex items-center gap-2 p-2 bg-green-600 text-white rounded shadow-md hover:bg-green-700 transition"
        >
          <Save className="w-5 h-5" /> Save
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
