import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { ProjectInfo } from "@/components/project/ProjectInfo";
import { ProjectGallery } from "@/components/project/ProjectGallery";
import { ProjectImageCarousel } from "@/components/project/ProjectImageCarousel";
import { useProject } from "@/hooks/use-projects";
import { ProjectDetailSkeleton } from "@/components/project/ProjectDetailSkeleton";
import { ProjectNotFound } from "@/components/project/ProjectNotFound";

const ProjectDetail = () => {
  const { id } = useParams();
  const { data: project, isLoading } = useProject(id!);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  if (isLoading) {
    return <ProjectDetailSkeleton />;
  }

  if (!project) {
    return <ProjectNotFound />;
  }

  const allImages = [project.main_image, ...project.project_images.map(img => img.image_url)];

  const transformedProject = {
    ...project,
    image: project.main_image,
    fullDescription: project.full_description,
    gallery: project.project_images.map(img => img.image_url)
  };

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
            project={transformedProject}
            onImageClick={setSelectedImageIndex} 
          />
          <ProjectInfo project={transformedProject} />
        </div>

        <ProjectImageCarousel
          project={transformedProject}
          selectedImageIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
          allImages={allImages}
        />
      </div>
    </div>
  );
};

export default ProjectDetail;