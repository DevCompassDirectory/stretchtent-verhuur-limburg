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
import { AccessoryProductForm } from "@/components/admin/products/forms/AccessoryProductForm";
import { FurnitureProductForm } from "@/components/admin/products/forms/FurnitureProductForm";
import { ServiceProductForm } from "@/components/admin/products/forms/ServiceProductForm";
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
    switch (selectedProductType) {
      case "2529f53f-8a9c-412b-9176-4cc2dbdf02a5": // Stretchtent
        return (
          <TentProductForm
            product={editingProduct}
            onSuccess={handleSuccess}
            productTypeId={selectedProductType}
          />
        );
      case "f44a5b29-fca3-4fe3-b8d3-0c7e5d47674a": // Verlichting
        return (
          <AccessoryProductForm
            product={editingProduct}
            onSuccess={handleSuccess}
            productTypeId={selectedProductType}
          />
        );
      case "b36e2d83-45d4-483d-bd9a-fd0c9f92cdf5": // Meubilair
        return (
          <FurnitureProductForm
            product={editingProduct}
            onSuccess={handleSuccess}
            productTypeId={selectedProductType}
          />
        );
      case "a47497df-90b9-48f5-b3fa-281f77c4ef0a": // Vloer
        return (
          <ServiceProductForm
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