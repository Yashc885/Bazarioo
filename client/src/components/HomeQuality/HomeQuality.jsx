"use client";

const qualityData = [
  {
    id: 1,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        className="w-8 h-8"
      >
        <path d="M3 8l9-6 9 6v12H3V8zm9 9h6v-2h-6v2zm-6-4h12v-2H6v2zm0-4h12V7H6v2z" />
      </svg>
    ),
    title: " FAST DELIVERY",
    description: "Free delivery for all orders over $140",
  },
  {
    id: 2,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        className="w-8 h-8"
      >
        <path d="M12 1a11 11 0 1 1 0 22A11 11 0 0 1 12 1zm1 16v-4h-2v6h6v-2h-4zm0-8V5h-2v6h6V9h-4z" />
      </svg>
    ),
    title: " 24/7 CUSTOMER SERVICE ",
    description: "Friendly 24/7 customer support",
  },
  {
    id: 3,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        className="w-8 h-8"
      >
        <path d="M12 0L1 4v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V4L12 0zm0 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-4 1h8v2H8v-2z" />
      </svg>
    ),
    title: " High Quality Products ",
    description: "All products would be of premium quality",
  },
];

export default function HomeQuality() {
  return (
    <div className="w-full flex justify-center items-center py-12 lg:py-24 ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {qualityData.map((item) => (
          <div key={item.id} className="flex flex-col items-center">
            <div className="w-16 h-16 flex justify-center items-center bg-gray-800 rounded-full relative">
              <div className="w-20 h-20 bg-gray-300 rounded-full absolute -z-10"></div>
              {item.icon}
            </div>
            <h3 className="text-lg font-bold mt-4">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
