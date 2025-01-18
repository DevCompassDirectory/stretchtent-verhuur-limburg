import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import type { ProductFormValues } from "../schema";

export const useProductSubmit = (onSuccess: () => void) => {
  const { toast } = useToast();

  const handleSubmit = async (values: ProductFormValues, productId?: string) => {
    try {
      if (productId) {
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
          .eq("id", productId);

        if (productError) throw productError;

        if (Object.keys(values.details).length > 0) {
          const { error: detailsError } = await supabase
            .from("product_details")
            .upsert({
              product_id: productId,
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

  return handleSubmit;
};