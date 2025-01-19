import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LegalPageEditor } from "@/components/admin/legal/LegalPageEditor";
import { ContentSection } from "@/components/admin/ContentSection";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { LegalPage } from "../dashboard/LegalPagesPage";

const LegalPageEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const form = useForm();

  const { data: page, isLoading } = useQuery({
    queryKey: ["legal-page", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("legal_pages")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as LegalPage;
    },
  });

  const { mutate: updatePage, isPending: isUpdating } = useMutation({
    mutationFn: async (content: any[]) => {
      const { error } = await supabase
        .from("legal_pages")
        .update({ content })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["legal-pages"] });
      toast.success("Legal page updated successfully");
      navigate("/dashboard/legal");
    },
    onError: (error) => {
      console.error("Error updating legal page:", error);
      toast.error("Failed to update legal page");
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (!page) {
    return <div>Legal page not found</div>;
  }

  return (
    <ContentSection 
      title={`Edit ${page.title}`}
      fields={[]}
      form={form}
    >
      <div className="space-y-6">
        <LegalPageEditor
          initialContent={page.content}
          onSave={(content) => updatePage(content)}
        />
        <div className="flex justify-end space-x-4">
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard/legal")}
            disabled={isUpdating}
            type="button"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isUpdating}
            form="legal-page-form"
          >
            {isUpdating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </div>
    </ContentSection>
  );
};

export default LegalPageEditPage;