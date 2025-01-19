import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ContentSection } from "@/components/admin/ContentSection";
import type { FooterContent } from "@/hooks/use-footer-content";

interface FooterFormProps {
  footerData: FooterContent | null;
  onSuccess: () => void;
}

interface FooterFormValues {
  title: string;
  description: string;
  phone: string | null;
  email: string | null;
  address: string | null;
}

export const FooterForm = ({ footerData, onSuccess }: FooterFormProps) => {
  const { toast } = useToast();
  const form = useForm<FooterFormValues>({
    defaultValues: {
      title: footerData?.title || "",
      description: footerData?.description || "",
      phone: footerData?.phone || "",
      email: footerData?.email || "",
      address: footerData?.address || "",
    },
  });

  const onSubmit = async (data: FooterFormValues) => {
    try {
      const { error } = await supabase
        .from("footer_content")
        .update(data)
        .eq("id", footerData?.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Footer content has been updated.",
      });
      
      onSuccess();
    } catch (error) {
      console.error("Error updating footer content:", error);
      toast({
        title: "Error",
        description: "Failed to update footer content.",
        variant: "destructive",
      });
    }
  };

  const fields = [
    {
      name: "title",
      label: "Title",
      description: "The main title in the footer",
      type: "text" as const,
    },
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
      <Button 
        type="submit" 
        onClick={form.handleSubmit(onSubmit)}
      >
        Save Changes
      </Button>
    </ContentSection>
  );
};