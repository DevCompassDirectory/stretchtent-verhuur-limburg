import { useHomeContent } from "@/hooks/use-home-content";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";
import { useEffect } from "react";

const Home = () => {
  const { data: content, isLoading, error } = useHomeContent();

  useEffect(() => {
    if (content) {
      // Update meta tags
      document.title = content.meta_title;
      document.querySelector('meta[name="description"]')?.setAttribute("content", content.meta_description);
      document.querySelector('meta[property="og:title"]')?.setAttribute("content", content.og_title);
      document.querySelector('meta[property="og:description"]')?.setAttribute("content", content.og_description);
      document.querySelector('meta[property="og:image"]')?.setAttribute("content", content.og_image);
    }
  }, [content]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error || !content) {
    return <div className="min-h-screen flex items-center justify-center">Error loading content</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection content={content} />
      <AboutSection content={content} />
      <FeaturesSection content={content} />
      <ProjectsSection />
      <TestimonialsSection content={content} />
      <CTASection content={content} />
    </div>
  );
};

export default Home;