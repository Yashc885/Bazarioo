import Navbar from './../../../components/Admin/Common/Navbar.jsx';
import Today from './../../../components/Admin/Today/Today.jsx';
export default function Home() {
  return (
    <div className=""> 
     <Navbar />
     <div className = "mt-24">
      <Today />
      </div> 
    </div>
  );
}
