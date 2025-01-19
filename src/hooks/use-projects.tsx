import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Project } from "@/types/project";

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select(`
          *,
          project_images(*)
        `)
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as (Project & { project_images: { image_url: string }[] })[];
    },
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select(`
          *,
          project_images(*)
        `)
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      return data as (Project & { project_images: { image_url: string }[] }) | null;
    },
  });
};