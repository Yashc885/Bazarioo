import Navbar from './../../../components/Admin/Common/Navbar.jsx';
// import Sidebar from './../../../components/Admin/Common/Sidebar.jsx';
import Dashboard from './../../../components/Admin/Dashboard/Dashboard.jsx';
export default function Home() {
  return (
    <div className=""> 
     <Navbar />
     {/* <Sidebar /> */}
    <Dashboard />
    </div>
  );
}
