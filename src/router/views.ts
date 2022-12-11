import { RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";
import ForgotPassword from "@/views/ForgotPassword.vue";
import MainFrame from "@/views/MainFrame.vue";
import mainFrame from "@/router/MainFrame";

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
        path: "/forgotpassword",
        name: "forgotPassword",
        component: ForgotPassword
    },
    {
        path: "/main",
        name: "mainFrame",
        component: MainFrame,
        children: mainFrame,
        redirect: { name: "dashboard" }
    }
];

export default views;
