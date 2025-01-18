import { useQuery } from "@tanstack/react-query";
import { TentCard } from "@/components/TentCard";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const Stretchtenten = () => {
  const { data: tents, isLoading } = useQuery({
    queryKey: ["tents"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          product_details(*),
          product_images(
            *,
            images(*)
          )
        `)
        .eq("product_type_id", "2529f53f-8a9c-412b-9176-4cc2dbdf02a5")
        .order("sort_order");

      if (error) throw error;
      return data;
    },
  });

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
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton className="h-[300px] w-full" />
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))
          ) : tents?.map((tent) => (
            <TentCard
              key={tent.id}
              tent={{
                id: tent.slug,
                name: tent.name,
                size: `${tent.product_details?.breedte} x ${tent.product_details?.lengte}`,
                capacity: tent.product_details?.capaciteit,
                description: tent.description || "",
                features: [],
                image: tent.product_images?.[0]?.images?.original_url || "/placeholder.svg",
                specifications: {
                  width: tent.product_details?.breedte,
                  length: tent.product_details?.lengte,
                  height: tent.product_details?.hoogte,
                  area: tent.product_details?.oppervlakte
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stretchtenten;