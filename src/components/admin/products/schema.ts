import * as z from "zod";
import type { Json } from "@/integrations/supabase/types";

// Create a non-recursive schema for form details
export const detailsSchema = z.record(z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.null(),
  z.array(z.unknown())
]));

export const productFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  description: z.string().optional(),
  price: z.string().min(1, "Price is required").transform((val) => Number(val)),
  category_id: z.string().min(1, "Category is required"),
  product_type_id: z.string().min(1, "Product type is required"),
  sort_order: z.number().int().min(0),
  is_active: z.boolean(),
  details: detailsSchema,
});

export type ProductFormValues = z.infer<typeof productFormSchema>;