import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ImageSelector } from "@/components/admin/ImageSelector";
import { BasicInfoFields } from "./form/BasicInfoFields";
import { useAccessoryForm } from "@/hooks/use-accessory-form";
import type { Accessory } from "@/types/accessory";
import { useEffect } from "react";

interface AccessoryFormProps {
  accessory: Accessory | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export const AccessoryForm = ({
  accessory,
  open,
  onOpenChange,
  onSuccess,
}: AccessoryFormProps) => {
  const { form, onSubmit } = useAccessoryForm(accessory, onSuccess, onOpenChange);

  // Reset form when accessory changes
  useEffect(() => {
    if (accessory) {
      form.reset({
        name: accessory.name,
        slug: accessory.slug,
        type: accessory.type,
        description: accessory.description,
        short_description: accessory.short_description,
        image: accessory.image,
        display_order: accessory.display_order,
      });
    } else {
      form.reset({
        name: "",
        slug: "",
        type: "tent",
        description: "",
        short_description: "",
        image: "",
        display_order: 0,
      });
    }
  }, [accessory, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {accessory ? "Edit Accessory" : "Add Accessory"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <BasicInfoFields form={form} />
              <ImageSelector
                value={form.watch("image")}
                onChange={(value) => form.setValue("image", value)}
              />
            </div>
            <Button type="submit" className="w-full">
              {accessory ? "Save Changes" : "Create Accessory"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};