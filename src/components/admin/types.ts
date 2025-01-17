export interface PageComponent {
  id: string;
  component_type: "hero" | "text" | "image" | "gallery" | "cta" | "features" | "testimonials";
  content: any;
  order_index: number;
}