import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  server: {
    mimeTypes: {
      "application/octet-stream": ["mind"]   // 👈 ESSENCIAL para MindAR
    }
  },

  plugins: [
    react(),
    tailwindcss(),

    VitePWA({
      selfDestroying: true, // sem cache offline
      registerType: "autoUpdate",
      includeAssets: [
        "/apple-touch-icon.png",
        "/favicon.svg",
        "/favicon.ico"
      ],
      manifest: {
        name: "Hakken City",
        short_name: "Hakken City",
        description: "A cidade esconde segredos, recompensas e desafios à espera de quem tiver coragem para explorar cada rua.",
        start_url: "/",
        scope: "/",
        display: "standalone",
        orientation: "portrait-primary",
        background_color: "#ffffff",
        theme_color: "#000",
        icons: [
          {
            src: "/logo_192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/logo_512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      },
      workbox: undefined,
      devOptions: { enabled: true }
    })
  ]
});
