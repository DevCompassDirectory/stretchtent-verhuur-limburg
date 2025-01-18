import { Shield, Clock, Umbrella, Users } from "lucide-react";
import type { HomePageContent } from "@/types/home";

interface FeaturesSectionProps {
  content: HomePageContent;
}

export const FeaturesSection = ({ content }: FeaturesSectionProps) => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{content.features_title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {content.features_subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Shield className="w-10 h-10 text-primary" />}
            title="Kwaliteitsgarantie"
            description="Premium materialen en professionele installatie voor elk evenement"
          />
          <FeatureCard
            icon={<Clock className="w-10 h-10 text-primary" />}
            title="Flexibele Planning"
            description="Snelle reactietijd en flexibele op- en afbouw tijden"
          />
          <FeatureCard
            icon={<Umbrella className="w-10 h-10 text-primary" />}
            title="Weerbestendig"
            description="Bescherming tegen regen en zon voor zorgeloos genieten"
          />
          <FeatureCard
            icon={<Users className="w-10 h-10 text-primary" />}
            title="Persoonlijke Service"
            description="Deskundig advies en begeleiding van begin tot eind"
          />
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="p-6 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-up">
      <div className="flex flex-col items-center text-center space-y-4">
        {icon}
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};