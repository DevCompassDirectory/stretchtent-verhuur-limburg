import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { PageCard } from "./PageCard";
import { DeletePageDialog } from "./DeletePageDialog";

interface Page {
  id: string;
  title: string;
  slug: string;
  is_published: boolean;
}

export function PagesList() {
  const [pages, setPages] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletePageId, setDeletePageId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const { data, error } = await supabase
        .from("pages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setPages(data || []);
    } catch (error) {
      console.error("Error fetching pages:", error);
      toast({
        title: "Error",
        description: "Failed to fetch pages. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePage = async () => {
    if (!deletePageId) return;

    try {
      const { error } = await supabase
        .from("pages")
        .delete()
        .eq("id", deletePageId);

      if (error) throw error;

      setPages((prevPages) =>
        prevPages.filter((page) => page.id !== deletePageId)
      );
      toast({
        title: "Success",
        description: "Page deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting page:", error);
      toast({
        title: "Error",
        description: "Failed to delete page. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeletePageId(null);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Pages</h2>
        <Button asChild>
          <Link to="/dashboard/pages/create">
            <Plus className="h-4 w-4 mr-2" />
            Create Page
          </Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {pages.map((page) => (
          <PageCard
            key={page.id}
            id={page.id}
            title={page.title}
            slug={page.slug}
            isPublished={page.is_published}
            onDeleteClick={() => setDeletePageId(page.id)}
          />
        ))}
      </div>

      <DeletePageDialog
        isOpen={!!deletePageId}
        onClose={() => setDeletePageId(null)}
        onConfirm={handleDeletePage}
      />
    </div>
  );
}