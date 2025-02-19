// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/Users/petro/OneDrive/%D0%94%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D1%8B/projects/newkod-front/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/petro/OneDrive/%D0%94%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D1%8B/projects/newkod-front/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueDevTools from "file:///C:/Users/petro/OneDrive/%D0%94%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D1%8B/projects/newkod-front/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/Users/petro/OneDrive/%D0%94%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D1%8B/projects/newkod-front/vite.config.js";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    vueDevTools()
  ],
  base: "./",
  // Устанавливаем относительные пути
  build: {
    outDir: "dist",
    // Папка для сборки
    assetsDir: "assets"
    // Каталог для CSS/JS
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxwZXRyb1xcXFxPbmVEcml2ZVxcXFxcdTA0MTRcdTA0M0VcdTA0M0FcdTA0NDNcdTA0M0NcdTA0MzVcdTA0M0RcdTA0NDJcdTA0NEJcXFxccHJvamVjdHNcXFxcbmV3a29kLWZyb250XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxwZXRyb1xcXFxPbmVEcml2ZVxcXFxcdTA0MTRcdTA0M0VcdTA0M0FcdTA0NDNcdTA0M0NcdTA0MzVcdTA0M0RcdTA0NDJcdTA0NEJcXFxccHJvamVjdHNcXFxcbmV3a29kLWZyb250XFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9wZXRyby9PbmVEcml2ZS8lRDAlOTQlRDAlQkUlRDAlQkElRDElODMlRDAlQkMlRDAlQjUlRDAlQkQlRDElODIlRDElOEIvcHJvamVjdHMvbmV3a29kLWZyb250L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCB2dWVEZXZUb29scyBmcm9tICd2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHMnXG5cbi8vIGh0dHBzOi8vdml0ZS5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHZ1ZSgpLFxuICAgIHZ1ZURldlRvb2xzKCksXG4gIF0sXG4gIGJhc2U6IFwiLi9cIiwgLy8gXHUwNDIzXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDNEXHUwNDMwXHUwNDMyXHUwNDNCXHUwNDM4XHUwNDMyXHUwNDMwXHUwNDM1XHUwNDNDIFx1MDQzRVx1MDQ0Mlx1MDQzRFx1MDQzRVx1MDQ0MVx1MDQzOFx1MDQ0Mlx1MDQzNVx1MDQzQlx1MDQ0Q1x1MDQzRFx1MDQ0Qlx1MDQzNSBcdTA0M0ZcdTA0NDNcdTA0NDJcdTA0MzhcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXI6IFwiZGlzdFwiLCAvLyBcdTA0MUZcdTA0MzBcdTA0M0ZcdTA0M0FcdTA0MzAgXHUwNDM0XHUwNDNCXHUwNDRGIFx1MDQ0MVx1MDQzMVx1MDQzRVx1MDQ0MFx1MDQzQVx1MDQzOFxuICAgIGFzc2V0c0RpcjogXCJhc3NldHNcIiwgLy8gXHUwNDFBXHUwNDMwXHUwNDQyXHUwNDMwXHUwNDNCXHUwNDNFXHUwNDMzIFx1MDQzNFx1MDQzQlx1MDQ0RiBDU1MvSlNcbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxuICAgIH0sXG4gIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWtaLFNBQVMsZUFBZSxXQUFXO0FBRXJiLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLGlCQUFpQjtBQUoyTSxJQUFNLDJDQUEyQztBQU9wUixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixZQUFZO0FBQUEsRUFDZDtBQUFBLEVBQ0EsTUFBTTtBQUFBO0FBQUEsRUFDTixPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUE7QUFBQSxJQUNSLFdBQVc7QUFBQTtBQUFBLEVBQ2I7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
