import Navbar from './../components/Common/Navbar.jsx';
import Footer from './../components/Common/Footer.jsx';
import HomeSection from './../components/Home/HomeSection.jsx';
export default function Home() {
  return (
    <div className="pt-28"> 
      <Navbar />
      <div className="min-h-screen">
        <HomeSection />
      </div>
      <Footer />
    </div>
  );
}
