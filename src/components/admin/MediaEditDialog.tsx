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
      const { error } = await supabase
        .from("images")
        .update({
          filename: data.filename,
          alt_text: data.alt_text || null,
        })
        .eq("id", image.id);

      if (error) throw error;

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