import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { ProjectInfo } from "@/components/project/ProjectInfo";
import { ProjectGallery } from "@/components/project/ProjectGallery";
import { ProjectImageCarousel } from "@/components/project/ProjectImageCarousel";
import { useProject } from "@/hooks/use-projects";
import { Skeleton } from "@/components/ui/skeleton";

const ProjectDetail = () => {
  const { id } = useParams();
  const { data: project, isLoading } = useProject(id!);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  if (isLoading) {
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
            <div className="space-y-4">
              <Skeleton className="h-[400px] w-full" />
              <div className="grid grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="aspect-square w-full" />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <div className="space-y-4">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

  // Create allImages array from main_image and project_images
  const allImages = [project.main_image, ...project.project_images.map(img => img.image_url)];

  // Transform project data to match the Project type
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