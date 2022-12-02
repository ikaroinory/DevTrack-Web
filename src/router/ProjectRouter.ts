import { RouteRecordRaw } from "vue-router";
import ProjectOverview from "@/views/main/project/ProjectOverview.vue";
import ProjectMembers from "@/views/main/project/ProjectMembers.vue";
import ProjectTask from "@/views/main/project/ProjectTasks.vue";
import ProjectRoles from "@/views/main/project/ProjectRoles.vue";
import NotFound from "@/views/error/NotFound.vue";

const projectRouter: Array<RouteRecordRaw> = [
    {
        path: "/project/:uuid/overview",
        name: "projectOverview",
        component: ProjectOverview,
        props: true
    },
    {
        path: "/project/:uuid/members",
        name: "projectMembers",
        component: ProjectMembers,
        props: true
    },
    {
        path: "/project/:uuid/tasks",
        name: "projectTask",
        component: ProjectTask,
        props: true
    },
    {
        path: "/project/:uuid/roles",
        name: "projectRoles",
        component: ProjectRoles,
        props: true
    },
    {
        path: "/project/:uuid/:catchAll(.*)",
        name: "notFound",
        component: NotFound
    }
];

export default projectRouter;
