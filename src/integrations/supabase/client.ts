// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://prhkwvxvrvjhjanhfbfw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByaGt3dnh2cnZqaGphbmhmYmZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxMjkwNzgsImV4cCI6MjA1MjcwNTA3OH0.ULvgjlAdFXt8XXqQ-1HkiVKWB1JWSpQAiLVqH5_LZuk";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);