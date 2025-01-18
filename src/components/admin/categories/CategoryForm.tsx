import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { categoryFormSchema, type CategoryFormValues } from "./schema";
import { BasicFields } from "./fields/BasicFields";
import { ParentCategoryField } from "./fields/ParentCategoryField";
import { AdvancedFields } from "./fields/AdvancedFields";

interface CategoryFormProps {
  category?: any;
  categories?: any[];
  onSuccess: () => void;
}

export const CategoryForm = ({ category, categories, onSuccess }: CategoryFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: category?.name || "",
      slug: category?.slug || "",
      description: category?.description || "",
      parent_id: category?.parent_id || undefined,
      sort_order: category?.sort_order || 0,
      is_active: category?.is_active ?? true,
    },
  });

  const onSubmit = async (values: CategoryFormValues) => {
    setIsLoading(true);
    try {
      if (category) {
        const { error } = await supabase
          .from("rental_categories")
          .update({
            name: values.name,
            slug: values.slug,
            description: values.description,
            parent_id: values.parent_id === "null" ? null : values.parent_id,
            sort_order: values.sort_order,
            is_active: values.is_active,
          })
          .eq("id", category.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("rental_categories")
          .insert({
            name: values.name,
            slug: values.slug,
            description: values.description,
            parent_id: values.parent_id === "null" ? null : values.parent_id,
            sort_order: values.sort_order,
            is_active: values.is_active,
          });
        if (error) throw error;
      }
      toast({
        title: "Success",
        description: `Category ${category ? "updated" : "created"} successfully`,
      });
      onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <BasicFields form={form} />
        <ParentCategoryField form={form} categories={categories} />
        <AdvancedFields form={form} />

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Saving..." : category ? "Update Category" : "Create Category"}
        </Button>
      </form>
    </Form>
  );
};