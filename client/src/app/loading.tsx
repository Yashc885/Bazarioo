// app/loading.tsx
import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-500"></div>
    </div>
  );
};

export default Loading;
