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

const tentDetailsSchema = z.object({
  size: z.string().min(1, "Size is required"),
  capacity: z.string().min(1, "Capacity is required"),
});

interface TentProductFormProps {
  product?: any;
  onSuccess: () => void;
  productTypeId: string;
}

export const TentProductForm = ({ 
  product, 
  onSuccess,
  productTypeId 
}: TentProductFormProps) => {
  const form = useForm({
    resolver: zodResolver(tentDetailsSchema),
    defaultValues: {
      size: product?.details?.size || "",
      capacity: product?.details?.capacity || "",
    },
  });

  const extraFields = (
    <div className="space-y-4 border-t pt-4">
      <h3 className="font-medium">Tent Details</h3>
      <FormField
        control={form.control}
        name="size"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Size</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="capacity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Capacity</FormLabel>
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