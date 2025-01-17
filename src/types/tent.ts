export interface Tent {
  id: string;
  name: string;
  size: string;
  capacity: string;
  description: string;
  features: string[];
  image: string;
  specifications: {
    width: string;
    length: string;
    height: string;
    area: string;
  };
  isCustomConfig?: boolean;
}