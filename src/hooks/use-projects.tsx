import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Project } from "@/types/project";

interface ProjectWithImages extends Project {
  project_images: { image_url: string }[];
}

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
      
      // Transform the data to match our type
      const projects = data.map((project): ProjectWithImages => ({
        ...project,
        specs: project.specs as Project['specs'], // Cast the JSONB to our type
      }));

      return projects;
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
      if (!data) return null;

      // Transform the data to match our type
      const project: ProjectWithImages = {
        ...data,
        specs: data.specs as Project['specs'], // Cast the JSONB to our type
      };

      return project;
    },
  });
};