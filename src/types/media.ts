export interface ImageData {
  id: string;
  filename: string;
  alt_text: string | null;
  original_url: string;
  thumbnail_url: string | null;
  medium_url: string | null;
  large_url: string | null;
  created_at: string;
}