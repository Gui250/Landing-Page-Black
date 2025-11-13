// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Qualquer requisição para /api será redirecionada
      "/api": {
        target: "https://n8n-n8n.4axq9y.easypanel.host", // O seu servidor n8n
        changeOrigin: true, // Necessário para o proxy funcionar corretamente
        // Reescreve a URL: remove /api antes de enviar
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
