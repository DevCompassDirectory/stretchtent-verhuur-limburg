import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface PageComponent {
  id: string;
  component_type: "hero" | "text" | "image" | "gallery" | "cta" | "features" | "testimonials";
  content: any;
  order_index: number;
}

interface PageComponentsListProps {
  pageId: string;
}

export function PageComponentsList({ pageId }: PageComponentsListProps) {
  const { toast } = useToast();
  
  const { data: components, isLoading } = useQuery({
    queryKey: ["page-components", pageId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_components")
        .select("*")
        .eq("page_id", pageId)
        .order("order_index");

      if (error) throw error;
      return data as PageComponent[];
    },
  });

  const handleAddComponent = async (type: PageComponent["component_type"]) => {
    try {
      const newOrderIndex = components ? components.length : 0;
      
      const { error } = await supabase
        .from("page_components")
        .insert({
          page_id: pageId,
          component_type: type,
          content: {},
          order_index: newOrderIndex,
        });

      if (error) throw error;

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
        <Button onClick={() => handleAddComponent("text")}>
          <Plus className="h-4 w-4 mr-2" />
          Add Component
        </Button>
      </div>

      <div className="space-y-4">
        {components?.map((component) => (
          <div
            key={component.id}
            className="p-4 border rounded-lg bg-card"
          >
            <div className="flex justify-between items-center">
              <span className="capitalize">{component.component_type}</span>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}