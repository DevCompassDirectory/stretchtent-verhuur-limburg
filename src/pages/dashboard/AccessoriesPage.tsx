import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AccessoryForm } from "@/components/admin/accessories/AccessoryForm";
import { AccessoryTable } from "@/components/admin/accessories/AccessoryTable";
import type { Accessory } from "@/types/accessory";

const AccessoriesPage = () => {
  const [editingAccessory, setEditingAccessory] = useState<Accessory | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data: accessories, isLoading, refetch } = useQuery({
    queryKey: ["accessories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("accessories")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Accessory[];
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Accessories</h1>
          <p className="text-muted-foreground">
            Manage your accessories inventory
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Accessory
        </Button>
      </div>

      <div className="rounded-md border">
        <AccessoryTable
          accessories={accessories || []}
          onEdit={setEditingAccessory}
          onRefresh={refetch}
        />
      </div>

      <AccessoryForm
        accessory={editingAccessory}
        open={isFormOpen || !!editingAccessory}
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) setEditingAccessory(null);
        }}
        onSuccess={() => {
          refetch();
          setIsFormOpen(false);
          setEditingAccessory(null);
        }}
      />
    </div>
  );
};

export default AccessoriesPage;