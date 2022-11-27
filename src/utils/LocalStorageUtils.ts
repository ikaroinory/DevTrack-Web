import i18n from "@/plugins/VueI18n";
import Token from "@/utils/dto/Token";
import { Base64 } from "js-base64";

export default class LocalStorageUtils {
    private static readonly token = "token";
    private static readonly locale = "locale";

    public static setToken(token: string): void {
        localStorage.setItem(this.token, token);
    }

    public static getToken(): string {
        return localStorage.getItem(this.token) ?? "";
    }

    public static getUsernameFromToken(): string {
        const token = this.getToken();
        if (token === "")
            return "";
        else
            return (JSON.parse(Base64.fromBase64(token.split(".")[1])) as Token).aud;
    }

    public static getExpireFromToken(): number {
        const token = this.getToken();
        if (token === "")
            return 0;
        else
            return (JSON.parse(Base64.fromBase64(token.split(".")[1])) as Token).exp;
    }

    public static removeToken(): void {
        localStorage.removeItem(this.token);
    }

    public static setLocale(locale: typeof i18n.global.locale): void {
        localStorage.setItem(this.locale, locale);
    }

    public static getLocale(): typeof i18n.global.locale {
        return (localStorage.getItem(this.locale) || "zh_cn") as typeof i18n.global.locale;
    }
}
