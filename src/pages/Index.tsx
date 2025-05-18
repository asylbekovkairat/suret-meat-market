import About from "@/components/About";
import Benefits from "@/components/Benefits";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Locations from "@/components/Locations";
import Navbar from "@/components/Navbar";
import Process from "@/components/Process";
import Products from "@/components/Products";
import SEO from "@/components/SEO";
import Testimonials from "@/components/Testimonials";
import React, { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Set page title
    document.title = "SURET - Настоящий шашлык. Без заморочек.";
  }, []);

  return (
    <div className="min-h-screen">
      <SEO
        title="SURET - Настоящий шашлык. Без заморочек."
        description="Свежие мясные полуфабрикаты в натуральном маринаде. Шашлык, стейки и рёбра с доставкой в Бишкеке. Каждый стейк рассчитан на 1 персону, а 1кг мяса хватает на 4 персоны или 5 шампуров."
        keywords="шашлык Бишкек, стейки с доставкой, мясные полуфабрикаты, маринованное мясо, SURET, рёбра, доставка еды"
        canonicalUrl="/"
        ogType="website"
      />
      <Navbar />
      <Hero />
      <About />
      <Products />
      <Benefits />
      <Process />
      <Testimonials />
      {/* <Locations /> */}
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
