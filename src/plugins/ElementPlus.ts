import { App } from "vue";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import en_us from "element-plus/es/locale/lang/en";

export default (app: App<Element>) => {
    app.use(ElementPlus, { locale: en_us });
};
