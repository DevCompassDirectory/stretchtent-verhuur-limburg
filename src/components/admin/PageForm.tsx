import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  is_published: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface PageFormProps {
  initialData?: FormValues;
  onSuccess?: () => void;
}

export function PageForm({ initialData, onSuccess }: PageFormProps) {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      slug: "",
      is_published: false,
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const operation = initialData 
        ? supabase.from("pages").update(values).eq("id", initialData.id)
        : supabase.from("pages").insert(values);

      const { error } = await operation;
      if (error) throw error;

      toast({
        title: "Success",
        description: `Page ${initialData ? "updated" : "created"} successfully`,
      });

      if (onSuccess) {
        onSuccess();
      }

      navigate("/dashboard/pages");
    } catch (error) {
      console.error("Error saving page:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${initialData ? "update" : "create"} page. Please try again.`,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="is_published"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Published</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">
          {initialData ? "Update" : "Create"} Page
        </Button>
      </form>
    </Form>
  );
}