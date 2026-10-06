export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          role: 'user' | 'admin'
          country: string | null
          created_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin'
          country?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin'
          country?: string | null
          created_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string | null
          location: string
          latitude: number | null
          longitude: number | null
          start_date: string
          end_date: string
          created_by: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          location: string
          latitude?: number | null
          longitude?: number | null
          start_date: string
          end_date: string
          created_by: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          location?: string
          latitude?: number | null
          longitude?: number | null
          start_date?: string
          end_date?: string
          created_by?: string
          created_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          description: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
        }
      }
      registrations: {
        Row: {
          id: string
          event_id: string
          user_id: string
          category_id: string | null
          status: 'pending' | 'confirmed' | 'cancelled'
          registered_at: string
        }
        Insert: {
          id?: string
          event_id: string
          user_id: string
          category_id?: string | null
          status?: 'pending' | 'confirmed' | 'cancelled'
          registered_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          user_id?: string
          category_id?: string | null
          status?: 'pending' | 'confirmed' | 'cancelled'
          registered_at?: string
        }
      }
    }
  }
}
