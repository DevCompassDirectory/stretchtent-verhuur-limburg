import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { MediaUploadDialog } from "@/components/admin/MediaUploadDialog";
import { MediaEditDialog } from "@/components/admin/MediaEditDialog";
import { Image } from "lucide-react";
import { MediaTable } from "@/components/admin/media/MediaTable";
import { useMediaOperations } from "@/components/admin/media/useMediaOperations";
import type { ImageData } from "@/types/media";

const MediaPage = () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<ImageData | null>(null);

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

  const { processingImageId, handleDelete, handleResize } = useMediaOperations(refetch);

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
        <MediaTable
          images={images || []}
          onEdit={setEditingImage}
          onResize={handleResize}
          onDelete={handleDelete}
          processingImageId={processingImageId}
        />
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