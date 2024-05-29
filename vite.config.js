import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from 'vite-plugin-mkcert';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  server: {
    host:"172.16.1.238",
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
  resolve: {
    alias: [
      // 절대경로로접근하기
      { find: "~/components", replacement: "/src/components" },
      { find: "~/lib", replacement: "/src/lib" },
      { find: "~/routers", replacement: "/src/routers" },
      { find: "~/routes", replacement: "/src/routes" },
      { find: "~/img", replacement: "/src/img"},
      
    ],
  },
});
