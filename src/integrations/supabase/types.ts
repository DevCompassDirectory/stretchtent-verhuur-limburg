export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accessories: {
        Row: {
          created_at: string
          description: string
          display_order: number
          id: string
          image: string
          name: string
          short_description: string
          slug: string
          type: Database["public"]["Enums"]["product_type"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          display_order?: number
          id?: string
          image: string
          name: string
          short_description: string
          slug: string
          type: Database["public"]["Enums"]["product_type"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          display_order?: number
          id?: string
          image?: string
          name?: string
          short_description?: string
          slug?: string
          type?: Database["public"]["Enums"]["product_type"]
          updated_at?: string
        }
        Relationships: []
      }
      footer_content: {
        Row: {
          address: string | null
          created_at: string
          description: string
          email: string | null
          id: string
          phone: string | null
          title: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          description?: string
          email?: string | null
          id?: string
          phone?: string | null
          title?: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          created_at?: string
          description?: string
          email?: string | null
          id?: string
          phone?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      footer_social_links: {
        Row: {
          created_at: string
          custom_svg: string | null
          display_order: number
          icon_type: Database["public"]["Enums"]["social_media_icon_type"]
          id: string
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          custom_svg?: string | null
          display_order?: number
          icon_type: Database["public"]["Enums"]["social_media_icon_type"]
          id?: string
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          custom_svg?: string | null
          display_order?: number
          icon_type?: Database["public"]["Enums"]["social_media_icon_type"]
          id?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      home_page_content: {
        Row: {
          about_description: string
          about_image: string
          about_image_alt: string | null
          about_title: string
          created_at: string
          cta_description: string
          cta_title: string
          features_subtitle: string
          features_title: string
          hero_image: string
          hero_image_alt: string | null
          hero_subtitle: string
          hero_title: string
          id: string
          meta_description: string
          meta_title: string
          navbar_logo: string | null
          navbar_text: string | null
          og_description: string
          og_image: string
          og_title: string
          testimonials_subtitle: string
          testimonials_title: string
          updated_at: string
        }
        Insert: {
          about_description?: string
          about_image?: string
          about_image_alt?: string | null
          about_title?: string
          created_at?: string
          cta_description?: string
          cta_title?: string
          features_subtitle?: string
          features_title?: string
          hero_image?: string
          hero_image_alt?: string | null
          hero_subtitle?: string
          hero_title?: string
          id?: string
          meta_description?: string
          meta_title?: string
          navbar_logo?: string | null
          navbar_text?: string | null
          og_description?: string
          og_image?: string
          og_title?: string
          testimonials_subtitle?: string
          testimonials_title?: string
          updated_at?: string
        }
        Update: {
          about_description?: string
          about_image?: string
          about_image_alt?: string | null
          about_title?: string
          created_at?: string
          cta_description?: string
          cta_title?: string
          features_subtitle?: string
          features_title?: string
          hero_image?: string
          hero_image_alt?: string | null
          hero_subtitle?: string
          hero_title?: string
          id?: string
          meta_description?: string
          meta_title?: string
          navbar_logo?: string | null
          navbar_text?: string | null
          og_description?: string
          og_image?: string
          og_title?: string
          testimonials_subtitle?: string
          testimonials_title?: string
          updated_at?: string
        }
        Relationships: []
      }
      images: {
        Row: {
          alt_text: string | null
          created_at: string
          filename: string
          id: string
          large_url: string | null
          medium_url: string | null
          original_url: string
          thumbnail_url: string | null
          updated_at: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          filename: string
          id?: string
          large_url?: string | null
          medium_url?: string | null
          original_url: string
          thumbnail_url?: string | null
          updated_at?: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          filename?: string
          id?: string
          large_url?: string | null
          medium_url?: string | null
          original_url?: string
          thumbnail_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      legal_pages: {
        Row: {
          content: Json
          created_at: string
          id: string
          title: string
          type: Database["public"]["Enums"]["legal_page_type"]
          updated_at: string
        }
        Insert: {
          content?: Json
          created_at?: string
          id?: string
          title: string
          type: Database["public"]["Enums"]["legal_page_type"]
          updated_at?: string
        }
        Update: {
          content?: Json
          created_at?: string
          id?: string
          title?: string
          type?: Database["public"]["Enums"]["legal_page_type"]
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          is_admin: boolean | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          is_admin?: boolean | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_admin?: boolean | null
          updated_at?: string
        }
        Relationships: []
      }
      project_images: {
        Row: {
          created_at: string
          display_order: number
          id: string
          image_url: string
          project_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          id?: string
          image_url: string
          project_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          image_url?: string
          project_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_images_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          category: Database["public"]["Enums"]["project_category"]
          created_at: string
          date: string
          description: string
          display_order: number
          full_description: string
          id: string
          main_image: string
          specs: Json
          title: string
          updated_at: string
        }
        Insert: {
          category: Database["public"]["Enums"]["project_category"]
          created_at?: string
          date: string
          description: string
          display_order?: number
          full_description: string
          id?: string
          main_image: string
          specs?: Json
          title: string
          updated_at?: string
        }
        Update: {
          category?: Database["public"]["Enums"]["project_category"]
          created_at?: string
          date?: string
          description?: string
          display_order?: number
          full_description?: string
          id?: string
          main_image?: string
          specs?: Json
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      stretchtents: {
        Row: {
          area: string
          capacity: string
          created_at: string
          description: string
          display_order: number
          features: string[]
          height: string
          id: string
          image: string
          is_custom_config: boolean | null
          length: string
          name: string
          short_description: string
          size: string
          slug: string
          updated_at: string
          width: string
        }
        Insert: {
          area: string
          capacity: string
          created_at?: string
          description: string
          display_order?: number
          features: string[]
          height: string
          id?: string
          image: string
          is_custom_config?: boolean | null
          length: string
          name: string
          short_description: string
          size: string
          slug: string
          updated_at?: string
          width: string
        }
        Update: {
          area?: string
          capacity?: string
          created_at?: string
          description?: string
          display_order?: number
          features?: string[]
          height?: string
          id?: string
          image?: string
          is_custom_config?: boolean | null
          length?: string
          name?: string
          short_description?: string
          size?: string
          slug?: string
          updated_at?: string
          width?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      component_type:
        | "hero"
        | "text"
        | "image"
        | "gallery"
        | "cta"
        | "features"
        | "testimonials"
      legal_page_type: "privacy" | "terms" | "rental"
      product_type: "deco" | "floor" | "lighting" | "furniture"
      project_category:
        | "bruiloft"
        | "zakelijk"
        | "feest"
        | "festival"
        | "communie"
        | "sport"
        | "baby shower"
        | "verjaardag"
      social_media_icon_type:
        | "facebook"
        | "instagram"
        | "twitter"
        | "linkedin"
        | "youtube"
        | "custom"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
