import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageSelector } from "./ImageSelector";
import type { UseFormReturn } from "react-hook-form";
import type { HomePageContent } from "@/types/home";

interface Field {
  name: keyof HomePageContent;
  label: string;
  description: string;
  type?: "text" | "textarea" | "image";
  altTextField?: keyof HomePageContent;
}

interface ContentSectionProps {
  title: string;
  fields: Field[];
  form: UseFormReturn<any>;
  children?: React.ReactNode;
}

export const ContentSection = ({ title, fields, form, children }: ContentSectionProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(() => {})}>
            <div className="border rounded-lg p-4 space-y-4">
              {fields.map((field) => (
                <FormField
                  key={field.name}
                  control={form.control}
                  name={field.name}
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel>{field.label}</FormLabel>
                      <FormControl>
                        {field.type === "textarea" ? (
                          <Textarea
                            {...formField}
                            className="min-h-[100px]"
                          />
                        ) : field.type === "image" ? (
                          <ImageSelector
                            value={formField.value}
                            onChange={formField.onChange}
                            onAltTextChange={field.altTextField ? 
                              (altText) => form.setValue(field.altTextField!, altText) : 
                              undefined}
                          />
                        ) : (
                          <Input {...formField} />
                        )}
                      </FormControl>
                      <FormDescription>{field.description}</FormDescription>
                    </FormItem>
                  )}
                />
              ))}
              {children}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};