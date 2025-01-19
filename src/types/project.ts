export interface Project {
  id: string;
  title: string;
  description: string;
  full_description: string;
  date: string;
  category: 'bruiloft' | 'zakelijk' | 'feest' | 'festival' | 'communie' | 'sport' | 'baby shower' | 'verjaardag';
  main_image: string;
  display_order: number;
  specs: {
    tentSize: string;
    capacity: string;
    setup: string;
    location: string;
  };
  created_at: string;
  updated_at: string;
}