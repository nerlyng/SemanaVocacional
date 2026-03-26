import { supabase } from "../../lib/supabase.js";

export const prerender = false;

export async function GET() {
  try {
    // Contar los registros en la tabla 'intenciones'
    const { count, error } = await supabase
      .from("intenciones")
      .select("*", { count: "exact", head: true }); // head:true evita traer todos los datos

    if (error) throw error;

    return new Response(
      JSON.stringify({ total: count }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ total: 0, error: err.message }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
}