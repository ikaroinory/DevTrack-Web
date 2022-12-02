export default class StatusCode {
    public static readonly unknownError = 0;

    public static readonly success = 100;

    public static readonly userExists = 201;
    public static readonly userNotExists = 202;
    public static readonly passwordError = 203;
    public static readonly userAvatarFileTypeError = 204;

    public static readonly vCodeError = 301;
    public static readonly vCodeInvalid = 302;
    public static readonly vCodeNoRecord = 303;
    public static readonly vCodeResend = 304;

    public static readonly projectNotFound = 401;

    public static readonly roleRecordExists = 501;
    public static readonly roleNotFound = 502;

    public static readonly requiredParamsIsNull = 801;
    public static readonly valueNotUpdate = 802;

    public static readonly uuidConflict = 901;
}
