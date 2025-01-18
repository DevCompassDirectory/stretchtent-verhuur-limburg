import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Accessory } from "@/types/accessory";

export const useAccessories = () => {
  return useQuery({
    queryKey: ["accessories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("accessories")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as Accessory[];
    },
  });
};

export const useAccessory = (slug: string) => {
  return useQuery({
    queryKey: ["accessory", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("accessories")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) throw error;
      return data as Accessory;
    },
  });
};