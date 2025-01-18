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
} from "@/components/ui/dialog";
import { ProductTypeSelector } from "@/components/admin/products/ProductTypeSelector";
import { TentProductForm } from "@/components/admin/products/forms/TentProductForm";
import { ProductTable } from "@/components/admin/products/ProductTable";

const ProductsPage = () => {
  const [isTypeSelectOpen, setIsTypeSelectOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProductType, setSelectedProductType] = useState<string | null>(null);
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
    setIsFormOpen(false);
    setSelectedProductType(null);
    setEditingProduct(null);
    refetch();
  };

  const handleTypeSelect = (productTypeId: string) => {
    setSelectedProductType(productTypeId);
    setIsTypeSelectOpen(false);
    setIsFormOpen(true);
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setSelectedProductType(product.product_type_id);
    setIsFormOpen(true);
  };

  const renderProductForm = () => {
    // Add more cases for different product types
    switch (selectedProductType) {
      case "tent-type-id": // Replace with actual tent type ID
        return (
          <TentProductForm
            product={editingProduct}
            onSuccess={handleSuccess}
            productTypeId={selectedProductType}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button onClick={() => setIsTypeSelectOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Product
        </Button>
      </div>

      <ProductTypeSelector
        isOpen={isTypeSelectOpen}
        onClose={() => setIsTypeSelectOpen(false)}
        onSelect={handleTypeSelect}
      />

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Edit Product" : "New Product"}
            </DialogTitle>
          </DialogHeader>
          {renderProductForm()}
        </DialogContent>
      </Dialog>

      <ProductTable
        products={products || []}
        onEdit={handleEdit}
        onSuccess={() => refetch()}
      />
    </div>
  );
};

export default ProductsPage;