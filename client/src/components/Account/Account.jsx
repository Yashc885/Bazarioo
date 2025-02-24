import React from "react";

const Account = () => {
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-2xl bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-red-500 text-lg font-semibold mb-4">Edit Your Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">First Name</label>
            <input type="text" className="w-full p-2 border rounded bg-gray-100" value="Md" readOnly />
          </div>
          <div>
            <label className="block text-gray-700">Last Name</label>
            <input type="text" className="w-full p-2 border rounded bg-gray-100" value="Rimel" readOnly />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input type="email" className="w-full p-2 border rounded bg-gray-100" value="rimel111@gmail.com" readOnly />
          </div>
          <div>
            <label className="block text-gray-700">Address</label>
            <input type="text" className="w-full p-2 border rounded bg-gray-100" value="Kingston, 5236, United State" readOnly />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-gray-700">Password Changes</label>
          <input type="password" className="w-full p-2 border rounded bg-gray-100 mt-2" placeholder="Current Password" readOnly />
          <input type="password" className="w-full p-2 border rounded bg-gray-100 mt-2" placeholder="New Password" readOnly />
          <input type="password" className="w-full p-2 border rounded bg-gray-100 mt-2" placeholder="Confirm New Password" readOnly />
        </div>
        <div className="flex justify-between items-center mt-4">
          <button className="text-gray-600">Cancel</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default Account;
