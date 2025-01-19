import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { LegalPageEditor } from "./LegalPageEditor";
import type { LegalPage } from "@/pages/dashboard/LegalPagesPage";

interface LegalPageEditDialogProps {
  page: LegalPage | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LegalPageEditDialog({
  page,
  open,
  onOpenChange,
}: LegalPageEditDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleSave = async (content: any[]) => {
    if (!page) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("legal_pages")
        .update({ content })
        .eq("id", page.id);

      if (error) throw error;

      toast.success("Page updated successfully");
      queryClient.invalidateQueries({ queryKey: ["legal-pages"] });
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating page:", error);
      toast.error("Failed to update page");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Edit {page?.title}</DialogTitle>
        </DialogHeader>
        {page && (
          <div className="space-y-4" onSubmit={handleSubmit}>
            <LegalPageEditor
              initialContent={page.content}
              onSave={handleSave}
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
                type="button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                form="legal-page-form"
                disabled={isLoading}
              >
                {isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save Changes
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}