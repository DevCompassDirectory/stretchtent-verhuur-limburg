import { TentCard } from "@/components/TentCard";
import { useTents } from "@/hooks/use-tents";

const Stretchtenten = () => {
  const { data: tents, isLoading, error } = useTents();

  return (
    <div className="pt-24 pb-20">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center mb-16 fade-in">
          <h1 className="text-4xl font-bold mb-4">Onze Stretchtenten</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ontdek ons assortiment premium stretchtenten, perfect voor elk type evenement
          </p>
        </div>
        {isLoading ? (
          <div className="space-y-12">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-96 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-destructive">
            Er is een fout opgetreden bij het laden van de tenten.
          </div>
        ) : (
          <div className="space-y-12">
            {tents?.map((tent) => (
              <TentCard key={tent.id} tent={tent} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Stretchtenten;