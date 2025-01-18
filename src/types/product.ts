export type ProductType = {
  id: string;
  name: string;
  type: 'tent' | 'floor' | 'lighting' | 'furniture';
  form_schema: {
    fields: FormField[];
  };
  created_at: string;
  updated_at: string;
};

export type FormField = {
  name: string;
  label: string;
  type: 'text' | 'number' | 'textarea' | 'select' | 'image';
  options?: { label: string; value: string }[];
  required?: boolean;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price?: number;
  category_id?: string;
  product_type_id?: string;
  is_active?: boolean;
  sort_order?: number;
  created_at: string;
  updated_at: string;
};

export type ProductDetails = {
  id: string;
  product_id: string;
  details: Record<string, any>;
  created_at: string;
  updated_at: string;
};