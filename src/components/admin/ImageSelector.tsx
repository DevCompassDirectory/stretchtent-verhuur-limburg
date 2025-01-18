import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Image } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ImageSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const ImageSelector = ({ value, onChange }: ImageSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<string>("original");

  const { data: images, isLoading } = useQuery({
    queryKey: ["storage-images"],
    queryFn: async () => {
      const { data: files, error } = await supabase.storage
        .from("images")
        .list();

      if (error) throw error;

      // Get public URLs for all images
      const filesWithUrls = await Promise.all(
        files.map(async (file) => {
          const { data: { publicUrl } } = supabase.storage
            .from("images")
            .getPublicUrl(file.name);
          return { ...file, publicUrl };
        })
      );

      return filesWithUrls;
    },
  });

  const handleSelect = async (fileName: string) => {
    const { data, error } = await supabase
      .from("images")
      .select("*")
      .eq("filename", fileName)
      .single();

    if (error) {
      console.error("Error fetching image details:", error);
      return;
    }

    setSelectedImage(data);
    setSelectedSize("original"); // Reset size selection
  };

  const handleConfirm = () => {
    if (!selectedImage) return;

    let selectedUrl = selectedImage.original_url;
    if (selectedSize === "thumbnail" && selectedImage.thumbnail_url) {
      selectedUrl = selectedImage.thumbnail_url;
    } else if (selectedSize === "medium" && selectedImage.medium_url) {
      selectedUrl = selectedImage.medium_url;
    } else if (selectedSize === "large" && selectedImage.large_url) {
      selectedUrl = selectedImage.large_url;
    }

    onChange(selectedUrl);
    setIsOpen(false);
    setSelectedImage(null);
    setSelectedSize("original");
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
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Select Image</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[500px] pr-4">
            <div className="grid grid-cols-3 gap-4">
              {isLoading ? (
                <div>Loading images...</div>
              ) : (
                images?.map((file) => (
                  <button
                    key={file.name}
                    className={`relative aspect-video overflow-hidden rounded-lg border transition-all ${
                      selectedImage?.filename === file.name
                        ? "border-primary ring-2 ring-primary ring-offset-2"
                        : "hover:border-primary"
                    }`}
                    onClick={() => handleSelect(file.name)}
                  >
                    <img
                      src={file.publicUrl}
                      alt={file.name}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))
              )}
            </div>
          </ScrollArea>

          {selectedImage && (
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Available Sizes</Label>
                <RadioGroup
                  value={selectedSize}
                  onValueChange={setSelectedSize}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="original" id="original" />
                    <Label htmlFor="original">Original</Label>
                  </div>
                  {selectedImage.thumbnail_url && (
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="thumbnail" id="thumbnail" />
                      <Label htmlFor="thumbnail">Thumbnail</Label>
                    </div>
                  )}
                  {selectedImage.medium_url && (
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium">Medium</Label>
                    </div>
                  )}
                  {selectedImage.large_url && (
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="large" id="large" />
                      <Label htmlFor="large">Large</Label>
                    </div>
                  )}
                </RadioGroup>
              </div>
              <Button onClick={handleConfirm} className="w-full">
                Confirm Selection
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};