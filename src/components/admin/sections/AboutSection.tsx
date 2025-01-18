import { ContentSection } from "../ContentSection";
import type { UseFormReturn } from "react-hook-form";
import type { HomePageContent } from "@/types/home";

interface AboutSectionProps {
  form: UseFormReturn<HomePageContent>;
}

export const AboutSection = ({ form }: AboutSectionProps) => {
  return (
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
  );
};