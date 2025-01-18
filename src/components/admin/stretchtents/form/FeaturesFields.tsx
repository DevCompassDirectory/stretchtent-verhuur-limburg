import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface FeaturesFieldsProps {
  form: UseFormReturn<any>;
}

export const FeaturesFields = ({ form }: FeaturesFieldsProps) => {
  return (
    <FormField
      control={form.control}
      name="features"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Features (comma-separated)</FormLabel>
          <FormControl>
            <Input
              {...field}
              value={field.value?.join(", ") || ""}
              onChange={(e) =>
                field.onChange(
                  e.target.value
                    .split(",")
                    .map((feature) => feature.trim())
                    .filter(Boolean)
                )
              }
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};