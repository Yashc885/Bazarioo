import Navbar from './../components/Common/Navbar.jsx';
import Footer from './../components/Common/Footer.jsx';
import HomeSection from './../components/Home/HomeSection.jsx';
import Today from './../components/Today/Today.jsx';
export default function Home() {
  return (
    <div className="pt-28  "> 
      <Navbar />
      <div className="min-h-screen pl-2 md:pl-4 lg:pl-8 pr-2 lg:pr-2">
        <HomeSection />
        <div className="py-4 lg:py-8">
          <Today />
        </div>
      </div>
      <Footer />
    </div>
  );
}
