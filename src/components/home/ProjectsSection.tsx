import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ProjectCard";

export const ProjectsSection = () => {
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Recente Projecten</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ontdek hoe wij verschillende evenementen hebben getransformeerd met onze stretchtenten
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProjectCard
            id="1"
            image="/photo-1482938289607-e9573fc25ebb"
            title="Bruiloft in Kasteel Hoensbroek"
            description="Een elegante stretchtent setup voor een intieme bruiloft in de tuinen van Kasteel Hoensbroek."
            date="15 Juni 2023"
            category="Bruiloft"
          />
          <ProjectCard
            id="2"
            image="/photo-1509316975850-ff9c5deb0cd9"
            title="Bedrijfsevenement Maastricht"
            description="Grote stretchtent configuratie voor een corporate event met meer dan 200 gasten."
            date="22 Juli 2023"
            category="Zakelijk"
          />
          <ProjectCard
            id="3"
            image="/photo-1513836279014-a89f7a76ae86"
            title="Tuinfeest in Valkenburg"
            description="Gezellige stretchtent opstelling voor een privé tuinfeest met live muziek."
            date="8 Augustus 2023"
            category="Feest"
          />
        </div>
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <a href="/projects">Bekijk Alle Projecten</a>
          </Button>
        </div>
      </div>
    </section>
  );
};