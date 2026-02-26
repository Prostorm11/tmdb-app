import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    host: true, // allows access from Docker container
    port: 5173,

    proxy: {
      "/api": {
        target: "http://backend:8000", // docker service name
        changeOrigin: true,
        secure: false,
      },
    },
  },
});