import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { ComponentEditor } from "./components/ComponentEditor";
import { ComponentCard } from "./components/ComponentCard";
import { AddComponentButton } from "./components/AddComponentButton";
import { PageComponent } from "./types";
import { useState } from "react";

interface PageComponentsListProps {
  pageId: string;
}

export function PageComponentsList({ pageId }: PageComponentsListProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingComponent, setEditingComponent] = useState<PageComponent | null>(null);
  
  const { data: components, isLoading } = useQuery({
    queryKey: ["page-components", pageId],
    queryFn: async () => {
      console.log("Fetching components for page:", pageId);
      const { data, error } = await supabase
        .from("page_components")
        .select("*")
        .eq("page_id", pageId)
        .order("order_index");

      if (error) {
        console.error("Error fetching components:", error);
        throw error;
      }
      console.log("Fetched components:", data);
      return data as PageComponent[];
    },
  });

  const handleAddComponent = async (type: PageComponent["component_type"]) => {
    try {
      const newOrderIndex = components ? components.length : 0;
      const defaultContent = type === 'text' 
        ? { title: '', content: '' }
        : type === 'hero'
        ? { heading: '', subheading: '', buttonText: '', buttonLink: '' }
        : {};
      
      const { error } = await supabase
        .from("page_components")
        .insert({
          page_id: pageId,
          component_type: type,
          content: defaultContent,
          order_index: newOrderIndex,
        });

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ["page-components"] });

      toast({
        title: "Success",
        description: "Component added successfully",
      });
    } catch (error) {
      console.error("Error adding component:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add component. Please try again.",
      });
    }
  };

  if (isLoading) {
    return <div>Loading components...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Page Components</h3>
        <AddComponentButton onAdd={handleAddComponent} />
      </div>

      <div className="space-y-4">
        {components?.length === 0 ? (
          <Card>
            <CardContent className="py-4">
              <p className="text-center text-muted-foreground">
                No components added yet. Click "Add Component" to get started.
              </p>
            </CardContent>
          </Card>
        ) : (
          components?.map((component) => (
            <ComponentCard
              key={component.id}
              component={component}
              onEdit={setEditingComponent}
            />
          ))
        )}
      </div>

      {editingComponent && (
        <ComponentEditor
          component={editingComponent}
          onClose={() => setEditingComponent(null)}
        />
      )}
    </div>
  );
}