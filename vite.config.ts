import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
    plugins: [
        vue()
    ],
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src"),
            "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
        }
    }
});
