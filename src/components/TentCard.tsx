import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Tent } from "@/types/tent";

interface TentCardProps {
  tent: Tent;
}

export const TentCard = ({ tent }: TentCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={tent.image}
          alt={tent.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardContent className="p-6">
        <Badge variant="secondary" className="mb-3">
          {tent.size}
        </Badge>
        <h3 className="text-xl font-semibold mb-2">{tent.name}</h3>
        <p className="text-muted-foreground line-clamp-2">{tent.description}</p>
        <div className="mt-4 space-y-2">
          <p className="text-sm">
            <span className="font-semibold">Capaciteit:</span> {tent.capacity}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Oppervlakte:</span> {tent.specifications.area}
          </p>
        </div>
      </CardContent>
      <CardFooter className="px-6 py-4 border-t bg-secondary/50">
        <Button variant="outline" className="w-full" asChild>
          <Link to={`/stretchtenten/${tent.id}`} className="flex items-center justify-center gap-2">
            Bekijk Details
            <ArrowRight size={16} />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};