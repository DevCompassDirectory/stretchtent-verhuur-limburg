import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ProductForm } from "@/components/admin/products/ProductForm";
import { ProductTable } from "@/components/admin/products/ProductTable";
import type { Product } from "@/types/product";

const ProductsPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error) throw error;
      return data as Product[];
    },
  });

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setSelectedProduct(null);
    setIsFormOpen(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Products</h1>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="mr-2" />
          Add Product
        </Button>
      </div>

      {isFormOpen && (
        <ProductForm
          product={selectedProduct}
          onClose={handleClose}
        />
      )}

      <ProductTable
        products={products || []}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default ProductsPage;