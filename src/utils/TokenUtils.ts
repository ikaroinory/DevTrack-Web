import { Base64 } from "js-base64";
import Token from "@/utils/dto/Token";

export default class TokenUtils {
    private static parse(tokenAsBase64: string): Token {
        return JSON.parse(Base64.fromBase64(tokenAsBase64.split(".")[1])) as Token;
    }

    public static getExpire(tokenAsBase64: string): number {
        return this.parse(tokenAsBase64).exp;
    }

    public static isInvalid(tokenAsBase64: string): boolean {
        return this.getExpire(tokenAsBase64) <= Number(Date.now().toString().substring(0, 10));
    }
}
