import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Tag, X } from "lucide-react";
import { projects } from "@/data/projects";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";

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
          <div>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-[400px] object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => setSelectedImageIndex(0)}
            />
            <div className="grid grid-cols-3 gap-4 mt-4">
              {project.gallery.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${project.title} - foto ${index + 1}`}
                  className="w-full aspect-square object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedImageIndex(index + 1)}
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar size={16} />
                  {project.date}
                </span>
                <span className="flex items-center gap-2">
                  <Tag size={16} />
                  {project.category}
                </span>
              </div>
            </div>

            <div className="prose prose-gray max-w-none">
              {project.fullDescription.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Specificaties</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Tent Afmeting</p>
                  <p className="font-medium">{project.specs.tentSize}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Capaciteit</p>
                  <p className="font-medium">{project.specs.capacity}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Setup</p>
                  <p className="font-medium">{project.specs.setup}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Locatie</p>
                  <p className="font-medium">{project.specs.location}</p>
                </div>
              </div>
            </div>

            <Button size="lg" asChild>
              <Link to="/contact">Offerte Aanvragen</Link>
            </Button>
          </div>
        </div>

        <Dialog open={selectedImageIndex !== null} onOpenChange={() => setSelectedImageIndex(null)}>
          <DialogContent className="max-w-[90vw] w-fit p-8 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-50">
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </DialogClose>
            
            <Carousel 
              className="w-full max-w-[1200px]" 
              opts={{
                startIndex: selectedImageIndex || 0,
              }}
            >
              <CarouselContent>
                {allImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="flex items-center justify-center">
                      <img
                        src={image}
                        alt={`${project.title} - foto ${index + 1}`}
                        className="w-auto max-w-[80vw] max-h-[80vh] object-contain rounded-lg"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProjectDetail;