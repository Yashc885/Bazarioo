import Navbar from './../../../components/Admin/Common/Navbar.jsx';
import OrderDetail from './../../../components/Admin/OrderDetail/OrderDetail.jsx';
export default function Home() {
  return (
    <div className=""> 
     <Navbar />
     <div className = "mt-24">
      <OrderDetail />
      </div> 
    </div>
  );
}
