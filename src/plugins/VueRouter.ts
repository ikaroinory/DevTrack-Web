import { createRouter, createWebHistory } from "vue-router";

import views from "@/router/views";

const router = createRouter({
    history: createWebHistory(),
    routes: [...views]
});

export default router;
