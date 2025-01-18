import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { HomePageContent } from "@/types/home";

export const useHomeContent = () => {
  return useQuery({
    queryKey: ["home-content"],
    queryFn: async (): Promise<HomePageContent> => {
      const { data, error } = await supabase
        .from("home_page_content")
        .select("*")
        .maybeSingle();

      if (error) {
        console.error("Error fetching home content:", error);
        throw error;
      }

      if (!data) {
        throw new Error("No home content found");
      }

      return data;
    },
  });
};