import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FooterForm } from "@/components/admin/footer/FooterForm";
import { SocialLinksSection } from "@/components/admin/footer/SocialLinksSection";
import type { FooterSocialLink } from "@/hooks/use-footer-content";

const FooterPage = () => {
  const [socialLinks, setSocialLinks] = useState<FooterSocialLink[]>([]);

  const { data: footerData, refetch } = useQuery({
    queryKey: ["footer-content"],
    queryFn: async () => {
      const { data: content, error: contentError } = await supabase
        .from("footer_content")
        .select("*")
        .single();

      if (contentError) throw contentError;

      const { data: links, error: linksError } = await supabase
        .from("footer_social_links")
        .select("*")
        .order("display_order");

      if (linksError) throw linksError;

      setSocialLinks(links || []);
      return content;
    },
  });

  const handleSocialLinksChange = async (links: FooterSocialLink[]) => {
    setSocialLinks(links);
    
    try {
      // Update social links
      for (const link of links) {
        if (link.id.startsWith("new")) {
          const { id, ...newLink } = link;
          await supabase.from("footer_social_links").insert(newLink);
        } else {
          await supabase
            .from("footer_social_links")
            .update(link)
            .eq("id", link.id);
        }
      }

      await refetch();
    } catch (error) {
      console.error("Error updating social links:", error);
    }
  };

  return (
    <div className="space-y-8">
      <FooterForm 
        footerData={footerData} 
        onSuccess={refetch}
      />
      
      <div className="border rounded-lg p-4">
        <SocialLinksSection
          socialLinks={socialLinks}
          onSocialLinksChange={handleSocialLinksChange}
        />
      </div>
    </div>
  );
};

export default FooterPage;