import { createI18n } from "vue-i18n";

import en_us from "@/lang/en_us";
import zh_cn from "@/lang/zh_cn";
import ko_kr from "@/lang/ko_kr";

const langList = { en_us, zh_cn, ko_kr };

const i18n = createI18n({
    globalInjection: true,
    locale: "en_us",
    messages: langList
});

export default i18n;
