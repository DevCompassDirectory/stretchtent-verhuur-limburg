import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PageComponent {
  id: string;
  component_type: "hero" | "text" | "image" | "gallery" | "cta" | "features" | "testimonials";
  content: any;
  order_index: number;
}

interface PageComponentsListProps {
  pageId: string;
}

interface ComponentEditorProps {
  component: PageComponent;
  onClose: () => void;
}

function ComponentEditor({ component, onClose }: ComponentEditorProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const form = useForm({
    defaultValues: {
      ...component.content,
    },
  });

  const onSubmit = async (values: any) => {
    try {
      const { error } = await supabase
        .from("page_components")
        .update({ content: values })
        .eq("id", component.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Component updated successfully",
      });
      
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["page-components"] });
      onClose();
    } catch (error) {
      console.error("Error updating component:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update component. Please try again.",
      });
    }
  };

  const renderFields = () => {
    switch (component.component_type) {
      case "text":
        return (
          <>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </>
        );
      case "hero":
        return (
          <>
            <FormField
              control={form.control}
              name="heading"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Heading</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subheading"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subheading</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="buttonText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Button Text</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="buttonLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Button Link</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </>
        );
      default:
        return <p>Editor not implemented for this component type yet.</p>;
    }
  };

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {component.component_type} Component</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {renderFields()}
            <Button type="submit">Save Changes</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
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

      // Invalidate and refetch
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Component
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleAddComponent("text")}>
              Text
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAddComponent("hero")}>
              Hero
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAddComponent("image")}>
              Image
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAddComponent("gallery")}>
              Gallery
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAddComponent("cta")}>
              CTA
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAddComponent("features")}>
              Features
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAddComponent("testimonials")}>
              Testimonials
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-4">
        {components?.length === 0 ? (
          <Card>
            <CardContent className="py-4">
              <p className="text-center text-muted-foreground">No components added yet. Click "Add Component" to get started.</p>
            </CardContent>
          </Card>
        ) : (
          components?.map((component) => (
            <Card key={component.id}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base capitalize">{component.component_type}</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setEditingComponent(component)}
                  >
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {component.component_type === "text" && (
                  <div className="space-y-2">
                    <p className="font-medium">{component.content.title}</p>
                    <p className="text-muted-foreground">{component.content.content}</p>
                  </div>
                )}
                {component.component_type === "hero" && (
                  <div className="space-y-2">
                    <p className="font-medium">{component.content.heading}</p>
                    <p className="text-muted-foreground">{component.content.subheading}</p>
                    {component.content.buttonText && (
                      <p className="text-sm">Button: {component.content.buttonText}</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
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