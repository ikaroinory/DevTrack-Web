export default class SessionStorageUtils {
    private static readonly avatar = "avatar";
    private static readonly accessMode = "accessMode";

    public static setUserAvatar(avatar: string): void {
        sessionStorage.setItem(this.avatar, "data:image/jpeg;base64," + avatar);
    }

    public static getUserAvatar(): string {
        return sessionStorage.getItem(this.avatar) ?? "data:image/jpeg;base64,";
    }

    public static setAccessMode(accessMode: "visitor" | "user"): void {
        sessionStorage.setItem(this.accessMode, accessMode);
    }

    public static getAccessMode(): "visitor" | "user" {
        return sessionStorage.getItem(this.accessMode) as "visitor" | "user" ?? "visitor";
    }
}
