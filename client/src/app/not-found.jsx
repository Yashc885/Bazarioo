import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
      <nav className="absolute top-4 left-4 text-gray-500">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        / <span className="text-gray-400">404 Error</span>
      </nav>
      <h1 className="text-6xl font-bold text-black mt-12">404 Not Found</h1>
      <p className="text-lg text-gray-600 mt-4">
        Your visited page not found. You may go home page.
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-red-500 text-white text-lg rounded-lg hover:bg-red-600 transition"
      >
        Back to home page
      </Link>
    </div>
  );
};

export default Custom404;
