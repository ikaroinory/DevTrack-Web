export default interface Project {
    uuid: string;
    name: string;
    creator: string;
    principal: string;
    publicProject: boolean;
    description: string;
    status: string;
    defaultRole: string;
    deleted: boolean;
    creationTime: string;
    startTime: string;
    finishTime: string;
    deleteTime: string;
}
