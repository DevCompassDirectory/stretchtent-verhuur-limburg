import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import type { Json } from "@/integrations/supabase/types";

export const useProductSubmit = (onSuccess: () => void) => {
  const { toast } = useToast();

  const handleSubmit = async (values: any, productId?: string) => {
    try {
      const { name, slug, description, price, category_id, product_type_id, sort_order, is_active, ...details } = values;
      
      if (productId) {
        const { error: productError } = await supabase
          .from("products")
          .update({
            name,
            slug,
            description,
            price,
            category_id,
            product_type_id,
            sort_order,
            is_active,
          })
          .eq("id", productId);

        if (productError) throw productError;

        const { error: detailsError } = await supabase
          .from("product_details")
          .upsert({
            product_id: productId,
            details: details as Json,
          });

        if (detailsError) throw detailsError;

        toast({ description: "Product updated successfully" });
      } else {
        const { data: newProduct, error: productError } = await supabase
          .from("products")
          .insert({
            name,
            slug,
            description,
            price,
            category_id,
            product_type_id,
            sort_order,
            is_active,
          })
          .select()
          .single();

        if (productError) throw productError;

        const { error: detailsError } = await supabase
          .from("product_details")
          .insert({
            product_id: newProduct.id,
            details: details as Json,
          });

        if (detailsError) throw detailsError;

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