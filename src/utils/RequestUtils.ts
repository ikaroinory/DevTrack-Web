import axios from "axios";
import LocalStorageUtils from "@/utils/LocalStorageUtils";
import Result from "@/utils/dto/Result";
import SignInForm from "@/utils/forms/SignInForm";
import SignUpForm from "@/utils/forms/SignUpForm";
import UserInformation from "@/utils/dto/UserInformation";
import EmailTaskType from "@/utils/enums/EmailTaskType";
import ProjectMemberInformation from "@/utils/dto/ProjectMemberInformation";
import NewTaskForm from "@/utils/forms/NewTaskForm";
import ProjectList from "@/utils/dto/ProjectList";
import TaskList from "@/utils/dto/TaskList";
import TaskCountStatistics from "@/utils/dto/TaskCountStatistics";
import AvatarForm from "@/utils/forms/AvatarForm";
import EditProfileForm from "@/utils/forms/EditProfileForm";
import PageInformation from "@/utils/dto/PageInformation";
import ProjectInformation from "@/utils/dto/ProjectInformation";
import NewProjectForm from "@/utils/forms/NewProjectForm";
import UpdateProjectForm from "@/utils/forms/UpdateProjectForm";
import AddProjectMembersForm from "@/utils/forms/AddProjectMembersForm";
import TaskInformation from "@/utils/dto/TaskInformation";
import SessionStorageUtils from "@/utils/SessionStorageUtils";
import TokenUtils from "@/utils/TokenUtils";
import router from "@/plugins/VueRouter";
import Role from "@/utils/po/Role";

const source = axios.CancelToken.source();

axios.interceptors.request.use((config) => {
    if (SessionStorageUtils.getAccessMode() === "visitor") return config;
    if (LocalStorageUtils.getToken() === "") return config;

    const token = config.headers?.Authorization as string;
    if (TokenUtils.isInvalid(token)) {
        config.cancelToken = source.token;
        source.cancel("Token invalid");
        SessionStorageUtils.setAccessMode("visitor");
        LocalStorageUtils.removeToken();
        router.push({ name: "signIn" });
    }
    return config;
});

class RequestUrl {
    private static readonly baseUrl = "http://10.117.12.66:8181/";

    private static readonly accountController = "accounts/";
    private static readonly projectController = "projects/";
    private static readonly emailController = "email/";
    private static readonly taskController = "tasks/";
    private static readonly roleController = "role/";

    // Account Controller
    public static readonly signIn = this.baseUrl + this.accountController + "signIn";
    public static readonly signUp = this.baseUrl + this.accountController + "signUp";
    public static readonly autoSignIn = this.baseUrl + this.accountController + "autoSignIn";
    public static readonly updateAvatar = this.baseUrl + this.accountController + "updateAvatar";
    public static readonly editProfile = this.baseUrl + this.accountController + "editProfile";
    public static readonly getUserInformation = this.baseUrl + this.accountController + "getUserInformation";
    public static readonly searchUsers = this.baseUrl + this.accountController + "searchUsers";

    // Email Controller
    public static readonly sendVCode = this.baseUrl + this.emailController + "signUpVCode";

    // Project Controller
    public static readonly getUserProjects = this.baseUrl + this.projectController + "getUserProjects";
    public static readonly getOnePageUserProjects = this.baseUrl + this.projectController + "getOnePageUserProjects";
    public static readonly createProject = this.baseUrl + this.projectController + "newProject";
    public static readonly getProjectInformation = this.baseUrl + this.projectController + "getProjectInfo";
    public static readonly getProjectMemberInformation = this.baseUrl + this.projectController + "getProjectMembers";
    public static readonly updateProject = this.baseUrl + this.projectController + "update";
    public static readonly addProjectMembers = this.baseUrl + this.projectController + "addMembers";
    public static readonly removeProjectMembers = this.baseUrl + this.projectController + "removeMembers";
    public static readonly getOnePageProjectMemberInfo = this.baseUrl + this.projectController + "getOnePageMembers";
    public static readonly getRoles = this.baseUrl + this.projectController + "getRoles";
    public static readonly updateMemberRole = this.baseUrl + RequestUrl.projectController + "updateMemberRole";

    // Task Controller
    public static readonly getTasks = this.baseUrl + this.taskController + "getTasks";
    public static readonly getHeatMap = this.baseUrl + this.taskController + "getHeatMap";
    public static readonly createTask = this.baseUrl + this.taskController + "newTask";
    public static readonly getOnePaeProjectTasks = this.baseUrl + this.taskController + "getOnePageTasks";

    // Role Controller
    public static readonly getOnePageRoles = RequestUrl.baseUrl + RequestUrl.roleController + "getOnePageRoles";
}

export default class RequestUtils {
    private static readonly defaultTimeout: number = 3000;

    private static async get(url: string, form: any, timeout?: number): Promise<Result<any> | any> {
        return (await axios.get(url, {
            params: form,
            timeout: timeout || this.defaultTimeout,
            headers: { Authorization: LocalStorageUtils.getToken() }
        })).data;
    }

    private static async post(url: string, form: any, timeout?: number): Promise<Result<any> | any> {
        return (await axios.post(url, form, {
            headers: { Authorization: LocalStorageUtils.getToken() },
            timeout: timeout || this.defaultTimeout
        })).data;
    }

    private static toFormData(obj: any): FormData {
        const formData = new FormData();
        Object.keys(obj).map(key => formData.append(key, obj[key]));
        return formData;
    }

    // Account Controller
    public static async autoSignIn(): Promise<Result<UserInformation>> {
        return (await this.post(RequestUrl.autoSignIn, null));
    }

    public static async signUp(form: SignUpForm): Promise<Result<undefined>> {
        return (await this.post(RequestUrl.signUp, this.toFormData(form)));
    }

    public static async signIn(form: SignInForm): Promise<Result<string>> {
        return (await this.post(RequestUrl.signIn, this.toFormData(form)));
    }

    public static async getUserInformation(username: string): Promise<Result<UserInformation>> {
        return (await this.get(RequestUrl.getUserInformation, { username }, 1500));
    }

    public static async updateAvatar(form: AvatarForm): Promise<Result<undefined>> {
        return (await this.post(RequestUrl.updateAvatar, this.toFormData(form)));
    }

    public static async editProfile(form: EditProfileForm): Promise<Result<any>> {
        return (await this.post(RequestUrl.editProfile, this.toFormData(form)));
    }

    // Email Controller
    public static async getSignUpCode(email: string): Promise<Result<string>> {
        return (await this.get(RequestUrl.sendVCode, { email, taskType: EmailTaskType.signUp }));
    }

    // Project Controller
    public static async getUserProjectList(userUUID: string): Promise<Result<ProjectList>> {
        return (await this.get(RequestUrl.getUserProjects, { userUUID }, 1000));
    }

    public static async getProjectMemberInformation(uuid: String): Promise<Array<ProjectMemberInformation>> {
        return (await this.get(RequestUrl.getProjectMemberInformation, { uuid }));
    }

    public static async getOnePageUserProjects(pageNum: number, pageSize: number): Promise<PageInformation<ProjectInformation>> {
        return (await this.get(RequestUrl.getOnePageUserProjects, { pageNum, pageSize }));
    }

    public static async newProject(form: NewProjectForm): Promise<Result<string>> {
        return (await this.post(RequestUrl.createProject, this.toFormData(form)));
    }

    public static async getProjectInformation(uuid: String): Promise<Result<ProjectInformation>> {
        return (await this.get(RequestUrl.getProjectInformation, { uuid }));
    }

    public static async getOnePageProjectMemberInformation(pageNum: number, pageSize: number, uuid: String): Promise<PageInformation<ProjectMemberInformation>> {
        return (await this.get(RequestUrl.getOnePageProjectMemberInfo, { pageNum, pageSize, uuid })).resultData;
    }

    public static async updateProject(form: UpdateProjectForm): Promise<Result<undefined>> {
        return (await this.post(RequestUrl.updateProject, this.toFormData(form)));
    }

    public static async removeProjectMember(recordUUID: string) {
        return this.removeProjectMembers({ recordUUIDList: [recordUUID] });
    }

    public static async removeProjectMembers(form: { recordUUIDList: Array<String> }): Promise<Result<undefined>> {
        return (await this.post(RequestUrl.removeProjectMembers, this.toFormData(form)));
    }

    public static async addProjectMembers(form: AddProjectMembersForm): Promise<Result<Number>> {
        return (await this.post(RequestUrl.addProjectMembers, this.toFormData(form)));
    }

    public static async updateMemberRole(recordUUID: string, roleUUID: string) {
        await this.post(RequestUrl.updateMemberRole, this.toFormData({ recordUUID, roleUUID }));
    }

    //Task Controller
    public static async getUserTaskList(userUUID: String): Promise<Result<TaskList>> {
        return (await this.get(RequestUrl.getTasks, { userUUID }, 1000));
    }

    public static async getHeatMap(userUUID: String): Promise<Result<Array<TaskCountStatistics>>> {
        return (await this.get(RequestUrl.getHeatMap, { userUUID }, 1000));
    }

    public static async newTask(form: NewTaskForm): Promise<string> {
        return (await this.post(RequestUrl.createTask, form));
    }

    public static async getOnePageProjectTasks(pageNum: number, pageSize: number, uuid: string): Promise<PageInformation<TaskInformation>> {
        return (await this.get(RequestUrl.getOnePaeProjectTasks, { pageNum, pageSize, uuid }));
    }

    public static async getRoles(projectUUID: string): Promise<Array<Role>> {
        return (await this.get(RequestUrl.getRoles, { projectUUID }));
    }

    // Role Controller
    public static async getOnePageRoles(projectUUID: string, pageNum: number, pageSize: number): Promise<PageInformation<Role>> {
        return (await this.get(RequestUrl.getOnePageRoles, { projectUUID, pageNum, pageSize }));
    }
}
