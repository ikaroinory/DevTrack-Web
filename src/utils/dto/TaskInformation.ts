export default interface TaskInformation {
    taskUUID: string;
    fromProjectUUID: string;
    taskName: string;
    taskType: number;
    creatorUUID: string;
    creatorUsername: string;
    creatorNickname: string;
    creatorAvatar: string;
    principalUUID: string;
    principalUsername: string;
    principalNickname: string;
    principalAvatar: string;
    priority: number;
    sourceOfDemand: number;
    taskDescription: string;
    creationTime: string;
    startTime: string;
    deadline: string;
    finishTime: string;
}
