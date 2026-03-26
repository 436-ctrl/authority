import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const rawBasePath = process.env.BASE_PATH?.trim() || "/";
const basePath =
  rawBasePath === "/" ? "/" : `/${rawBasePath.replace(/^\/+/, "").replace(/\/+$/, "")}/`;

export default defineConfig({
  plugins: [react()],
  base: basePath,
});
