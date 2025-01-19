import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface FooterContent {
  id: string;
  title: string;
  description: string;
  phone: string | null;
  email: string | null;
  address: string | null;
}

export interface FooterSocialLink {
  id: string;
  icon_type: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'youtube' | 'custom';
  custom_svg: string | null;
  url: string;
  display_order: number;
}

export const useFooterContent = () => {
  return useQuery({
    queryKey: ["footer-content"],
    queryFn: async () => {
      const { data: content, error: contentError } = await supabase
        .from("footer_content")
        .select("*")
        .single();

      if (contentError) throw contentError;

      const { data: socialLinks, error: linksError } = await supabase
        .from("footer_social_links")
        .select("*")
        .order("display_order");

      if (linksError) throw linksError;

      return {
        content,
        socialLinks,
      };
    },
  });
};