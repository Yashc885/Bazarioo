import Navbar from './../../../components/Admin/Common/Navbar.jsx';
import Order from './../../../components/Admin/Order/Order.jsx';
export default function Home() {
  return (
    <div className=""> 
     <Navbar />
     <div className = "mt-24">
      <Order />
      </div> 
    </div>
  );
}
