import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Image, Pencil, Trash2, Maximize2 } from "lucide-react";
import type { ImageData } from "@/types/media";

interface MediaTableProps {
  images: ImageData[];
  onEdit: (image: ImageData) => void;
  onResize: (id: string) => void;
  onDelete: (id: string) => void;
  processingImageId: string | null;
}

export const MediaTable = ({
  images,
  onEdit,
  onResize,
  onDelete,
  processingImageId,
}: MediaTableProps) => {
  return (
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
                  onClick={() => onEdit(image)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onResize(image.id)}
                  disabled={processingImageId === image.id}
                >
                  <Maximize2 className={`h-4 w-4 ${processingImageId === image.id ? 'animate-spin' : ''}`} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onDelete(image.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};