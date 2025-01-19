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
  value: string | string[];
  onChange: (value: string | string[]) => void;
  onAltTextChange?: (altText: string) => void;
  multiple?: boolean;
}

export const ImageSelector = ({ value, onChange, onAltTextChange, multiple = false }: ImageSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [selectedImages, setSelectedImages] = useState<any[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>("original");

  const { data: images, isLoading } = useQuery({
    queryKey: ["storage-images"],
    queryFn: async () => {
      const { data: files, error } = await supabase
        .from("images")
        .select("*");

      if (error) throw error;
      return files;
    },
  });

  const handleSelect = (image: any) => {
    if (multiple) {
      const isSelected = selectedImages.some(img => img.id === image.id);
      if (isSelected) {
        setSelectedImages(selectedImages.filter(img => img.id !== image.id));
      } else {
        setSelectedImages([...selectedImages, image]);
      }
    } else {
      setSelectedImage(image);
      setSelectedSize("original");
      if (onAltTextChange && image.alt_text) {
        onAltTextChange(image.alt_text);
      }
    }
  };

  const handleConfirm = () => {
    if (multiple) {
      if (selectedImages.length === 0) return;
      const urls = selectedImages.map(image => image.original_url);
      onChange(urls);
    } else {
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
    }
    setIsOpen(false);
    setSelectedImage(null);
    setSelectedImages([]);
    setSelectedSize("original");
  };

  const isImageSelected = (image: any) => {
    if (multiple) {
      return selectedImages.some(img => img.id === image.id);
    }
    return selectedImage?.id === image.id;
  };

  return (
    <div className="space-y-4">
      {value && !multiple && (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
          <img
            src={value as string}
            alt="Selected image"
            className="h-full w-full object-cover"
          />
        </div>
      )}
      {value && multiple && Array.isArray(value) && value.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {value.map((url, index) => (
            <div key={index} className="relative aspect-video overflow-hidden rounded-lg border">
              <img
                src={url}
                alt={`Selected image ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => setIsOpen(true)}
      >
        <Image className="mr-2 h-4 w-4" />
        Choose Image{multiple ? 's' : ''}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Select Image{multiple ? 's' : ''}</DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col space-y-4 max-h-[80vh] overflow-hidden">
            <ScrollArea className="h-[400px] pr-4">
              <div className="grid grid-cols-3 gap-4">
                {isLoading ? (
                  <div>Loading images...</div>
                ) : (
                  images?.map((image) => (
                    <button
                      key={image.filename}
                      className={`relative aspect-video overflow-hidden rounded-lg border transition-all ${
                        isImageSelected(image)
                          ? "border-primary ring-2 ring-primary ring-offset-2"
                          : "hover:border-primary"
                      }`}
                      onClick={() => handleSelect(image)}
                    >
                      <img
                        src={image.original_url}
                        alt={image.alt_text || image.filename}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))
                )}
              </div>
            </ScrollArea>

            {!multiple && selectedImage && (
              <div className="border-t pt-4">
                <div className="space-y-2">
                  <Label>Available Sizes</Label>
                  <RadioGroup
                    value={selectedSize}
                    onValueChange={setSelectedSize}
                    className="flex flex-wrap gap-4"
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
                <Button onClick={handleConfirm} className="w-full mt-4">
                  Confirm Selection
                </Button>
              </div>
            )}
            {multiple && (
              <div className="border-t pt-4">
                <Button onClick={handleConfirm} className="w-full">
                  Confirm Selection ({selectedImages.length} selected)
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};