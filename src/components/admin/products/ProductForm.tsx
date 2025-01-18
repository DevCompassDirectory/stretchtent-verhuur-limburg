import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { DynamicFields } from "./DynamicFields";
import { ImageSelector } from "../ImageSelector";
import type { Product, ProductType } from "@/types/product";

interface ProductFormProps {
  product?: Product | null;
  onClose: () => void;
}

interface FormValues extends Omit<Product, 'id' | 'created_at' | 'updated_at'> {
  details: Record<string, any>;
  images: string[];
}

export const ProductForm = ({ product, onClose }: ProductFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<FormValues>({
    defaultValues: product || {
      name: "",
      slug: "",
      description: "",
      price: null,
      category_id: null,
      product_type_id: null,
      is_active: true,
      sort_order: 0,
      details: {},
      images: [],
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["rental-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("rental_categories")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

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
      return data as ProductType[];
    },
  });

  const selectedProductType = productTypes?.find(
    (type) => type.id === form.watch("product_type_id")
  );

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      if (product) {
        // Update existing product
        const { error: productError } = await supabase
          .from("products")
          .update({
            name: values.name,
            slug: values.slug,
            description: values.description,
            price: values.price,
            category_id: values.category_id,
            product_type_id: values.product_type_id,
            is_active: values.is_active,
            sort_order: values.sort_order,
          })
          .eq("id", product.id);

        if (productError) throw productError;

        const { error: detailsError } = await supabase
          .from("product_details")
          .upsert({
            product_id: product.id,
            details: values.details,
          });

        if (detailsError) throw detailsError;
      } else {
        // Create new product
        const { data: newProduct, error: productError } = await supabase
          .from("products")
          .insert({
            name: values.name,
            slug: values.slug,
            description: values.description,
            price: values.price,
            category_id: values.category_id,
            product_type_id: values.product_type_id,
            is_active: values.is_active,
            sort_order: values.sort_order,
          })
          .select()
          .single();

        if (productError) throw productError;

        const { error: detailsError } = await supabase
          .from("product_details")
          .insert({
            product_id: newProduct.id,
            details: values.details,
          });

        if (detailsError) throw detailsError;
      }

      onClose();
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <Input
              {...form.register("name")}
              placeholder="Product Name"
            />
            <Input
              {...form.register("slug")}
              placeholder="URL Slug"
            />
            <Textarea
              {...form.register("description")}
              placeholder="Description"
            />
            <Input
              {...form.register("price", { valueAsNumber: true })}
              type="number"
              placeholder="Price"
            />
            <Select
              value={form.watch("category_id") || ""}
              onValueChange={(value) => form.setValue("category_id", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={form.watch("product_type_id") || ""}
              onValueChange={(value) => form.setValue("product_type_id", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Product Type" />
              </SelectTrigger>
              <SelectContent>
                {productTypes?.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {selectedProductType && (
              <DynamicFields
                fields={selectedProductType.form_schema.fields}
                values={form.watch("details")}
                onChange={(details) => form.setValue("details", details)}
              />
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Product Images</h3>
          <ImageSelector
            value={form.watch("images")?.[0] || ""}
            onChange={(url) => form.setValue("images", [url])}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Product"}
          </Button>
        </div>
      </form>
    </Form>
  );
};