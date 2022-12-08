export default interface NewTaskForm {
    fromProject: string;
    type: number;
    title: string;
    principal: string;
    priority: number;
    sourceOfDemand: number;
    description: string;
    startTime: string | Date;
    deadline: string | Date;
    members: Array<string>;
}
