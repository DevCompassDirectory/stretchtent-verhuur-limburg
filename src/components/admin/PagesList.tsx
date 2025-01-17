import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function PagesList() {
  const { data: pages, isLoading } = useQuery({
    queryKey: ["pages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading pages...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Pages</h2>
        <Button>
          <Plus className="mr-2" />
          Create Page
        </Button>
      </div>
      <div className="grid gap-4">
        {pages?.map((page) => (
          <Card key={page.id} className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{page.title}</h3>
                <p className="text-sm text-muted-foreground">/{page.slug}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}