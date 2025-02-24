import Navbar from './../../components/Common/Navbar.jsx';
import Footer from './../../components/Common/Footer.jsx';
import Contact from './../../components/Contact/Contact.jsx';
export default function Home() {
  return (
    <div className="pt-28  "> 
    <Navbar />
    <div className="mx-auto pl-2 md:pl-4 lg:pl-8 pr-2 lg:pr-2">
        <Contact />
    </div>
    <Footer />
    </div>
  );
}
