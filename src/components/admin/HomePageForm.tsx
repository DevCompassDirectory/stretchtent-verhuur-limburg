import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ImageSelector } from "./ImageSelector";
import { ContentSection } from "./ContentSection";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import type { HomePageContent } from "@/types/home";

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
        <ContentSection
          title="Hero Section"
          fields={[
            {
              name: "hero_title",
              label: "Title",
              description: "The main heading of the hero section",
            },
            {
              name: "hero_subtitle",
              label: "Subtitle",
              description: "The subtitle text below the main heading",
            },
            {
              name: "hero_image",
              label: "Background Image",
              description: "The background image for the hero section",
              type: "image",
              altTextField: "hero_image_alt",
            },
            {
              name: "hero_image_alt",
              label: "Image Alt Text",
              description: "Alternative text for the hero image",
            },
          ]}
          form={form}
        />

        <ContentSection
          title="About Section"
          fields={[
            {
              name: "about_title",
              label: "Title",
              description: "The heading for the about section",
            },
            {
              name: "about_description",
              label: "Description",
              description: "The main text content for the about section",
              type: "textarea",
            },
            {
              name: "about_image",
              label: "Image",
              description: "The image for the about section",
              type: "image",
              altTextField: "about_image_alt",
            },
            {
              name: "about_image_alt",
              label: "Image Alt Text",
              description: "Alternative text for the about image",
            },
          ]}
          form={form}
        />

        <ContentSection
          title="Features Section"
          fields={[
            {
              name: "features_title",
              label: "Title",
              description: "The heading for the features section",
            },
            {
              name: "features_subtitle",
              label: "Subtitle",
              description: "The subtitle text for the features section",
            },
          ]}
          form={form}
        />

        <ContentSection
          title="Testimonials Section"
          fields={[
            {
              name: "testimonials_title",
              label: "Title",
              description: "The heading for the testimonials section",
            },
            {
              name: "testimonials_subtitle",
              label: "Subtitle",
              description: "The subtitle text for the testimonials section",
            },
          ]}
          form={form}
        />

        <ContentSection
          title="CTA Section"
          fields={[
            {
              name: "cta_title",
              label: "Title",
              description: "The heading for the CTA section",
            },
            {
              name: "cta_description",
              label: "Description",
              description: "The main text content for the CTA section",
              type: "textarea",
            },
          ]}
          form={form}
        />

        <ContentSection
          title="SEO Settings"
          fields={[
            {
              name: "meta_title",
              label: "Meta Title",
              description: "The title tag for SEO",
            },
            {
              name: "meta_description",
              label: "Meta Description",
              description: "The meta description for SEO",
              type: "textarea",
            },
            {
              name: "og_title",
              label: "OG Title",
              description: "The Open Graph title for social sharing",
            },
            {
              name: "og_description",
              label: "OG Description",
              description: "The Open Graph description for social sharing",
              type: "textarea",
            },
            {
              name: "og_image",
              label: "OG Image",
              description: "The Open Graph image for social sharing",
              type: "image",
            },
          ]}
          form={form}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
};
