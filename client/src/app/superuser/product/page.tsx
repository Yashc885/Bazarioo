import Navbar from './../../../components/Admin/Common/Navbar.jsx';
import Product from './../../../components/Admin/Product/Product.jsx';
export default function Home() {
  return (
    <div className=""> 
     <Navbar />
     <div className = "mt-24">
      <Product />
      </div> 
    </div>
  );
}
