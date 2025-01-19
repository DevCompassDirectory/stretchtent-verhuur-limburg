import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import type { HomePageContent } from "@/types/home";
import { NavbarSection } from "./sections/NavbarSection";
import { HeroSection } from "./sections/HeroSection";
import { AboutSection } from "./sections/AboutSection";
import { FeaturesSection } from "./sections/FeaturesSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import { CTASection } from "./sections/CTASection";
import { SEOSection } from "./sections/SEOSection";

interface HomePageFormProps {
  initialContent: HomePageContent;
}

export const HomePageForm = ({ initialContent }: HomePageFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const form = useForm<HomePageContent>({
    defaultValues: initialContent,
  });

  const onSubmit = async (data: HomePageContent) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("home_page_content")
        .update(data)
        .eq("id", initialContent.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Home page content has been updated.",
      });
    } catch (error) {
      console.error("Error updating content:", error);
      toast({
        title: "Error",
        description: "Failed to update home page content.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <NavbarSection form={form} />
        <HeroSection form={form} />
        <AboutSection form={form} />
        <FeaturesSection form={form} />
        <TestimonialsSection form={form} />
        <CTASection form={form} />
        <SEOSection form={form} />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
};