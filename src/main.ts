import { createApp } from "vue";
import "./css/base.css";
import "./css/global.css";
import "vue3-calendar-heatmap/dist/style.css"
import App from "./App.vue";

import installElementPlus from "@/plugins/ElementPlus";
import installElementPlusIcon from "@/plugins/ElementPlusIcons";
import installIconPark from "@/plugins/IconPark";
import router from "@/plugins/VueRouter";
import vue3CalendarHeatmap from "vue3-calendar-heatmap";

const app = createApp(App);


installElementPlus(app);
installElementPlusIcon(app);
installIconPark(app);

app.use(router);
app.use(vue3CalendarHeatmap);

app.mount("#app");
