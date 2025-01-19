import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Project } from "@/types/project";

interface ProjectWithImages extends Project {
  project_images: { image_url: string }[];
}

interface ProjectsResponse {
  projects: ProjectWithImages[];
  count: number;
}

const PROJECTS_PER_PAGE = 6;

export const useProjects = () => {
  return useInfiniteQuery<ProjectsResponse>({
    queryKey: ["projects"],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const from = (pageParam as number) * PROJECTS_PER_PAGE;
      const to = from + PROJECTS_PER_PAGE - 1;

      const { data, error, count } = await supabase
        .from("projects")
        .select(`
          *,
          project_images(*)
        `, { count: 'exact' })
        .order('display_order', { ascending: true })
        .range(from, to);

      if (error) throw error;
      
      // Transform the data to match our type
      const projects = data.map((project): ProjectWithImages => ({
        ...project,
        specs: project.specs as Project['specs'],
      }));

      return {
        projects,
        count: count || 0,
      };
    },
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = Math.ceil(lastPage.count / PROJECTS_PER_PAGE);
      const nextPage = allPages.length;
      return nextPage < totalPages ? nextPage : undefined;
    },
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      // Skip the query if id is empty
      if (!id) return null;

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
        specs: data.specs as Project['specs'],
      };

      return project;
    },
    // Disable the query when id is empty
    enabled: Boolean(id),
  });
};