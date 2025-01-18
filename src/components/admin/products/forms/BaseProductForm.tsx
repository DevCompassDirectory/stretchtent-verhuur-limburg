import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useProductSubmit } from "../hooks/useProductSubmit";
import * as z from "zod";

const baseProductSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  description: z.string().optional(),
  price: z.string().min(1, "Price is required").transform((val) => Number(val)),
  category_id: z.string().min(1, "Category is required"),
  sort_order: z.number().int().min(0),
  is_active: z.boolean(),
});

export type BaseProductFormValues = z.infer<typeof baseProductSchema>;

interface BaseProductFormProps {
  product?: any;
  onSuccess: () => void;
  productTypeId: string;
  extraFields?: React.ReactNode;
}

export const BaseProductForm = ({ 
  product, 
  onSuccess, 
  productTypeId,
  extraFields 
}: BaseProductFormProps) => {
  const form = useForm<BaseProductFormValues>({
    resolver: zodResolver(baseProductSchema),
    defaultValues: {
      name: product?.name || "",
      slug: product?.slug || "",
      description: product?.description || "",
      price: product?.price?.toString() || "",
      category_id: product?.category_id || "",
      sort_order: product?.sort_order || 0,
      is_active: product?.is_active ?? true,
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["rental-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("rental_categories")
        .select("*")
        .order("sort_order");
      
      if (error) throw error;
      return data;
    },
  });

  const handleSubmit = useProductSubmit(onSuccess);

  const onSubmit = async (values: BaseProductFormValues) => {
    await handleSubmit({
      ...values,
      product_type_id: productTypeId,
      details: {},
    }, product?.id);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
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
          name="description"
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
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sort_order"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sort Order</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="is_active"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Active</FormLabel>
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

        {extraFields}

        <Button type="submit" className="w-full">
          {product ? "Update" : "Create"} Product
        </Button>
      </form>
    </Form>
  );
};