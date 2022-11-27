/**
 * 业务类型枚举
 *
 * @author Guanyu Hu
 * @since 2022-11-02
 */
export default class EmailTaskType {
    /**
     * 未知业务
     *
     * @author Guanyu Hu
     * @since 2022-11-02
     */
    public static readonly unknownError = 0;

    /**
     * 注册
     *
     * @author Guanyu Hu
     * @since 2022-11-02
     */
    public static readonly signUp = 100;
    /**
     * 登录认证
     *
     * @author Guanyu Hu
     * @since 2022-11-02
     */
    public static readonly signIn = 201;
    /**
     * 修改密码认证
     *
     * @author Guanyu Hu
     * @since 2022-11-02
     */
    public static readonly changePassword = 202;
    /**
     * 修改邮箱认证
     *
     * @author Guanyu Hu
     * @since 2022-11-02
     */
    public static readonly changeEmail = 203;
    /**
     * 新邮箱认证
     *
     * @author Guanyu Hu
     * @since 2022-11-02
     */
    public static readonly newEmail = 204;
    /**
     * 实名认证
     *
     * @author Guanyu Hu
     * @since 2022-11-02
     */
    public static readonly realName = 205;
}
