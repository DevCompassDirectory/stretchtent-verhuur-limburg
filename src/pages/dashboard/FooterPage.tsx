import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { ContentSection } from "@/components/admin/ContentSection";
import { SocialLinksSection } from "@/components/admin/footer/SocialLinksSection";
import type { FooterContent, FooterSocialLink } from "@/hooks/use-footer-content";

interface FooterFormValues {
  description: string;
  phone: string | null;
  email: string | null;
  address: string | null;
}

const FooterPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [socialLinks, setSocialLinks] = useState<FooterSocialLink[]>([]);
  const { toast } = useToast();

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

  // Update form values when data is loaded
  React.useEffect(() => {
    if (footerData) {
      form.reset({
        description: footerData.description,
        phone: footerData.phone,
        email: footerData.email,
        address: footerData.address,
      });
    }
  }, [footerData, form]);

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
      <div className="mt-8">
        <SocialLinksSection
          socialLinks={socialLinks}
          onSocialLinksChange={setSocialLinks}
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="mt-8" onClick={form.handleSubmit(onSubmit)}>
        {isSubmitting ? "Saving..." : "Save Changes"}
      </Button>
    </ContentSection>
  );
};

export default FooterPage;