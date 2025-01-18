import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { HomePageContent } from "@/types/home";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  hero_title: z.string().min(1, "Title is required"),
  hero_subtitle: z.string().min(1, "Subtitle is required"),
  hero_image: z.string().min(1, "Image URL is required"),
  about_title: z.string().min(1, "Title is required"),
  about_description: z.string().min(1, "Description is required"),
  about_image: z.string().min(1, "Image URL is required"),
  features_title: z.string().min(1, "Title is required"),
  features_subtitle: z.string().min(1, "Subtitle is required"),
  testimonials_title: z.string().min(1, "Title is required"),
  testimonials_subtitle: z.string().min(1, "Subtitle is required"),
  cta_title: z.string().min(1, "Title is required"),
  cta_description: z.string().min(1, "Description is required"),
  meta_title: z.string().min(1, "Meta title is required"),
  meta_description: z.string().min(1, "Meta description is required"),
  og_title: z.string().min(1, "OG title is required"),
  og_description: z.string().min(1, "OG description is required"),
  og_image: z.string().min(1, "OG image URL is required"),
});

interface HomePageFormProps {
  initialData: HomePageContent;
}

export function HomePageForm({ initialData }: HomePageFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hero_title: initialData.hero_title,
      hero_subtitle: initialData.hero_subtitle,
      hero_image: initialData.hero_image,
      about_title: initialData.about_title,
      about_description: initialData.about_description,
      about_image: initialData.about_image,
      features_title: initialData.features_title,
      features_subtitle: initialData.features_subtitle,
      testimonials_title: initialData.testimonials_title,
      testimonials_subtitle: initialData.testimonials_subtitle,
      cta_title: initialData.cta_title,
      cta_description: initialData.cta_description,
      meta_title: initialData.meta_title,
      meta_description: initialData.meta_description,
      og_title: initialData.og_title,
      og_description: initialData.og_description,
      og_image: initialData.og_image,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from("home_page_content")
        .update(values)
        .eq("id", initialData.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Homepage content has been updated.",
      });
    } catch (error) {
      console.error("Error updating content:", error);
      toast({
        title: "Error",
        description: "Failed to update homepage content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Hero Section</h3>
          <FormField
            control={form.control}
            name="hero_title"
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
            name="hero_subtitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subtitle</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hero_image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">About Section</h3>
          <FormField
            control={form.control}
            name="about_title"
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
            name="about_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="about_image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Features Section</h3>
          <FormField
            control={form.control}
            name="features_title"
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
            name="features_subtitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subtitle</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Testimonials Section</h3>
          <FormField
            control={form.control}
            name="testimonials_title"
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
            name="testimonials_subtitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subtitle</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">CTA Section</h3>
          <FormField
            control={form.control}
            name="cta_title"
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
            name="cta_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">SEO Settings</h3>
          <FormField
            control={form.control}
            name="meta_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="meta_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="og_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>OG Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="og_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>OG Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="og_image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>OG Image URL</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </form>
    </Form>
  );
}