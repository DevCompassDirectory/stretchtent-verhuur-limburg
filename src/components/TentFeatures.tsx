import { Check } from "lucide-react";

interface TentFeaturesProps {
  features: string[];
}

export const TentFeatures = ({ features }: TentFeaturesProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Kenmerken</h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <Check size={16} className="text-primary" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};