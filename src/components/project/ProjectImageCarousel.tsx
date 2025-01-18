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
        <div className="relative w-full flex items-center justify-center p-8 bg-primary/20 rounded-lg">
          <Carousel 
            className="w-full" 
            opts={{
              startIndex: selectedImageIndex || 0,
            }}
          >
            <CarouselContent>
              {allImages.map((image, index) => (
                <CarouselItem key={index} className="flex items-center justify-center">
                  <img
                    src={image}
                    alt={`${project.title} - foto ${index + 1}`}
                    className="max-w-full object-contain rounded-lg"
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