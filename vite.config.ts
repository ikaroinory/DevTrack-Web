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
    },
    optimizeDeps: {
        include: [
            "vue",
            "vue3-calendar-heatmap",
            "@element-plus/icons-vue",
            "vue-router",
            "element-plus",
            "@icon-park/vue-next/es/all",
            "js-base64",
            "axios",
            "@icon-park/vue-next",
            "echarts",
            "element-plus/es/locale/lang/en",
            "vue-i18n"
        ]
    }
});
