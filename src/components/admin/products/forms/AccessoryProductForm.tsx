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

const accessoryDetailsSchema = z.object({
  material: z.string().min(1, "Material is required"),
  dimensions: z.string().min(1, "Dimensions are required"),
});

interface AccessoryProductFormProps {
  product?: any;
  onSuccess: () => void;
  productTypeId: string;
}

export const AccessoryProductForm = ({ 
  product, 
  onSuccess,
  productTypeId 
}: AccessoryProductFormProps) => {
  const form = useForm({
    resolver: zodResolver(accessoryDetailsSchema),
    defaultValues: {
      material: product?.details?.material || "",
      dimensions: product?.details?.dimensions || "",
    },
  });

  const extraFields = (
    <div className="space-y-4 border-t pt-4">
      <h3 className="font-medium">Accessory Details</h3>
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