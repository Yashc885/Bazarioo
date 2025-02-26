import Navbar from './../../../components/Admin/Common/Navbar.jsx';
import UpdateProduct from './../../../components/Admin/UpdateProduct/UpdateProduct.jsx';
export default function Home() {
  return (
    <div className=""> 
     <Navbar />
     <div className = "mt-24">
      <UpdateProduct />
      </div> 
    </div>
  );
}
