import { ArrowRight } from "lucide-react";
import type { HomePageContent } from "@/types/home";

interface AboutSectionProps {
  content: HomePageContent;
}

export const AboutSection = ({ content }: AboutSectionProps) => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">{content.about_title}</h2>
            <p className="text-muted-foreground">
              {content.about_description}
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <ArrowRight className="text-primary" size={20} />
                <span>Professionele op- en afbouw</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="text-primary" size={20} />
                <span>Flexibele configuraties</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="text-primary" size={20} />
                <span>Weerbestendige kwaliteit</span>
              </li>
            </ul>
          </div>
          <div className="relative aspect-square">
            <img
              src={content.about_image}
              alt={content.about_image_alt || "Stretchtent opgezet in een tuin"}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};