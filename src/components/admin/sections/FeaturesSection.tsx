import { ContentSection } from "../ContentSection";
import type { UseFormReturn } from "react-hook-form";
import type { HomePageContent } from "@/types/home";

interface FeaturesSectionProps {
  form: UseFormReturn<HomePageContent>;
}

export const FeaturesSection = ({ form }: FeaturesSectionProps) => {
  return (
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
  );
};