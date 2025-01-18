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
import { ImageSelector } from "@/components/admin/ImageSelector";

const tentDetailsSchema = z.object({
  breedte: z.string().min(1, "Breedte is required"),
  lengte: z.string().min(1, "Lengte is required"),
  hoogte: z.string().min(1, "Hoogte is required"),
  oppervlakte: z.string().min(1, "Oppervlakte is required"),
  capaciteit: z.string().min(1, "Capaciteit is required"),
  image: z.string().optional(),
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
      breedte: product?.details?.breedte || "",
      lengte: product?.details?.lengte || "",
      hoogte: product?.details?.hoogte || "",
      oppervlakte: product?.details?.oppervlakte || "",
      capaciteit: product?.details?.capaciteit || "",
      image: product?.details?.image || "",
    },
  });

  const extraFields = (
    <div className="space-y-4 border-t pt-4">
      <h3 className="font-medium">Tent Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="breedte"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Breedte</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lengte"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lengte</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hoogte"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hoogte</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="oppervlakte"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Oppervlakte</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="capaciteit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capaciteit</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product Image</FormLabel>
            <FormControl>
              <ImageSelector
                value={field.value}
                onChange={field.onChange}
              />
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