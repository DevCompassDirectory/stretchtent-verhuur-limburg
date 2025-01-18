export interface Tent {
  id: string;
  slug: string;
  name: string;
  size: string;
  capacity: string;
  description: string;
  short_description: string;
  features: string[];
  image: string;
  width: string;
  length: string;
  height: string;
  area: string;
  is_custom_config?: boolean;
}