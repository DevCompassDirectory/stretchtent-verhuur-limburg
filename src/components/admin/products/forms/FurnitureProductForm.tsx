import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BaseProductForm } from "./BaseProductForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const furnitureDetailsSchema = z.object({
  material: z.string().min(1, "Material is required"),
  dimensions: z.string().min(1, "Dimensions are required"),
  weight: z.string().min(1, "Weight is required"),
  care_instructions: z.string().optional(),
});

interface FurnitureProductFormProps {
  product?: any;
  onSuccess: () => void;
  productTypeId: string;
}

export const FurnitureProductForm = ({ 
  product, 
  onSuccess,
  productTypeId 
}: FurnitureProductFormProps) => {
  const form = useForm({
    resolver: zodResolver(furnitureDetailsSchema),
    defaultValues: {
      material: product?.details?.material || "",
      dimensions: product?.details?.dimensions || "",
      weight: product?.details?.weight || "",
      care_instructions: product?.details?.care_instructions || "",
    },
  });

  const extraFields = (
    <div className="space-y-4 border-t pt-4">
      <h3 className="font-medium">Furniture Details</h3>
      <FormField
        control={form.control}
        name="material"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Material</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="dimensions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Dimensions</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="weight"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Weight</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="care_instructions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Care Instructions</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );

  return (
    <BaseProductForm
      product={product}
      onSuccess={onSuccess}
      productTypeId={productTypeId}
      extraFields={extraFields}
    />
  );
};