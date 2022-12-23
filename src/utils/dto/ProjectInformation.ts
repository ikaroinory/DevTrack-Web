export default interface ProjectInformation {
    uuid: string;
    name: string;
    creatorUUID: string;
    creatorUsername: string;
    creatorNickname: string;
    creatorAvatar: string;
    principalUUID: string;
    principalUsername: string;
    principalNickname: string;
    principalAvatar: string;
    description: string;
    creationTime: string;
    startTime: string;
    finishTime: string;
    status: number;
    progress: number;
}
