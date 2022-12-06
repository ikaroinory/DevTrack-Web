<template>
    <router-view v-if="isRouterAlive"/>
</template>

<script lang="ts" setup>
    import { nextTick, ref } from "vue";
    import LocalStorageUtils from "@/utils/LocalStorageUtils";
    import SessionStorageUtils from "@/utils/SessionStorageUtils";
    import ApplicationUtils from "@/utils/ApplicationUtils";
    import RequestUtils from "@/utils/RequestUtils";
    import router from "@/plugins/VueRouter";
    import StatusCode from "@/utils/enums/StatusCode";

    const message = ApplicationUtils.locale.message;
    const isRouterAlive = ref(true);

    init();

    function init() {
        autoSignIn();
    }

    async function autoSignIn() {
        if (LocalStorageUtils.getToken() === "") return;
        if (SessionStorageUtils.getAccessMode() === "user") return;

        if (LocalStorageUtils.getExpireFromToken() <= Number(Date.now().toString().substring(0, 10))) {
            ApplicationUtils.showMessage(message.invalidTokenSignInAgain, "warning");
        }

        RequestUtils.autoSignIn().then(resp => {
            if (resp === StatusCode.success) {
                ApplicationUtils.showMessage(message.welcomeBack, "success");
                SessionStorageUtils.setAccessMode("user");
                reloadPage();
                routerInterceptor(LocalStorageUtils.getUsernameFromToken());
            }
        });
    }

    function reloadPage(): void {
        isRouterAlive.value = false;
        nextTick(() => isRouterAlive.value = true);
    }

    function routerInterceptor(username: string) {
        const routeName = router.currentRoute.value.name;
        if (routeName === "signIn" || routeName === "signUp")
            router.replace({ name: "profile", params: { username } });
    }
</script>
