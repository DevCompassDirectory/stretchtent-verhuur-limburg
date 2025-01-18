import { Project } from "@/data/projects";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { X } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel/index";

interface ProjectImageCarouselProps {
  project: Project;
  selectedImageIndex: number | null;
  onClose: () => void;
  allImages: string[];
}

export const ProjectImageCarousel = ({
  project,
  selectedImageIndex,
  onClose,
  allImages,
}: ProjectImageCarouselProps) => {
  return (
    <Dialog open={selectedImageIndex !== null} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-50">
          <X className="h-6 w-6" />
          <span className="sr-only">Close</span>
        </DialogClose>
        
        <div className="relative w-full h-[80vh] flex items-center justify-center p-4 bg-primary/10 rounded-lg">
          <Carousel 
            className="w-full h-full" 
            opts={{
              startIndex: selectedImageIndex || 0,
            }}
          >
            <CarouselContent className="h-full">
              {allImages.map((image, index) => (
                <CarouselItem key={index} className="h-full flex items-center justify-center">
                  <img
                    src={image}
                    alt={`${project.title} - foto ${index + 1}`}
                    className="max-w-full max-h-[80vh] object-contain rounded-lg"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      </DialogContent>
    </Dialog>
  );
};