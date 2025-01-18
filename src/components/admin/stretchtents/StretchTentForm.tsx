import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { ImageSelector } from "@/components/admin/ImageSelector";
import { BasicInfoFields } from "./form/BasicInfoFields";
import { SpecificationsFields } from "./form/SpecificationsFields";
import { FeaturesFields } from "./form/FeaturesFields";
import { useStretchTentForm } from "@/hooks/use-stretchtent-form";
import type { Tent } from "@/types/tent";

interface StretchTentFormProps {
  tent: Tent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export const StretchTentForm = ({
  tent,
  open,
  onOpenChange,
  onSuccess,
}: StretchTentFormProps) => {
  const { form, onSubmit } = useStretchTentForm(tent, onSuccess, onOpenChange);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {tent ? "Edit Stretchtent" : "Add Stretchtent"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <BasicInfoFields form={form} />
              <SpecificationsFields form={form} />
              <FeaturesFields form={form} />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <ImageSelector
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="is_custom_config"
                render={({ field }) => (
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <DialogTitle>Custom Configuration</DialogTitle>
                    </div>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                )}
              />
            </div>
            <Button type="submit" className="w-full">
              {tent ? "Save Changes" : "Create Stretchtent"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};