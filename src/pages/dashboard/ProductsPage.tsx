import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProductForm } from "@/components/admin/products/ProductForm";
import { ProductTable } from "@/components/admin/products/ProductTable";

const ProductsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const { data: products, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*, rental_categories(name)")
        .order("sort_order");
      
      if (error) throw error;
      return data;
    },
  });

  const handleSuccess = () => {
    setIsOpen(false);
    setEditingProduct(null);
    refetch();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Edit Product" : "New Product"}
              </DialogTitle>
            </DialogHeader>
            <ProductForm
              product={editingProduct}
              onSuccess={handleSuccess}
            />
          </DialogContent>
        </Dialog>
      </div>

      <ProductTable
        products={products || []}
        onEdit={(product) => {
          setEditingProduct(product);
          setIsOpen(true);
        }}
        onSuccess={() => refetch()}
      />
    </div>
  );
};

export default ProductsPage;