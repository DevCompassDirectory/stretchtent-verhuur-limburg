import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useProductSubmit } from "../hooks/useProductSubmit";
import * as z from "zod";
import { BasicFields } from "../fields/BasicFields";
import { DynamicFields } from "../fields/DynamicFields";

const baseProductSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  description: z.string().optional(),
  price: z.string().min(1, "Price is required").transform((val) => Number(val)),
  category_id: z.string().min(1, "Category is required"),
  sort_order: z.number().int().min(0),
  is_active: z.boolean(),
});

export type BaseProductFormValues = z.infer<typeof baseProductSchema>;

interface BaseProductFormProps {
  product?: any;
  onSuccess: () => void;
  productTypeId: string;
  extraFields?: React.ReactNode;
}

export const BaseProductForm = ({ 
  product, 
  onSuccess, 
  productTypeId,
  extraFields 
}: BaseProductFormProps) => {
  const form = useForm<BaseProductFormValues>({
    resolver: zodResolver(baseProductSchema),
    defaultValues: {
      name: product?.name || "",
      slug: product?.slug || "",
      description: product?.description || "",
      price: product?.price?.toString() || "",
      category_id: product?.category_id || "",
      sort_order: product?.sort_order || 0,
      is_active: product?.is_active ?? true,
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["rental-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("rental_categories")
        .select("*")
        .order("sort_order");
      
      if (error) throw error;
      return data;
    },
  });

  const handleSubmit = useProductSubmit(onSuccess);

  const onSubmit = async (values: BaseProductFormValues) => {
    await handleSubmit({
      ...values,
      product_type_id: productTypeId,
      details: {},
    }, product?.id);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <BasicFields categories={categories || []} />
        {extraFields}
        <Button type="submit" className="w-full">
          {product ? "Update" : "Create"} Product
        </Button>
      </form>
    </Form>
  );
};