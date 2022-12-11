import { RouteRecordRaw } from "vue-router";
import Dashboard from "@/views/main/Dashboard.vue";
import Profile from "@/views/main/Profile.vue";
import ProjectPreview from "@/views/main/ProjectPreview.vue";
import ProjectFrame from "@/views/main/ProjectFrame.vue";
import Settings from "@/views/main/Settings.vue";
import Notifications from "@/views/main/Notifications.vue";
import projectRouter from "@/router/ProjectRouter";

const mainFrame: Array<RouteRecordRaw> = [
    {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard
    },
    {
        path: "/profile/:username",
        name: "profile",
        component: Profile,
        props: true
    },
    {
        path: "/project/preview",
        name: "projectPreview",
        component: ProjectPreview
    },
    {
        path: "/project/:uuid",
        name: "project",
        component: ProjectFrame,
        props: true,
        children: projectRouter,
        redirect: to => {
            return { name: "projectOverview", params: { uuid: to.params.uuid } };
        }
    },
    {
        path: "/settings",
        name: "settings",
        component: Settings
    },
    {
        path: "/notifications",
        name: "notifications",
        component: Notifications
    }
];

export default mainFrame;
