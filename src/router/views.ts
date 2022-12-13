import { RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";
import ForgotPassword from "@/views/ForgotPassword.vue";
import MainFrame from "@/views/MainFrame.vue";
import mainFrame from "@/router/MainFrame";
import NotFound from "@/views/error/NotFound.vue";

const views: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/signin",
        name: "signIn",
        component: SignIn
    },
    {
        path: "/signup",
        name: "signUp",
        component: SignUp
    },
    {
        path: "/account/forget",
        name: "forgotPassword",
        component: ForgotPassword
    },
    {
        path: "/main",
        name: "mainFrame",
        component: MainFrame,
        children: mainFrame,
        redirect: { name: "dashboard" }
    },
    {
        path: "/:catchAll(.*)",
        name: "notFound",
        component: NotFound
    }
];

export default views;
