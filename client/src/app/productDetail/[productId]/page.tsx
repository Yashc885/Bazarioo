'use client';
import Navbar from "./../../../components/Common/Navbar.jsx";
import Footer from "./../../../components/Common/Footer.jsx";
import ProductDetails from "./../../../components/ProductDetails/ProductDetails.jsx";
import { useParams } from "next/navigation";

export default function Home() {
  const { productId } = useParams(); // ✅ Get productId from URL

  return (
    <div className="pt-28">
      <Navbar />
      <div className="min-h-screen pl-2 md:pl-4 lg:pl-8 pr-2 lg:pr-2">
        {/* ✅ Pass productId as prop */}
        <ProductDetails productId={productId} />
      </div>
      <Footer />
    </div>
  );
}
