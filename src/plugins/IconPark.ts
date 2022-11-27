import { install } from "@icon-park/vue-next/es/all";
import "@icon-park/vue-next/styles/index.css";
import { App } from "vue";

export default (app: App<Element>) => {
    install(app);
}
