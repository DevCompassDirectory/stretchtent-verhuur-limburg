import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ProductTypeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (productTypeId: string) => void;
}

export const ProductTypeSelector = ({
  isOpen,
  onClose,
  onSelect,
}: ProductTypeSelectorProps) => {
  const [selectedType, setSelectedType] = useState<string>("");

  const { data: productTypes } = useQuery({
    queryKey: ["product-types"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("product_types")
        .select("*");
      
      if (error) throw error;
      return data;
    },
  });

  const handleCreate = () => {
    if (selectedType) {
      onSelect(selectedType);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Product Type</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Select
            value={selectedType}
            onValueChange={setSelectedType}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a product type" />
            </SelectTrigger>
            <SelectContent>
              {productTypes?.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            className="w-full"
            onClick={handleCreate}
            disabled={!selectedType}
          >
            Create Product
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};