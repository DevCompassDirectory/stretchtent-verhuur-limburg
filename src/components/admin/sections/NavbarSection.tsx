import { ContentSection } from "../ContentSection";
import type { UseFormReturn } from "react-hook-form";
import type { HomePageContent } from "@/types/home";

interface NavbarSectionProps {
  form: UseFormReturn<HomePageContent>;
}

export const NavbarSection = ({ form }: NavbarSectionProps) => {
  return (
    <ContentSection
      title="Navbar Settings"
      fields={[
        {
          name: "navbar_logo",
          label: "Logo",
          description: "Upload a logo image to display in the navbar (optional)",
          type: "image",
        },
        {
          name: "navbar_text",
          label: "Text",
          description: "Text to display in the navbar when no logo is set (defaults to 'stretchtent verhuur')",
        },
      ]}
      form={form}
    />
  );
};