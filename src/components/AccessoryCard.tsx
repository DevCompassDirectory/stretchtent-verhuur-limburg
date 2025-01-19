import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Accessory } from "@/types/accessory";

interface AccessoryCardProps {
  accessory: Accessory;
}

export const AccessoryCard = ({ accessory }: AccessoryCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg group">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={accessory.image}
            alt={accessory.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-between p-6">
          <div className="space-y-4">
            <Badge variant="secondary" className="mb-2">
              {accessory.type}
            </Badge>
            <h3 className="text-2xl font-semibold">{accessory.name}</h3>
            <p className="text-muted-foreground">{accessory.short_description}</p>
          </div>
          <Button variant="outline" className="mt-6" asChild>
            <Link to={`/toebehoren/${accessory.slug}`} className="flex items-center justify-center gap-2">
              Bekijk Details
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};