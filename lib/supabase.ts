import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types for the contact/demo form
export interface DemoRequest {
  id?: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  position: string;
  employees: string;
  created_at?: string;
}

// Database types for newsletter signups
export interface NewsletterSignup {
  id?: string;
  name: string;
  email: string;
  created_at?: string;
}
