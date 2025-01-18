import { Button } from "@/components/ui/button";
import { Calendar, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { Project } from "@/data/projects";

interface ProjectInfoProps {
  project: Project;
}

export const ProjectInfo = ({ project }: ProjectInfoProps) => {
  return (
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
  );
};