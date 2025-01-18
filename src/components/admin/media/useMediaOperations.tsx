import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { ImageData } from "@/types/media";

export const useMediaOperations = (refetch: () => void) => {
  const [processingImageId, setProcessingImageId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("images").delete().eq("id", id);
      if (error) throw error;

      toast({
        title: "Success",
        description: "Image deleted successfully",
      });
      refetch();
    } catch (error) {
      console.error("Error deleting image:", error);
      toast({
        title: "Error",
        description: "Failed to delete image",
        variant: "destructive",
      });
    }
  };

  const handleResize = async (id: string) => {
    try {
      setProcessingImageId(id);
      toast({
        title: "Processing",
        description: "Generating image sizes...",
      });

      const response = await fetch('/.netlify/functions/resize-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageId: id }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to resize image');
      }

      await response.json();

      toast({
        title: "Success",
        description: "Image sizes generated successfully",
      });
      refetch();
    } catch (error) {
      console.error("Error resizing image:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to resize image",
        variant: "destructive",
      });
    } finally {
      setProcessingImageId(null);
    }
  };

  return {
    processingImageId,
    handleDelete,
    handleResize,
  };
};