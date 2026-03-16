import Navbar from "@/react-app/components/layout/Navbar";
import Footer from "@/react-app/components/layout/Footer";
import HeroSection from "@/react-app/components/home/HeroSection";
import CategoryGrid from "@/react-app/components/home/CategoryGrid";
import FeaturedSheets from "@/react-app/components/home/FeaturedSheets";
import Testimonials from "@/react-app/components/home/Testimonials";
import FAQ from "@/react-app/components/home/FAQ";
import CTASection from "@/react-app/components/home/CTASection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <CategoryGrid />
        <FeaturedSheets />
        <Testimonials />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
