import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export const ProjectsSection = () => {
  // Only show the first 3 projects on the homepage
  const featuredProjects = projects.slice(0, 3);

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
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
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