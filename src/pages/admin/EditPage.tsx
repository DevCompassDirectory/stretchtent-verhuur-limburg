import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageForm } from "@/components/admin/PageForm";
import { PageComponentsList } from "@/components/admin/PageComponentsList";

export default function EditPage() {
  const { id } = useParams();

  const { data: page, isLoading: pageLoading } = useQuery({
    queryKey: ["page", id],
    queryFn: async () => {
      console.log("Fetching page with ID:", id);
      const { data, error } = await supabase
        .from("pages")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching page:", error);
        throw error;
      }
      console.log("Fetched page:", data);
      return data;
    },
  });

  if (pageLoading) {
    return (
      <div className="container max-w-2xl py-6">
        <div className="h-20 animate-pulse bg-muted rounded-lg" />
      </div>
    );
  }

  if (!page) {
    return (
      <div className="container max-w-2xl py-6">
        <h1 className="text-2xl font-bold">Page not found</h1>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Page</h1>
        <p className="text-muted-foreground">Make changes to your page</p>
      </div>
      <div className="space-y-6">
        <PageForm initialData={page} />
        <PageComponentsList pageId={page.id} />
      </div>
    </div>
  );
}