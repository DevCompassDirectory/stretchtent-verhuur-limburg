import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ImageData {
  id: string;
  filename: string;
  alt_text: string | null;
  original_url: string;
  thumbnail_url: string | null;
  medium_url: string | null;
  large_url: string | null;
}

interface MediaEditDialogProps {
  image: ImageData | null;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

interface FormValues {
  filename: string;
  alt_text: string;
}

export const MediaEditDialog = ({
  image,
  onOpenChange,
  onSuccess,
}: MediaEditDialogProps) => {
  const { toast } = useToast();
  const form = useForm<FormValues>();

  useEffect(() => {
    if (image) {
      form.reset({
        filename: image.filename,
        alt_text: image.alt_text || "",
      });
    }
  }, [image, form]);

  const onSubmit = async (data: FormValues) => {
    if (!image) return;

    try {
      const updates: Record<string, any> = {
        filename: data.filename,
        alt_text: data.alt_text || null,
      };

      // If filename has changed, we need to update storage
      if (data.filename !== image.filename) {
        const fileUrls = [
          { url: image.original_url, suffix: '' },
          { url: image.thumbnail_url, suffix: '_thumbnail' },
          { url: image.medium_url, suffix: '_medium' },
          { url: image.large_url, suffix: '_large' }
        ];

        // Process each file size
        for (const { url, suffix } of fileUrls) {
          if (!url) continue;

          const oldPath = url.split('/').pop();
          if (!oldPath) continue;

          const fileExt = oldPath.split('.').pop();
          const newPath = `${image.id}${suffix}.${fileExt}`;

          // Copy file with new name
          const { error: copyError } = await supabase.storage
            .from('images')
            .copy(oldPath, newPath);

          if (copyError) {
            console.error(`Error copying ${suffix || 'original'} file:`, copyError);
            continue;
          }

          // Delete old file
          const { error: deleteError } = await supabase.storage
            .from('images')
            .remove([oldPath]);

          if (deleteError) {
            console.error(`Error deleting ${suffix || 'original'} file:`, deleteError);
          }

          // Get new public URL
          const { data: { publicUrl } } = supabase.storage
            .from('images')
            .getPublicUrl(newPath);

          // Update the corresponding URL in updates object
          if (suffix === '') updates.original_url = publicUrl;
          else if (suffix === '_thumbnail') updates.thumbnail_url = publicUrl;
          else if (suffix === '_medium') updates.medium_url = publicUrl;
          else if (suffix === '_large') updates.large_url = publicUrl;
        }
      }

      // Update database record
      const { error: updateError } = await supabase
        .from("images")
        .update(updates)
        .eq("id", image.id);

      if (updateError) throw updateError;

      toast({
        title: "Success",
        description: "Image updated successfully",
      });
      onSuccess();
    } catch (error) {
      console.error("Error updating image:", error);
      toast({
        title: "Error",
        description: "Failed to update image",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={!!image} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Image</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="filename"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Filename</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="alt_text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alt Text</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};