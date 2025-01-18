import type { Tent } from "@/types/tent";

interface TentSpecificationsProps {
  specifications: Tent["specifications"];
}

export const TentSpecifications = ({ specifications }: TentSpecificationsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Specificaties</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Breedte</p>
          <p className="font-medium">{specifications.width}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Lengte</p>
          <p className="font-medium">{specifications.length}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Hoogte</p>
          <p className="font-medium">{specifications.height}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Oppervlakte</p>
          <p className="font-medium">{specifications.area}</p>
        </div>
      </div>
    </div>
  );
};