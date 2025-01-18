import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TentProductForm } from "./forms/TentProductForm";
import { AccessoryProductForm } from "./forms/AccessoryProductForm";
import { FurnitureProductForm } from "./forms/FurnitureProductForm";
import { ServiceProductForm } from "./forms/ServiceProductForm";

interface ProductFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProductType: string | null;
  editingProduct: any;
  onSuccess: () => void;
}

export const ProductFormDialog = ({
  isOpen,
  onClose,
  selectedProductType,
  editingProduct,
  onSuccess,
}: ProductFormDialogProps) => {
  const renderProductForm = () => {
    switch (selectedProductType) {
      case "2529f53f-8a9c-412b-9176-4cc2dbdf02a5": // Stretchtent
        return (
          <TentProductForm
            product={editingProduct}
            onSuccess={onSuccess}
            productTypeId={selectedProductType}
          />
        );
      case "f44a5b29-fca3-4fe3-b8d3-0c7e5d47674a": // Verlichting
        return (
          <AccessoryProductForm
            product={editingProduct}
            onSuccess={onSuccess}
            productTypeId={selectedProductType}
          />
        );
      case "b36e2d83-45d4-483d-bd9a-fd0c9f92cdf5": // Meubilair
        return (
          <FurnitureProductForm
            product={editingProduct}
            onSuccess={onSuccess}
            productTypeId={selectedProductType}
          />
        );
      case "a47497df-90b9-48f5-b3fa-281f77c4ef0a": // Vloer
        return (
          <ServiceProductForm
            product={editingProduct}
            onSuccess={onSuccess}
            productTypeId={selectedProductType}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingProduct ? "Edit Product" : "New Product"}
          </DialogTitle>
        </DialogHeader>
        {renderProductForm()}
      </DialogContent>
    </Dialog>
  );
};