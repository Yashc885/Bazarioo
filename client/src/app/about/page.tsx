import Navbar from './../../components/Common/Navbar.jsx';
import Footer from './../../components/Common/Footer.jsx';
import About from './../../components/About/About.jsx';
export default function Home() {
  return (
    <div className="pt-28  "> 
    <Navbar />
    <div className="min-h-screen pl-2 md:pl-4 lg:pl-8 pr-2 lg:pr-2">
        <About />
    </div>
    <Footer />
    </div>
  );
}
