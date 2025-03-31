export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      cart_items: {
        Row: {
          created_at: string;
          id: string;
          product_id: string;
          quantity: number;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          product_id: string;
          quantity?: number;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          product_id?: string;
          quantity?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "cart_items_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          }
        ];
      };
      prescriptions: {
        Row: {
          created_at: string;
          file_url: string;
          id: string;
          medicine_name: string;
          status: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          file_url: string;
          id?: string;
          medicine_name: string;
          status?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string;
          file_url?: string;
          id?: string;
          medicine_name?: string;
          status?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      products: {
        Row: {
          category: string | null;
          created_at: string;
          description: string | null;
          id: string;
          image_url: string | null;
          name: string;
          prescription_required: boolean;
          price: number;
          stock_quantity: number;
          updated_at: string;
        };
        Insert: {
          category?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          image_url?: string | null;
          name: string;
          prescription_required?: boolean;
          price: number;
          stock_quantity?: number;
          updated_at?: string;
        };
        Update: {
          category?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          image_url?: string | null;
          name?: string;
          prescription_required?: boolean;
          price?: number;
          stock_quantity?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          id: string;
          username: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          id: string;
          username?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          id?: string;
          username?: string | null;
        };
        Relationships: [];
      };
      orders: {
        Row: {
          id: number;
          user_id:string;
          order_id: string;
          payment_method: string;
          amount: number;
          items: string;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          order_id: string;
          payment_method: string;
          amount: number;
          items: string;
          status: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          order_id?: string;
          payment_method?: string;
          amount?: number;
          items?: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      consultations: {
        Row: {
          id: string;
          user_id: string;
          contact: string;
          preferred_time: string;
          status: string | null;  // e.g., "Pending", "Confirmed"
          notes: string | null;   // Extra information about the consultation
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          contact: string;
          preferred_time: string;
          status?: string | null; // Optional, default can be "Pending"
          notes?: string | null;  // Optional
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          contact?: string;
          preferred_time?: string;
          status?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "consultations_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
