import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { ImageSelector } from "@/components/admin/ImageSelector";
import { UseFormReturn } from "react-hook-form";
import { ProjectFormValues } from "../ProjectForm";

interface ImageFieldsProps {
  form: UseFormReturn<ProjectFormValues>;
}

export function ImageFields({ form }: ImageFieldsProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="main_image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Hoofdafbeelding</FormLabel>
            <FormControl>
              <ImageSelector
                value={field.value}
                onChange={(value) => {
                  if (typeof value === 'string') {
                    field.onChange(value);
                  }
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="gallery"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Galerij</FormLabel>
            <FormControl>
              <ImageSelector
                value={field.value}
                onChange={field.onChange}
                multiple
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}