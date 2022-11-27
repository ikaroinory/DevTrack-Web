import UserInformation from "@/utils/dto/UserInformation";

export default class SessionStorageUtils {
    private static readonly userInformation = "userInformation";
    private static readonly accessMode = "accessMode";

    public static setUserInformation(userInformation: UserInformation): void {
        sessionStorage.setItem(this.userInformation, JSON.stringify(userInformation));
    }

    private static getUserInformation(): string {
        return sessionStorage.getItem(this.userInformation) ?? "";
    }

    public static getUserUsername(): string {
        const info = this.getUserInformation();
        if (info === "")
            return "";
        else
            return (JSON.parse(info) as UserInformation).username;
    }

    public static getUserUUID(): string {
        const info = this.getUserInformation();
        if (info === "")
            return "";
        else
            return (JSON.parse(info) as UserInformation).uuid;
    }

    public static getUserNickname(): string {
        const info = this.getUserInformation();
        if (info === "")
            return "";
        else
            return (JSON.parse(info) as UserInformation).nickname;
    }

    public static getUserAvatar(): string {
        const info = this.getUserInformation();
        if (info === "")
            return "";
        else
            return "data:image/jpeg;base64," + (JSON.parse(info) as UserInformation).avatar;
    }

    public static setAccessMode(accessMode: "visitor" | "user"): void {
        sessionStorage.setItem(this.accessMode, accessMode);
    }

    public static getAccessMode(): "visitor" | "user" {
        return sessionStorage.getItem(this.accessMode) as "visitor" | "user" ?? "visitor";
    }
}
