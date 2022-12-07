export default class StatusCode {
    public static readonly unknown = 0;

    public static readonly success = 100;
    public static readonly recordNotFound = 102;
    public static readonly invalidParams = 105;
    public static readonly requiredParamsIsEmpty = 114;
    public static readonly invalidFiletype = 115;
    public static readonly notUpdate = 197;
    public static readonly permissionDenied = 198;
    public static readonly uuidConflict = 199;

    public static readonly tokenIsEmpty = 201;
    public static readonly expiredToken = 202;
    public static readonly invalidToken = 203;

    public static readonly resendVCode = 300;
    public static readonly vCodeRecordNotFound = 301;
    public static readonly expiredVCode = 302;
    public static readonly vCodeError = 303;
    public static readonly invalidVCode = 305;

    public static readonly passwordError = 401;
    public static readonly userNotFound = 402;
    public static readonly userExists = 403;


    public static readonly projectNotFound = 502;

    public static readonly roleNotFound = 602;
    public static readonly roleRecordExists = 603;
}
