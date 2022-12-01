export interface Role {
    uuid: string;
    project: string;
    name: string;
    invite: boolean;
    createTask: boolean;
    viewTask: boolean;
    updateTask: boolean;
    deleteTask: boolean;
}
