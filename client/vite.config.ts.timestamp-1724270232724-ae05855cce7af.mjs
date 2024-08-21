// vite.config.ts
import { defineConfig } from "file:///D:/Coding/codesnippet-app/client/node_modules/vite/dist/node/index.js";
import react from "file:///D:/Coding/codesnippet-app/client/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
import { visualizer } from "file:///D:/Coding/codesnippet-app/client/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
var __vite_injected_original_dirname = "D:\\Coding\\codesnippet-app\\client";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: "./dist/stats.html",
      // Output file for the visualization
      open: true
      // Automatically open the visualization in your browser
    })
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false
      },
      "/login": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxDb2RpbmdcXFxcY29kZXNuaXBwZXQtYXBwXFxcXGNsaWVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcQ29kaW5nXFxcXGNvZGVzbmlwcGV0LWFwcFxcXFxjbGllbnRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L0NvZGluZy9jb2Rlc25pcHBldC1hcHAvY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSBcInJvbGx1cC1wbHVnaW4tdmlzdWFsaXplclwiO1xuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG5cdHBsdWdpbnM6IFtcblx0XHRyZWFjdCgpLFxuXHRcdHZpc3VhbGl6ZXIoe1xuXHRcdFx0ZmlsZW5hbWU6IFwiLi9kaXN0L3N0YXRzLmh0bWxcIiwgLy8gT3V0cHV0IGZpbGUgZm9yIHRoZSB2aXN1YWxpemF0aW9uXG5cdFx0XHRvcGVuOiB0cnVlLCAvLyBBdXRvbWF0aWNhbGx5IG9wZW4gdGhlIHZpc3VhbGl6YXRpb24gaW4geW91ciBicm93c2VyXG5cdFx0fSksXG5cdF0sXG5cdHNlcnZlcjoge1xuXHRcdHByb3h5OiB7XG5cdFx0XHRcIi9hcGlcIjoge1xuXHRcdFx0XHR0YXJnZXQ6IFwiaHR0cDovL2xvY2FsaG9zdDozMDAxXCIsXG5cdFx0XHRcdGNoYW5nZU9yaWdpbjogdHJ1ZSxcblx0XHRcdFx0c2VjdXJlOiBmYWxzZSxcblx0XHRcdH0sXG5cdFx0XHRcIi9sb2dpblwiOiB7XG5cdFx0XHRcdHRhcmdldDogXCJodHRwOi8vbG9jYWxob3N0OjMwMDFcIixcblx0XHRcdFx0Y2hhbmdlT3JpZ2luOiB0cnVlLFxuXHRcdFx0XHRzZWN1cmU6IGZhbHNlLFxuXHRcdFx0fSxcblx0XHR9LFxuXHR9LFxuXHRyZXNvbHZlOiB7XG5cdFx0YWxpYXM6IHtcblx0XHRcdFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuXHRcdH0sXG5cdH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFIsU0FBUyxvQkFBb0I7QUFDdlQsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixTQUFTLGtCQUFrQjtBQUgzQixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMzQixTQUFTO0FBQUEsSUFDUixNQUFNO0FBQUEsSUFDTixXQUFXO0FBQUEsTUFDVixVQUFVO0FBQUE7QUFBQSxNQUNWLE1BQU07QUFBQTtBQUFBLElBQ1AsQ0FBQztBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNOLFFBQVE7QUFBQSxRQUNQLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLFFBQVE7QUFBQSxNQUNUO0FBQUEsTUFDQSxVQUFVO0FBQUEsUUFDVCxRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxRQUFRO0FBQUEsTUFDVDtBQUFBLElBQ0Q7QUFBQSxFQUNEO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUixPQUFPO0FBQUEsTUFDTixLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDckM7QUFBQSxFQUNEO0FBQ0QsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
