import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";

const Home = () => {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
};

export default Home;