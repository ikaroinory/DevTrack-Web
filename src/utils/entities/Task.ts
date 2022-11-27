export default interface Task {
    uuid: string;
    fromProject: string;
    id: number;
    type: number;
    title: string;
    creator: string;
    principal: string;
    priority: number;
    sourceOfDemand: number;
    taskStatus: number;
    finished: boolean;
    deleted: boolean;
    creationTime: string;
    startTime: string;
    deadline: string;
    finishTime: string;
    deleteTime: string;
}
