import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { useCreateBlockNote, BlockNoteView } from "@blocknote/react";
import "@blocknote/core/style.css";

const Privacy = () => {
  const { data: page, isLoading } = useQuery({
    queryKey: ["legal-page", "privacy"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("legal_pages")
        .select("*")
        .eq("type", "privacy")
        .single();

      if (error) throw error;
      return data;
    },
  });

  const editor = useCreateBlockNote({
    initialContent: page?.content || [],
    editable: false,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 mt-20">
        <div className="flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="container mx-auto px-4 py-16 mt-20">
        <p className="text-center text-muted-foreground">
          Privacy policy not found.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 mt-20">
      <h1 className="text-4xl font-bold mb-8">{page.title}</h1>
      <div className="prose prose-lg max-w-none">
        <BlockNoteView editor={editor} theme="light" />
      </div>
    </div>
  );
};

export default Privacy;