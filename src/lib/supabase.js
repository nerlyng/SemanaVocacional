
import { createClient } from "@supabase/supabase-js";

// Estas variables deben estar definidas en tu .env
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

// Validación para evitar errores
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Las variables SUPABASE_URL o SUPABASE_ANON_KEY no están definidas");
}
 
export const supabase = createClient(supabaseUrl, supabaseKey);