import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Tent } from "@/types/tent";
import { useEffect } from "react";

interface FormValues {
  name: string;
  slug: string;
  size: string;
  capacity: string;
  description: string;
  short_description: string;
  features: string[];
  image: string;
  width: string;
  length: string;
  height: string;
  area: string;
  is_custom_config: boolean;
}

export const useStretchTentForm = (
  tent: Tent | null,
  onSuccess: () => void,
  onOpenChange: (open: boolean) => void
) => {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      slug: "",
      size: "",
      capacity: "",
      description: "",
      short_description: "",
      features: [],
      image: "",
      width: "",
      length: "",
      height: "",
      area: "",
      is_custom_config: false,
    },
  });

  useEffect(() => {
    if (tent) {
      form.reset({
        name: tent.name,
        slug: tent.slug,
        size: tent.size,
        capacity: tent.capacity,
        description: tent.description,
        short_description: tent.short_description,
        features: tent.features,
        image: tent.image,
        width: tent.width,
        length: tent.length,
        height: tent.height,
        area: tent.area,
        is_custom_config: tent.is_custom_config || false,
      });
    } else {
      form.reset({
        name: "",
        slug: "",
        size: "",
        capacity: "",
        description: "",
        short_description: "",
        features: [],
        image: "",
        width: "",
        length: "",
        height: "",
        area: "",
        is_custom_config: false,
      });
    }
  }, [tent, form]);

  const onSubmit = async (data: FormValues) => {
    try {
      if (tent) {
        const { error } = await supabase
          .from("stretchtents")
          .update(data)
          .eq("id", tent.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Stretchtent updated successfully",
        });
      } else {
        const { error } = await supabase
          .from("stretchtents")
          .insert([data]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Stretchtent created successfully",
        });
      }

      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving stretchtent:", error);
      toast({
        title: "Error",
        description: "Failed to save stretchtent",
        variant: "destructive",
      });
    }
  };

  return { form, onSubmit };
};