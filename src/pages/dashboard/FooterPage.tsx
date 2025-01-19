import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { ContentSection } from "@/components/admin/ContentSection";
import { Plus, Trash2 } from "lucide-react";

interface FooterFormValues {
  description: string;
  phone: string | null;
  email: string | null;
  address: string | null;
}

interface SocialLink {
  id: string;
  icon_type: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'youtube' | 'custom';
  custom_svg: string | null;
  url: string;
  display_order: number;
}

const FooterPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

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

  const form = useForm<FooterFormValues>({
    defaultValues: {
      description: footerData?.description || "",
      phone: footerData?.phone || "",
      email: footerData?.email || "",
      address: footerData?.address || "",
    },
  });

  const onSubmit = async (data: FooterFormValues) => {
    setIsSubmitting(true);
    try {
      const { error: contentError } = await supabase
        .from("footer_content")
        .update(data)
        .eq("id", footerData?.id);

      if (contentError) throw contentError;

      for (const link of socialLinks) {
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
      toast({
        title: "Success",
        description: "Footer content has been updated.",
      });
    } catch (error) {
      console.error("Error updating footer content:", error);
      toast({
        title: "Error",
        description: "Failed to update footer content.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addSocialLink = () => {
    setSocialLinks([
      ...socialLinks,
      {
        id: `new-${Date.now()}`,
        icon_type: "facebook",
        custom_svg: null,
        url: "",
        display_order: socialLinks.length,
      },
    ]);
  };

  const removeSocialLink = async (index: number) => {
    const link = socialLinks[index];
    if (!link.id.startsWith("new")) {
      await supabase.from("footer_social_links").delete().eq("id", link.id);
    }
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };

  const updateSocialLink = (index: number, updates: Partial<SocialLink>) => {
    setSocialLinks(
      socialLinks.map((link, i) =>
        i === index ? { ...link, ...updates } : link
      )
    );
  };

  const fields = [
    {
      name: "description",
      label: "Description",
      description: "The main description text in the footer",
      type: "textarea" as const,
    },
    {
      name: "phone",
      label: "Phone",
      description: "Contact phone number",
      type: "text" as const,
    },
    {
      name: "email",
      label: "Email",
      description: "Contact email address",
      type: "text" as const,
    },
    {
      name: "address",
      label: "Address",
      description: "Physical address",
      type: "text" as const,
    },
  ];

  return (
    <ContentSection
      title="Footer Settings"
      fields={fields}
      form={form}
    >
      <div className="space-y-4 mt-8">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">Social Media Links</h4>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addSocialLink}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Link
          </Button>
        </div>

        <div className="space-y-4">
          {socialLinks.map((link, index) => (
            <div key={link.id} className="flex items-center gap-4">
              <select
                value={link.icon_type}
                onChange={(e) =>
                  updateSocialLink(index, {
                    icon_type: e.target.value as SocialLink["icon_type"],
                  })
                }
                className="h-10 rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="twitter">Twitter</option>
                <option value="linkedin">LinkedIn</option>
                <option value="youtube">YouTube</option>
                <option value="custom">Custom</option>
              </select>

              {link.icon_type === "custom" && (
                <Input
                  value={link.custom_svg || ""}
                  onChange={(e) =>
                    updateSocialLink(index, {
                      custom_svg: e.target.value,
                    })
                  }
                  placeholder="Paste SVG code here"
                  className="flex-1"
                />
              )}

              <Input
                value={link.url}
                onChange={(e) =>
                  updateSocialLink(index, { url: e.target.value })
                }
                placeholder="URL"
                className="flex-1"
              />

              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => removeSocialLink(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="mt-8">
        {isSubmitting ? "Saving..." : "Save Changes"}
      </Button>
    </ContentSection>
  );
};

export default FooterPage;
