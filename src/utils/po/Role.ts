export default interface Role {
    uuid: string;
    project: string;
    name: string;
    invite: boolean;
    createTask: boolean;
    updateTask: boolean;
    deleteTask: boolean;
}

export const defaultRole: Role = {
    uuid: "",
    project: "",
    name: "",
    invite: false,
    createTask: false,
    updateTask: false,
    deleteTask: false
};
