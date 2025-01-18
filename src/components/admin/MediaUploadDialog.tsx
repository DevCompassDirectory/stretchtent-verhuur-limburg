import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload } from "lucide-react";

interface MediaUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export const MediaUploadDialog = ({
  open,
  onOpenChange,
  onSuccess,
}: MediaUploadDialogProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);

      // Check if file with same name already exists in storage
      const { data: existingFiles } = await supabase.storage
        .from("images")
        .list();

      const fileExists = existingFiles?.some(
        (existingFile) => existingFile.name === file.name
      );

      if (fileExists) {
        // Get the public URL of the existing file
        const { data: { publicUrl } } = supabase.storage
          .from("images")
          .getPublicUrl(file.name);

        // Check if we already have this image in our database
        const { data: existingImage } = await supabase
          .from("images")
          .select()
          .eq("original_url", publicUrl)
          .maybeSingle();

        if (existingImage) {
          toast({
            title: "Image already exists",
            description: "This image is already in your media library",
          });
          return;
        }

        // If the file exists in storage but not in the database,
        // we'll create a new database entry for it
        const { error: dbError } = await supabase.from("images").insert({
          filename: file.name,
          original_url: publicUrl,
        });

        if (dbError) throw dbError;

        toast({
          title: "Success",
          description: "Image added to library",
        });
        onSuccess();
        onOpenChange(false);
        return;
      }

      // Upload the file with its original name
      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(file.name, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from("images")
        .getPublicUrl(file.name);

      // Save to database
      const { error: dbError } = await supabase.from("images").insert({
        filename: file.name,
        original_url: publicUrl,
      });

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });

      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-secondary/50 hover:bg-secondary/70"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground">
                  Click to upload or drag and drop
                </p>
              </div>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={isUploading}
              />
            </label>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};