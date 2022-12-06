export default interface ProjectInformation {
    uuid: String;
    name: String;
    creatorUUID: String;
    creatorUsername: String;
    creatorNickname: String;
    creatorAvatar: String;
    principalUUID: String;
    principalUsername: String;
    principalNickname: String;
    principalAvatar: String;
    description: String;
    creationTime: String;
    startTime: String;
    finishTime: String;
    status: number;
    progress: number;
}
