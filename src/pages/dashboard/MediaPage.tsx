import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MediaUploadDialog } from "@/components/admin/MediaUploadDialog";
import { MediaEditDialog } from "@/components/admin/MediaEditDialog";
import { Image, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ImageData {
  id: string;
  filename: string;
  alt_text: string | null;
  original_url: string;
  thumbnail_url: string | null;
  medium_url: string | null;
  large_url: string | null;
  created_at: string;
}

const MediaPage = () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<ImageData | null>(null);
  const { toast } = useToast();

  const { data: images, isLoading, refetch } = useQuery({
    queryKey: ["media-images"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("images")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as ImageData[];
    },
  });

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Media Library</h1>
          <p className="text-muted-foreground">
            Manage your images and media files
          </p>
        </div>
        <Button onClick={() => setIsUploadOpen(true)}>Upload Image</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Preview</TableHead>
              <TableHead>Filename</TableHead>
              <TableHead>Alt Text</TableHead>
              <TableHead>Sizes</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {images?.map((image) => (
              <TableRow key={image.id}>
                <TableCell>
                  <div className="relative h-16 w-16">
                    <img
                      src={image.thumbnail_url || image.original_url}
                      alt={image.alt_text || image.filename}
                      className="h-full w-full rounded object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell>{image.filename}</TableCell>
                <TableCell>{image.alt_text || "-"}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    {image.thumbnail_url && <div>Thumbnail</div>}
                    {image.medium_url && <div>Medium</div>}
                    {image.large_url && <div>Large</div>}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setEditingImage(image)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(image.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <MediaUploadDialog
        open={isUploadOpen}
        onOpenChange={setIsUploadOpen}
        onSuccess={() => {
          refetch();
          setIsUploadOpen(false);
        }}
      />

      <MediaEditDialog
        image={editingImage}
        onOpenChange={(open) => !open && setEditingImage(null)}
        onSuccess={() => {
          refetch();
          setEditingImage(null);
        }}
      />
    </div>
  );
};

export default MediaPage;