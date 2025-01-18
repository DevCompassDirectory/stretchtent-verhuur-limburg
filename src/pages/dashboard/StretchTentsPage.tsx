import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { StretchTentForm } from "@/components/admin/stretchtents/StretchTentForm";
import { StretchTentTable } from "@/components/admin/stretchtents/StretchTentTable";
import type { Tent } from "@/types/tent";

const StretchTentsPage = () => {
  const [editingTent, setEditingTent] = useState<Tent | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data: tents, isLoading, refetch } = useQuery({
    queryKey: ["stretchtents"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stretchtents")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Tent[];
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Stretchtents</h1>
          <p className="text-muted-foreground">
            Manage your stretchtent inventory
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Stretchtent
        </Button>
      </div>

      <div className="rounded-md border">
        <StretchTentTable
          tents={tents || []}
          onEdit={setEditingTent}
          onRefresh={refetch}
        />
      </div>

      <StretchTentForm
        tent={editingTent}
        open={isFormOpen || !!editingTent}
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) setEditingTent(null);
        }}
        onSuccess={() => {
          refetch();
          setIsFormOpen(false);
          setEditingTent(null);
        }}
      />
    </div>
  );
};

export default StretchTentsPage;