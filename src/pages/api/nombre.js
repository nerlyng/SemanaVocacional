// src/pages/api/nombre.js
export const prerender = false; // esto indica a Astro que no haga SSG

import { supabase } from "../../lib/supabase.js";

export async function GET({ request }) {
  try {

   // 1. Llamar a la función que devuelve seminarista aleatorio
    const { data, error } = await supabase
     .rpc("obtenerseminarista");

    if (error) throw error;
   
     // Supabase devuelve un array, tomar el primer elemento
    const seminarista = Array.isArray(data) ? data[0] : data;

    //console.log("📌 Nombre aleatorio obtenido- nuevo:", seminarista.nombre); 
    //console.log("📌 URL foto:", seminarista.foto);
 
     // Validación por si no hay resultados
    if (!seminarista || !seminarista.nombre) {
      return new Response(
        JSON.stringify({ message: "No hay seminaristas disponibles. END POINT" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

     // 2. Obtener IP del request (Vercel suele enviarla en esta cabecera)
    const ip = request.headers.get("x-forwarded-for") || "IP no disponible";
   
    // 3. Insertar en la tabla Intenciones (fechaHora la pone la BD con DEFAULT now())
    const { error: insertError } = await supabase.from("intenciones").insert([
      {
        seminarista: seminarista.nombre,
        ip: ip,
      },
    ]);

    if (insertError) {
      console.error("❌ Error insertando intención:", insertError);
    }

    // Si la foto está en Supabase Storage, convertirla en URL pública
    let fotoPublica = seminarista.foto;
   
    // Retornar nombre y foto pública
    return new Response(
      JSON.stringify({ nombre: seminarista.nombre, foto: fotoPublica, anno:seminarista.anno, parroquia: seminarista.parroquia }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    
  console.error("❌ ERROR EN ENDPOINT:", err);
   

  return new Response(
  JSON.stringify({ error: err.message || "Error interno del servidor" }),
  {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"
    }
  }
);
  }
}