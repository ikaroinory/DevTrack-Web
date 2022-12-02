export default interface Role {
    uuid: string;
    project: string;
    name: string;
    invite: boolean;
    createTask: boolean;
    viewTask: boolean;
    updateTask: boolean;
    deleteTask: boolean;
}

export const defaultRole: Role = {
    uuid: "",
    project: "",
    name: "",
    invite: false,
    createTask: false,
    viewTask: false,
    updateTask: false,
    deleteTask: false
};
