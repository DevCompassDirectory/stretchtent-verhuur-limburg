import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

export function PagesList() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data: pages, isLoading } = useQuery({
    queryKey: ["pages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("pages")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Page deleted successfully",
      });

      queryClient.invalidateQueries({ queryKey: ["pages"] });
    } catch (error) {
      console.error("Error deleting page:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete page. Please try again.",
      });
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Pages</h2>
          <Button disabled>Loading...</Button>
        </div>
        <Card className="p-4">
          <div className="h-20 animate-pulse bg-muted rounded-lg" />
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Pages</h2>
        <Button asChild>
          <Link to="/dashboard/pages/create">
            <Plus className="mr-2" />
            Create Page
          </Link>
        </Button>
      </div>
      <div className="grid gap-4">
        {pages?.map((page) => (
          <Card key={page.id} className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{page.title}</h3>
                <p className="text-sm text-muted-foreground">/{page.slug}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/dashboard/pages/${page.id}/edit`}>
                    Edit
                  </Link>
                </Button>
                <AlertDialog open={deletingId === page.id} onOpenChange={(open) => !open && setDeletingId(null)}>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => setDeletingId(page.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the page
                        and all its content.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(page.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button variant="ghost" size="sm" asChild>
                  <Link to={`/${page.slug}`} target="_blank">
                    View
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        ))}
        {pages?.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No pages found. Create your first page!</p>
          </Card>
        )}
      </div>
    </div>
  );
}