export interface ProductType {
  id: string;
  name: string;
  type: 'tent' | 'floor' | 'lighting' | 'furniture';
  form_schema: {
    fields: FormField[];
  };
  created_at: string;
  updated_at: string;
}

export interface FormField {
  name: string;
  type: string;
  label: string;
  required: boolean;
  fields?: FormField[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number | null;
  category_id: string | null;
  product_type_id: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ProductDetails {
  id: string;
  product_id: string;
  details: Record<string, any>;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_id: string;
  is_primary: boolean;
  sort_order: number;
}