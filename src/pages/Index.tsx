import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Calculator from "@/components/Calculator";
import Advantages from "@/components/Advantages";
import ContactForm from "@/components/ContactForm";
import SeoContent from "@/components/SeoContent";
import Footer from "@/components/Footer";

const Index = () => {
  const [calcSummary, setCalcSummary] = useState<string>("");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Products />
        <Calculator onOrder={setCalcSummary} />
        <Advantages />
        <ContactForm prefillCalc={calcSummary} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
