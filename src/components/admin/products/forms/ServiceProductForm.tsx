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

const serviceDetailsSchema = z.object({
  duration: z.string().min(1, "Duration is required"),
  included: z.string().min(1, "Included services are required"),
  requirements: z.string().optional(),
});

interface ServiceProductFormProps {
  product?: any;
  onSuccess: () => void;
  productTypeId: string;
}

export const ServiceProductForm = ({ 
  product, 
  onSuccess,
  productTypeId 
}: ServiceProductFormProps) => {
  const form = useForm({
    resolver: zodResolver(serviceDetailsSchema),
    defaultValues: {
      duration: product?.details?.duration || "",
      included: product?.details?.included || "",
      requirements: product?.details?.requirements || "",
    },
  });

  const extraFields = (
    <div className="space-y-4 border-t pt-4">
      <h3 className="font-medium">Service Details</h3>
      <FormField
        control={form.control}
        name="duration"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Duration</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="included"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Included Services</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="requirements"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Requirements</FormLabel>
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