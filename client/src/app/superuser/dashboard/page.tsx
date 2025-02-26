import Navbar from './../../../components/Admin/Common/Navbar.jsx';
import Dashboard from './../../../components/Admin/Dashboard/Dashboard.jsx';
export default function Home() {
  return (
    <div className=""> 
     <Navbar />
     <div className = "mt-24">
      <Dashboard />
      </div> 
    </div>
  );
}
