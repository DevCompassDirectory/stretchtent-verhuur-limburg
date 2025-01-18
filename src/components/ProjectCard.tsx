import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
}

export const ProjectCard = ({
  id,
  title,
  description,
  image,
  date,
  category,
}: ProjectCardProps) => {
  return (
    <Link to={`/projects/${id}`} className="group h-full">
      <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg">
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="flex-1 flex flex-col p-6">
          <div className="flex-1">
            <Badge variant="secondary" className="mb-3">
              {category}
            </Badge>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground line-clamp-2">{description}</p>
          </div>
        </CardContent>
        <CardFooter className="mt-auto px-6 py-4 border-t bg-secondary/50 flex justify-between items-center">
          <time className="text-sm text-muted-foreground">{date}</time>
          <Button variant="secondary" size="sm">
            Bekijk Project
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};