import Sidebar from "./Sidebar";
import Carousel from "./Carousel";

const HomeSection = () => {
  return (
    <section className="flex max-w-screen-xl mx-auto">
      {/* Sidebar (Hidden on Mobile) */}
      <Sidebar />

      {/* Carousel */}
      <div className="flex-1">
        <Carousel />
      </div>
    </section>
  );
};

export default HomeSection;
