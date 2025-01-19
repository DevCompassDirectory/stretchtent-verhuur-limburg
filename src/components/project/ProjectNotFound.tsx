import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const ProjectNotFound = () => {
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
};