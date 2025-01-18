import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tent } from "@/types/tent";

export const useTents = () => {
  return useQuery({
    queryKey: ["tents"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stretchtents")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data as Tent[];
    },
  });
};

export const useTent = (slug: string) => {
  return useQuery({
    queryKey: ["tent", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stretchtents")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) throw error;
      return data as Tent;
    },
  });
};