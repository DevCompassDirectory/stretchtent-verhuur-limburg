import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Tent } from "@/types/tent";

interface TentCardProps {
  tent: Tent;
}

export const TentCard = ({ tent }: TentCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg group">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={tent.image}
            alt={tent.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-between p-6">
          <div className="space-y-4">
            <Badge variant="secondary" className="mb-2">
              {tent.size}
            </Badge>
            <h3 className="text-2xl font-semibold">{tent.name}</h3>
            <p className="text-muted-foreground">{tent.description}</p>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-semibold">Capaciteit:</span> {tent.capacity}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Oppervlakte:</span> {tent.specifications.area}
              </p>
            </div>
          </div>
          {tent.isCustomConfig ? (
            <Button className="mt-6" asChild>
              <Link to="/contact" className="flex items-center justify-center gap-2">
                <MessageSquare size={16} />
                Vraag Advies
              </Link>
            </Button>
          ) : (
            <Button variant="outline" className="mt-6" asChild>
              <Link to={`/stretchtenten/${tent.id}`} className="flex items-center justify-center gap-2">
                Bekijk Details
                <ArrowRight size={16} />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};