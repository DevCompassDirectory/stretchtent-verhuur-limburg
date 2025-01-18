import { ContentSection } from "../ContentSection";
import type { UseFormReturn } from "react-hook-form";
import type { HomePageContent } from "@/types/home";

interface TestimonialsSectionProps {
  form: UseFormReturn<HomePageContent>;
}

export const TestimonialsSection = ({ form }: TestimonialsSectionProps) => {
  return (
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
  );
};