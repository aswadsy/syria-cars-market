import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedCars from "@/components/FeaturedCars";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedCars />
      <Stats />
      <Footer />
    </div>
  );
};

export default Index;
