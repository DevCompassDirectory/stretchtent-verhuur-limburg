export type ProductType = "tent" | "floor" | "lighting" | "furniture";

export interface Accessory {
  id: string;
  name: string;
  description: string;
  short_description: string;
  image: string;
  type: ProductType;
  display_order: number;
  slug: string;
  created_at: string;
  updated_at: string;
}