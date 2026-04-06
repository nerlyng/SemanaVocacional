// @ts-check
import { defineConfig } from 'astro/config';
import vercel from "@astrojs/vercel/serverless";



// https://astro.build/config
export default defineConfig({
   output: "server",
   adapter: vercel({
    // aquí puedes poner opciones si quieres,
    // por ejemplo isr: true
  }),
});
