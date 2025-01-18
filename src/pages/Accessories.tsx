import { useAccessories } from "@/hooks/use-accessories";
import { AccessoryCard } from "@/components/AccessoryCard";

const Accessories = () => {
  const { data: accessories, isLoading, error } = useAccessories();

  return (
    <div className="pt-24 pb-20">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 fade-in">
          <h1 className="text-4xl font-bold mb-4">Onze Accessoires</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ontdek ons assortiment premium accessoires om uw evenement compleet te maken
          </p>
        </div>
        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-96 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-destructive">
            Er is een fout opgetreden bij het laden van de accessoires.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-12">
            {accessories?.map((accessory) => (
              <AccessoryCard key={accessory.id} accessory={accessory} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Accessories;