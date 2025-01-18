import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { productFormSchema } from "./schema";
import type { ProductFormValues } from "./schema";
import { BasicFields } from "./fields/BasicFields";
import { DynamicFields } from "./fields/DynamicFields";

interface ProductFormProps {
  product?: any;
  onSuccess: () => void;
}

export const ProductForm = ({ product, onSuccess }: ProductFormProps) => {
  const { toast } = useToast();
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: product?.name || "",
      slug: product?.slug || "",
      description: product?.description || "",
      price: product?.price?.toString() || "",
      category_id: product?.category_id || "",
      product_type_id: product?.product_type_id || "",
      sort_order: product?.sort_order || 0,
      is_active: product?.is_active ?? true,
      details: product?.details || {},
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("rental_categories")
        .select("*")
        .order("sort_order");
      
      if (error) throw error;
      return data;
    },
  });

  const { data: productTypes } = useQuery({
    queryKey: ["product-types"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("product_types")
        .select("*");
      
      if (error) throw error;
      return data;
    },
  });

  const selectedProductType = productTypes?.find(
    (type) => type.id === form.watch("product_type_id")
  );

  useEffect(() => {
    if (selectedProductType?.form_schema) {
      // Reset details when product type changes
      form.setValue("details", {});
    }
  }, [form.watch("product_type_id")]);

  const onSubmit = async (values: ProductFormValues) => {
    try {
      if (product) {
        const { error: productError } = await supabase
          .from("products")
          .update({
            name: values.name,
            slug: values.slug,
            description: values.description,
            price: values.price,
            category_id: values.category_id,
            product_type_id: values.product_type_id,
            sort_order: values.sort_order,
            is_active: values.is_active,
          })
          .eq("id", product.id);

        if (productError) throw productError;

        if (Object.keys(values.details).length > 0) {
          const { error: detailsError } = await supabase
            .from("product_details")
            .upsert({
              product_id: product.id,
              details: values.details,
            });

          if (detailsError) throw detailsError;
        }

        toast({ description: "Product updated successfully" });
      } else {
        const { data: newProduct, error: productError } = await supabase
          .from("products")
          .insert({
            name: values.name,
            slug: values.slug,
            description: values.description,
            price: values.price,
            category_id: values.category_id,
            product_type_id: values.product_type_id,
            sort_order: values.sort_order,
            is_active: values.is_active,
          })
          .select()
          .single();

        if (productError) throw productError;

        if (Object.keys(values.details).length > 0) {
          const { error: detailsError } = await supabase
            .from("product_details")
            .insert({
              product_id: newProduct.id,
              details: values.details,
            });

          if (detailsError) throw detailsError;
        }

        toast({ description: "Product created successfully" });
      }
      onSuccess();
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: error.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <FormField
          control={form.control}
          name="product_type_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Type</FormLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a product type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {productTypes?.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <BasicFields categories={categories || []} />

        {selectedProductType?.form_schema && (
          <div className="space-y-4 border-t pt-4">
            <h3 className="font-medium">Product Type Details</h3>
            <DynamicFields schema={selectedProductType.form_schema} />
          </div>
        )}

        <Button type="submit" className="w-full">
          {product ? "Update" : "Create"} Product
        </Button>
      </form>
    </Form>
  );
};
