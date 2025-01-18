import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    try {
      // First, check if a file with this name already exists
      const { data: existingFiles } = await supabase.storage
        .from("images")
        .list();

      const fileExists = existingFiles?.some(
        (existingFile) => existingFile.name === file.name
      );

      let publicUrl: string;

      if (fileExists) {
        // If file exists, get its public URL
        const { data: { publicUrl: existingUrl } } = supabase.storage
          .from("images")
          .getPublicUrl(file.name);
        publicUrl = existingUrl;

        // Check if there's already an image record with this URL
        const { data: existingImage } = await supabase
          .from("images")
          .select()
          .eq('original_url', publicUrl)
          .maybeSingle();

        if (existingImage) {
          toast({
            title: "Image already exists",
            description: "This image is already in your media library",
          });
          setIsUploading(false);
          return;
        }
      } else {
        // Upload new file with original filename
        const { error: uploadError } = await supabase.storage
          .from("images")
          .upload(file.name, file);

        if (uploadError) throw uploadError;

        // Get public URL for the uploaded file
        const { data: { publicUrl: newUrl } } = supabase.storage
          .from("images")
          .getPublicUrl(file.name);
        publicUrl = newUrl;
      }

      // Save metadata to database
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
          <div className="space-y-2">
            <Label htmlFor="file">Select Image</Label>
            <Input
              id="file"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>
          <Button
            onClick={handleUpload}
            disabled={!file || isUploading}
            className="w-full"
          >
            {isUploading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};