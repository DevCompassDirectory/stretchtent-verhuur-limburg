import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageForm } from "@/components/admin/PageForm";

export default function EditPage() {
  const { id } = useParams();

  const { data: page, isLoading } = useQuery({
    queryKey: ["page", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pages")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
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
      <PageForm initialData={page} />
    </div>
  );
}