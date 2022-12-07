export default interface Role {
    uuid: string;
    project: string;
    name: string;
    inviteMember: boolean;
    updateMember: boolean;
    removeMember: boolean;
    updateProject: boolean;
    deleteProject: boolean;
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
    inviteMember: false,
    updateMember: false,
    removeMember: false,
    updateProject: false,
    deleteProject: false,
    createTask: false,
    updateTask: false,
    deleteTask: false,
    createRole: false,
    updateRole: false,
    removeRole: false
};
