import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageSelector } from "@/components/admin/ImageSelector";
import { useToast } from "@/hooks/use-toast";
import { useProject } from "@/hooks/use-projects";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Database } from "@/integrations/supabase/types";

type ProjectCategory = Database["public"]["Enums"]["project_category"];

interface ProjectFormProps {
  projectId?: string | null;
  onSuccess?: () => void;
}

interface ProjectFormValues {
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

const categories: ProjectCategory[] = [
  "bruiloft",
  "zakelijk",
  "feest",
  "festival",
  "communie",
  "sport",
  "baby shower",
  "verjaardag",
];

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
        // Update existing project
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

        // Delete existing gallery images
        const { error: deleteError } = await supabase
          .from("project_images")
          .delete()
          .eq("project_id", projectId);

        if (deleteError) throw deleteError;

        // Insert new gallery images
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
        // Create new project
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

        // Insert gallery images
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
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titel</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Korte beschrijving</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="full_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Volledige beschrijving</FormLabel>
              <FormControl>
                <Textarea {...field} className="min-h-[200px]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Datum</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categorie</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecteer een categorie" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        key={category}
                        value={category}
                        className="capitalize"
                      >
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="main_image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hoofdafbeelding</FormLabel>
              <FormControl>
                <ImageSelector
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gallery"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Galerij</FormLabel>
              <FormControl>
                <ImageSelector
                  value={field.value}
                  onChange={field.onChange}
                  multiple
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <h3 className="font-medium">Specificaties</h3>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="specs.tentSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tent Afmeting</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="specs.capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capaciteit</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="specs.setup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Setup</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="specs.location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Locatie</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit">
            {projectId ? "Project Bijwerken" : "Project Toevoegen"}
          </Button>
        </div>
      </form>
    </Form>
  );
}