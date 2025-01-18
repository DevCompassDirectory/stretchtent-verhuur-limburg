import { ContentSection } from "../ContentSection";
import type { UseFormReturn } from "react-hook-form";
import type { HomePageContent } from "@/types/home";

interface CTASectionProps {
  form: UseFormReturn<HomePageContent>;
}

export const CTASection = ({ form }: CTASectionProps) => {
  return (
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
  );
};