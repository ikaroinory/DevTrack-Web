<template>
    <el-container style="width: 100%; height: 100%; position: absolute">
        <el-header class="sidebar">
            <el-menu class="function-menu" :router="true"
                     :default-active="$route.path.split('/')[1] === 'project' ? '/project/preview' : $route.path"
                     background-color="#3e4963"
                     text-color="white" mode="horizontal">
                <div style="margin-left: 16px">
                    <router-link :to="{name: 'home'}">
                        <div style="display: flex; align-items: center">
                            <img style="width: 40px"
                                 src="../assets/logo/DevTrack_Logo_NoBackground.png"
                                 alt=""
                            />
                            <div style="font-size: 24px; font-weight: bold; margin-right: 20px; color: var(--color-blue)">DevTrack</div>
                        </div>
                    </router-link>
                </div>
                <el-menu-item class="main-menu-item function-menu-item" v-for="item in sideBarList" :index="item.index" :key="item.id">
                    <el-icon>
                        <component :is="item.icon"/>
                    </el-icon>
                    <span>{{ item.name }}</span>
                </el-menu-item>

                <div style="flex-grow: 1"/>

                <el-tooltip placement="bottom" :hide-after="toolTipHideAfter" :content="lang.preferenceSettings">
                    <el-menu-item index="/settings" class="main-menu-item">
                        <el-icon>
                            <Operation/>
                        </el-icon>
                    </el-menu-item>
                </el-tooltip>
                <el-tooltip placement="bottom" :hide-after="toolTipHideAfter" :content="lang.helpAndSupport">
                    <el-menu-item class="main-menu-item">
                        <el-icon>
                            <QuestionFilled/>
                        </el-icon>
                    </el-menu-item>
                </el-tooltip>
                <el-tooltip placement="bottom" :hide-after="toolTipHideAfter" :content="lang.message">
                    <el-menu-item class="main-menu-item">
                        <el-icon>
                            <Bell/>
                        </el-icon>
                    </el-menu-item>
                </el-tooltip>
                <el-menu-item :index="routeList.profile" class="main-menu-item">
                    <el-avatar :size="32" :src="avatar"/>
                </el-menu-item>
            </el-menu>
        </el-header>

        <el-main class="main-view">
            <router-view v-if="isRouterActive"/>
        </el-main>
    </el-container>
</template>

<script lang="ts" setup>
    import { nextTick, provide, reactive, ref } from "vue";
    import { Bell, Operation, QuestionFilled } from "@element-plus/icons-vue";
    import SessionStorageUtils from "@/utils/SessionStorageUtils";
    import ApplicationUtils from "@/utils/ApplicationUtils";

    const lang = ApplicationUtils.locale.view.mainFrame;

    const isRouterActive = ref(true);
    const username = ref("");
    const avatar = ref("");
    const toolTipHideAfter = ref(0);

    const routeList = reactive({
        profile: "/signIn"
    });

    const sideBarList = reactive([
        { id: 1, name: lang.dashboard, index: "/dashboard", icon: "Menu" },
        { id: 2, name: lang.projects, index: "/project/preview", icon: "Files" },
        { id: 3, name: lang.search, index: "/search", icon: "Search" }
    ]);

    init();

    function init() {
        username.value = SessionStorageUtils.getUserUsername();
        avatar.value = SessionStorageUtils.getUserAvatar();
        if (SessionStorageUtils.getAccessMode() === "user") {
            routeList.profile = "/profile/" + username.value;
        }
    }

    provide("reload", () => {
        isRouterActive.value = false;
        nextTick(() => isRouterActive.value = true);
    });
</script>

<style scoped>
    .sidebar {
        --el-header-padding: 0;
        height: 50px;
    }

    .function-menu {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 50px;
        border-bottom: 0;
    }

    .main-view {
        padding: 0;
    }
</style>
