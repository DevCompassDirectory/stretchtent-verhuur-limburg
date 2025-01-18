import * as z from "zod";
import type { Json } from "@/integrations/supabase/types";

export const productFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  description: z.string().optional(),
  price: z.string().min(1, "Price is required").transform((val) => Number(val)),
  category_id: z.string().min(1, "Category is required"),
  product_type_id: z.string().min(1, "Product type is required"),
  sort_order: z.number().int().min(0),
  is_active: z.boolean(),
  details: z.record(z.any()).optional(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;