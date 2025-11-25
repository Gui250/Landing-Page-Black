// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Proxy para o backend local (apenas em desenvolvimento)
      // Na Vercel, as requisições /api/* são automaticamente roteadas para serverless functions
      "/api/googlesheets": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/api\/googlesheets/, "/googlesheets"),
      },
      // Qualquer outra requisição para /api será redirecionada para n8n (apenas em desenvolvimento)
      "/api": {
        target: "https://n8n-n8n.4axq9y.easypanel.host",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
