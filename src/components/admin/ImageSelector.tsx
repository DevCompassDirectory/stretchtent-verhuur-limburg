import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Image } from "lucide-react";

interface ImageSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const ImageSelector = ({ value, onChange }: ImageSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: images, isLoading } = useQuery({
    queryKey: ["storage-images"],
    queryFn: async () => {
      const { data: files, error } = await supabase.storage
        .from("images")
        .list();

      if (error) throw error;
      return files;
    },
  });

  const handleSelect = (path: string) => {
    const publicUrl = `${path}`;
    onChange(publicUrl);
    setIsOpen(false);
  };

  return (
    <div className="space-y-4">
      {value && (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
          <img
            src={value}
            alt="Selected image"
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => setIsOpen(true)}
      >
        <Image className="mr-2 h-4 w-4" />
        Choose Image
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Select Image</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-4">
            {isLoading ? (
              <div>Loading images...</div>
            ) : (
              images?.map((file) => (
                <button
                  key={file.name}
                  className="relative aspect-video overflow-hidden rounded-lg border hover:border-primary"
                  onClick={() => handleSelect(`/lovable-uploads/${file.name}`)}
                >
                  <img
                    src={`/lovable-uploads/${file.name}`}
                    alt={file.name}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};