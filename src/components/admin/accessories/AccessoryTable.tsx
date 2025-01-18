import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import type { Accessory } from "@/types/accessory";

interface AccessoryTableProps {
  accessories: Accessory[];
  onEdit: (accessory: Accessory) => void;
  onRefresh: () => void;
}

export const AccessoryTable = ({
  accessories,
  onEdit,
  onRefresh,
}: AccessoryTableProps) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDelete = async () => {
    if (!deletingId) return;

    try {
      const { error } = await supabase
        .from("accessories")
        .delete()
        .eq("id", deletingId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Accessory deleted successfully",
      });
      onRefresh();
    } catch (error) {
      console.error("Error deleting accessory:", error);
      toast({
        title: "Error",
        description: "Failed to delete accessory",
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const sortedAccessories = [...accessories].sort((a, b) => 
    (a.display_order || 0) - (b.display_order || 0)
  );

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAccessories.map((accessory) => (
            <TableRow key={accessory.id}>
              <TableCell>{accessory.display_order}</TableCell>
              <TableCell>{accessory.name}</TableCell>
              <TableCell>{accessory.type}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(accessory)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeletingId(accessory.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog
        open={!!deletingId}
        onOpenChange={(open) => !open && setDeletingId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              accessory.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};