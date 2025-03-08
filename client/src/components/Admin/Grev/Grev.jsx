'use client';
import { useEffect, useState } from "react";
import { Mail, Loader, AlertCircle } from "lucide-react";
import axios from "axios";

export default function Grev() {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("/api/contact")
      .then(response => {
        setGrievances(response.data.contacts);
        setLoading(false);
      })
      .catch(error => {
        setError("Failed to load grievances");
        setLoading(false);
      });
  }, []);

  const handleSendMail = (email) => {
    const mailtoLink = `mailto:${email}?subject=Response to Your Grievance&body=Dear User,%0D%0A%0D%0AHere is the response to your grievance...`;
    window.location.href = mailtoLink;
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><Loader className="animate-spin text-blue-500" size={40} /></div>;
  if (error) return <div className="text-red-500 text-center mt-5 flex justify-center items-center gap-2"><AlertCircle /> {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Grievance Panel</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Message</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {grievances.map((grievance, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="p-3">{grievance.name}</td>
                <td className="p-3">{grievance.email}</td>
                <td className="p-3">{grievance.phoneNumber}</td>
                <td className="p-3 truncate max-w-xs">{grievance.message}</td>
                <td className="p-3 text-center">
                  <button 
                    onClick={() => handleSendMail(grievance.email)}
                    className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2">
                    <Mail size={18} /> Reply
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}