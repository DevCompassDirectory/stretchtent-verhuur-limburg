import { Project } from "@/data/projects";

interface ProjectGalleryProps {
  project: Project;
  onImageClick: (index: number) => void;
}

export const ProjectGallery = ({ project, onImageClick }: ProjectGalleryProps) => {
  return (
    <div>
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-[400px] object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
        onClick={() => onImageClick(0)}
      />
      <div className="grid grid-cols-3 gap-4 mt-4">
        {project.gallery.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${project.title} - foto ${index + 1}`}
            className="w-full aspect-square object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => onImageClick(index + 1)}
          />
        ))}
      </div>
    </div>
  );
};