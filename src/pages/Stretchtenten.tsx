import { TentCard } from "@/components/TentCard";
import { tents } from "@/data/tents";

const Stretchtenten = () => {
  return (
    <div className="pt-24 pb-20">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center mb-16 fade-in">
          <h1 className="text-4xl font-bold mb-4">Onze Stretchtenten</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ontdek ons assortiment premium stretchtenten, perfect voor elk type evenement
          </p>
        </div>
        <div className="space-y-12">
          {tents.map((tent) => (
            <TentCard key={tent.id} tent={tent} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stretchtenten;