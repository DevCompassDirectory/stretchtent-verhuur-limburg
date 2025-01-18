import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ProjectCard";
import { TentSpecifications } from "@/components/TentSpecifications";
import { TentFeatures } from "@/components/TentFeatures";
import { ArrowLeft } from "lucide-react";
import { useTent } from "@/hooks/use-tents";
import { relatedProjects } from "@/data/tents";

const TentDetail = () => {
  const { id } = useParams();
  const { data: tent, isLoading, error } = useTent(id || "");
  const projects = relatedProjects[id as keyof typeof relatedProjects] || [];

  if (isLoading) {
    return (
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="h-96 bg-muted animate-pulse rounded-lg" />
        </div>
      </div>
    );
  }

  if (error || !tent) {
    return (
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold">Tent niet gevonden</h1>
          <Button asChild className="mt-4">
            <Link to="/stretchtenten">Terug naar Stretchtenten</Link>
          </Button>
        </div>
      </div>
    );
  }

  const specifications = {
    width: tent.width,
    length: tent.length,
    height: tent.height,
    area: tent.area,
  };

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <Button variant="ghost" className="mb-8" asChild>
          <Link to="/stretchtenten" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Terug naar Stretchtenten
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative aspect-square">
            <img
              src={tent.image}
              alt={tent.name}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
          
          <div className="space-y-6">
            <h1 className="text-4xl font-bold">{tent.name}</h1>
            <p className="text-muted-foreground">{tent.description}</p>
            
            <TentSpecifications specifications={specifications} />
            <TentFeatures features={tent.features} />

            <Button size="lg" asChild>
              <Link to="/contact">Offerte Aanvragen</Link>
            </Button>
          </div>
        </div>

        {projects.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-8">Gerelateerde Projecten</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TentDetail;
