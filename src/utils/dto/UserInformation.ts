export default interface UserInformation {
    uuid: string;
    username: string;
    avatar: string;
    nickname: string;
    gender: number;
    email: string;
    phone: string;
    location: string;
    website: string;
    introduction: string;
    signUpTime: string;
    lastSignInTime: string;
    notStartProject: number;
    inProgressProject: number;
    finishedProject: number;
    notStartTask: number;
    inProgressTask: number;
    finishedTask: number;
}
