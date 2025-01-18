import { ContentSection } from "../ContentSection";
import type { UseFormReturn } from "react-hook-form";
import type { HomePageContent } from "@/types/home";

interface SEOSectionProps {
  form: UseFormReturn<HomePageContent>;
}

export const SEOSection = ({ form }: SEOSectionProps) => {
  return (
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
  );
};