import { ContentSection } from "../ContentSection";
import type { UseFormReturn } from "react-hook-form";
import type { HomePageContent } from "@/types/home";

interface HeroSectionProps {
  form: UseFormReturn<HomePageContent>;
}

export const HeroSection = ({ form }: HeroSectionProps) => {
  return (
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
  );
};