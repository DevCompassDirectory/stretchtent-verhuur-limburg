import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useProject } from "@/hooks/use-projects";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Database } from "@/integrations/supabase/types";
import { BasicInfoFields } from "./form/BasicInfoFields";
import { ImageFields } from "./form/ImageFields";
import { SpecificationsFields } from "./form/SpecificationsFields";

type ProjectCategory = Database["public"]["Enums"]["project_category"];

export interface ProjectFormValues {
  title: string;
  description: string;
  full_description: string;
  date: string;
  category: ProjectCategory;
  main_image: string;
  specs: {
    tentSize: string;
    capacity: string;
    setup: string;
    location: string;
  };
  gallery: string[];
}

interface ProjectFormProps {
  projectId?: string | null;
  onSuccess?: () => void;
}

export function ProjectForm({ projectId, onSuccess }: ProjectFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: project } = useProject(projectId || "");

  const form = useForm<ProjectFormValues>({
    defaultValues: {
      title: "",
      description: "",
      full_description: "",
      date: new Date().toISOString().split("T")[0],
      category: "bruiloft",
      main_image: "",
      specs: {
        tentSize: "",
        capacity: "",
        setup: "",
        location: "",
      },
      gallery: [],
    },
  });

  useEffect(() => {
    if (project) {
      form.reset({
        title: project.title,
        description: project.description,
        full_description: project.full_description,
        date: project.date,
        category: project.category,
        main_image: project.main_image,
        specs: project.specs,
        gallery: project.project_images.map(img => img.image_url),
      });
    }
  }, [project, form]);

  const onSubmit = async (values: ProjectFormValues) => {
    try {
      if (projectId) {
        const { error: projectError } = await supabase
          .from("projects")
          .update({
            title: values.title,
            description: values.description,
            full_description: values.full_description,
            date: values.date,
            category: values.category,
            main_image: values.main_image,
            specs: values.specs,
          })
          .eq("id", projectId);

        if (projectError) throw projectError;

        const { error: deleteError } = await supabase
          .from("project_images")
          .delete()
          .eq("project_id", projectId);

        if (deleteError) throw deleteError;

        if (values.gallery.length > 0) {
          const { error: galleryError } = await supabase
            .from("project_images")
            .insert(
              values.gallery.map((url, index) => ({
                project_id: projectId,
                image_url: url,
                display_order: index,
              }))
            );

          if (galleryError) throw galleryError;
        }
      } else {
        const { data: newProject, error: projectError } = await supabase
          .from("projects")
          .insert({
            title: values.title,
            description: values.description,
            full_description: values.full_description,
            date: values.date,
            category: values.category,
            main_image: values.main_image,
            specs: values.specs,
          })
          .select()
          .single();

        if (projectError || !newProject) throw projectError;

        if (values.gallery.length > 0) {
          const { error: galleryError } = await supabase
            .from("project_images")
            .insert(
              values.gallery.map((url, index) => ({
                project_id: newProject.id,
                image_url: url,
                display_order: index,
              }))
            );

          if (galleryError) throw galleryError;
        }
      }

      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast({
        title: `Project ${projectId ? "bijgewerkt" : "toegevoegd"}`,
        description: `Het project is succesvol ${
          projectId ? "bijgewerkt" : "toegevoegd"
        }.`,
      });
      onSuccess?.();
    } catch (error) {
      console.error("Error saving project:", error);
      toast({
        title: "Er is iets misgegaan",
        description: "Het project kon niet worden opgeslagen.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <BasicInfoFields form={form} />
        <ImageFields form={form} />
        <SpecificationsFields form={form} />
        <div className="flex justify-end">
          <Button type="submit">
            {projectId ? "Project Bijwerken" : "Project Toevoegen"}
          </Button>
        </div>
      </form>
    </Form>
  );
}