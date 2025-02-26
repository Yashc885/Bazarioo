import Navbar from './../../../components/Admin/Common/Navbar.jsx';
import AddProduct from './../../../components/Admin/AddProduct/AddProduct.jsx';
export default function Home() {
  return (
    <div className=""> 
     <Navbar />
     <div className = "mt-24">
      <AddProduct />
      </div> 
    </div>
  );
}
