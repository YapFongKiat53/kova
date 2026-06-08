import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// 直接引入包，TypeScript 会自动将 ssgOptions 的类型合并到 Vite 的 UserConfig 中
import "vite-react-ssg"; 

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/', 
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssgOptions: {
    dirStyle: 'nested'
  }
});