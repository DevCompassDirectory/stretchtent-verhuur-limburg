import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/data/projects";
import { useState } from "react";
import { ProjectInfo } from "@/components/project/ProjectInfo";
import { ProjectGallery } from "@/components/project/ProjectGallery";
import { ProjectImageCarousel } from "@/components/project/ProjectImageCarousel";

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  if (!project) {
    return (
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold">Project niet gevonden</h1>
          <Button asChild className="mt-4">
            <Link to="/projects">Terug naar Projecten</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Combine main image with gallery for the carousel
  const allImages = [project.image, ...project.gallery];

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <Button variant="ghost" className="mb-8" asChild>
          <Link to="/projects" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Terug naar Projecten
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProjectGallery 
            project={project} 
            onImageClick={setSelectedImageIndex} 
          />
          <ProjectInfo project={project} />
        </div>

        <ProjectImageCarousel
          project={project}
          selectedImageIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
          allImages={allImages}
        />
      </div>
    </div>
  );
};

export default ProjectDetail;