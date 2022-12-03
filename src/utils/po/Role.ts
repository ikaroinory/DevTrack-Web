export default interface Role {
    uuid: string;
    project: string;
    name: string;
    invite: boolean;
    createTask: boolean;
    updateTask: boolean;
    deleteTask: boolean;
    createRole: boolean;
    updateRole: boolean;
    removeRole: boolean;
}

export const defaultRole: Role = {
    uuid: "",
    project: "",
    name: "",
    invite: false,
    createTask: false,
    updateTask: false,
    deleteTask: false,
    createRole: false,
    updateRole: false,
    removeRole: false
};
