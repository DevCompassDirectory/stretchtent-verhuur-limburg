import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductsTable } from "@/components/admin/products/ProductsTable";
import { ProductForm } from "@/components/admin/products/ProductForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

const ProductsPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const handleEdit = (productId: string) => {
    setSelectedProductId(productId);
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setSelectedProductId(null);
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setSelectedProductId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <ProductsTable onEdit={handleEdit} />

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedProductId ? "Edit Product" : "Add Product"}
            </DialogTitle>
          </DialogHeader>
          <ProductForm
            productId={selectedProductId}
            onSuccess={handleClose}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsPage;