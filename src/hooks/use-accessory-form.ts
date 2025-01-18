import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Accessory } from "@/types/accessory";

interface FormValues {
  name: string;
  slug: string;
  type: "tent" | "floor" | "lighting" | "furniture";
  description: string;
  short_description: string;
  image: string;
  display_order: number;
}

export const useAccessoryForm = (
  accessory: Accessory | null,
  onSuccess: () => void,
  onOpenChange: (open: boolean) => void
) => {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    defaultValues: accessory ? {
      name: accessory.name,
      slug: accessory.slug,
      type: accessory.type,
      description: accessory.description,
      short_description: accessory.short_description,
      image: accessory.image,
      display_order: accessory.display_order || 0,
    } : {
      name: "",
      slug: "",
      type: "tent",
      description: "",
      short_description: "",
      image: "",
      display_order: 0,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      if (accessory) {
        const { error } = await supabase
          .from("accessories")
          .update(data)
          .eq("id", accessory.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Accessory updated successfully",
        });
      } else {
        const { error } = await supabase
          .from("accessories")
          .insert([data]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Accessory created successfully",
        });
      }

      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving accessory:", error);
      toast({
        title: "Error",
        description: "Failed to save accessory",
        variant: "destructive",
      });
    }
  };

  return { form, onSubmit };
};