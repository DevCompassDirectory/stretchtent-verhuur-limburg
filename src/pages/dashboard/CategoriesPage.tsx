import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { CategoryForm } from "@/components/admin/categories/CategoryForm";
import { CategoryTable } from "@/components/admin/categories/CategoryTable";
import { Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const CategoriesPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  const { data: categories, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("rental_categories")
        .select("*")
        .order("sort_order");
      
      if (error) throw error;
      return data;
    },
  });

  const handleSuccess = () => {
    setIsOpen(false);
    setEditingCategory(null);
    refetch();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Verhuur Categorieën</h1>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nieuwe Categorie
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                {editingCategory ? "Categorie Bewerken" : "Nieuwe Categorie"}
              </SheetTitle>
            </SheetHeader>
            <CategoryForm
              category={editingCategory}
              categories={categories}
              onSuccess={handleSuccess}
            />
          </SheetContent>
        </Sheet>
      </div>

      <CategoryTable
        categories={categories || []}
        onEdit={(category) => {
          setEditingCategory(category);
          setIsOpen(true);
        }}
        onSuccess={() => refetch()}
      />
    </div>
  );
};

export default CategoriesPage;