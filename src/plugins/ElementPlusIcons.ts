import { App } from "vue";

import * as ElementPlusIcons from "@element-plus/icons-vue";

export default (app: App<Element>) => {
    for (const [key, component] of Object.entries(ElementPlusIcons)) {
        app.component(key, component);
    }
};
