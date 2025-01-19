import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useAccessory } from "@/hooks/use-accessories";

const AccessoryDetail = () => {
  const { slug } = useParams();
  const { data: accessory, isLoading, error } = useAccessory(slug || "");

  if (isLoading) {
    return (
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="h-96 bg-muted animate-pulse rounded-lg" />
        </div>
      </div>
    );
  }

  if (error || !accessory) {
    return (
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold">Accessoire niet gevonden</h1>
          <Button asChild className="mt-4">
            <Link to="/accessoires">Terug naar Accessoires</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <Button variant="ghost" className="mb-8" asChild>
          <Link to="/accessoires" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Terug naar Accessoires
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative aspect-square">
            <img
              src={accessory.image}
              alt={accessory.name}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
          
          <div className="space-y-6">
            <h1 className="text-4xl font-bold">{accessory.name}</h1>
            <p className="text-muted-foreground">{accessory.description}</p>

            <Button size="lg" asChild>
              <Link to="/contact">Offerte Aanvragen</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessoryDetail;