import { createI18n } from "vue-i18n";

import en_us from "@/lang/en_us";

const langList = { en_us };

const i18n = createI18n({
    globalInjection: true,
    locale: "en_us",
    messages: langList
});

export default i18n;
