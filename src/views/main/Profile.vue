<template>
    <el-container class="block-features" v-show="!userNotFound" v-loading="loading">
        <el-aside>
            <ProfileDisplay :username="info.username"
                            :nickname="info.nickname"
                            :avatar="info.avatar"
                            :gender="info.gender"
                            :phone="info.phone"
                            :location="info.location"
                            :website="info.website"
                            :introduction="info.introduction"
                            :sign-up-time="info.signUpTime"
                            :last-sign-in-time="info.lastSignInTime"
                            :is-user-himself="isUserHimself"
            />
        </el-aside>
        <el-main>
            <div class="block-main">
                <ProjectsChart v-bind="projectChartInfo"/>
                <TasksChart v-bind="taskChartInfo"/>
                <Heatmap v-bind="heatmapChartInfo"/>
            </div>
        </el-main>
    </el-container>

    <el-empty v-show="userNotFound" :description="lang.userNotFound"/>
</template>

<script lang="ts" setup>
    import { inject, provide, reactive, ref, watch } from "vue";
    import { useRoute } from "vue-router";
    import ApplicationUtils from "@/utils/ApplicationUtils";
    import ProfileDisplay from "@/components/display/ProfileDisplay.vue";
    import StatusCode from "@/utils/enums/StatusCode";
    import ProjectsChart from "@/components/charts/ProjectsChart.vue";
    import TasksChart from "@/components/charts/TasksChart.vue";
    import Heatmap from "@/components/charts/Heatmap.vue";
    import RequestUtils from "@/utils/RequestUtils";
    import HeatMapData from "@/utils/dto/HeatMapData";
    import LocalStorageUtils from "@/utils/LocalStorageUtils";
    import UserInformation from "@/utils/dto/UserInformation";

    const props = defineProps<{
        username: string
    }>();

    provide("reload", () => reload());

    const lang = ApplicationUtils.locale.view.profile;
    const message = ApplicationUtils.locale.message;

    const reload: Function = inject("reload")!;
    const loading = ref(true);
    const userNotFound = ref(false);

    const info = ref<UserInformation>({
        uuid: "",
        nickname: props.username,
        username: props.username,
        avatar: "",
        gender: 0,
        email: "",
        phone: "",
        location: "",
        website: "",
        signUpTime: "",
        introduction: "",
        lastSignInTime: "",
        notStartProject: 0,
        inProgressProject: 0,
        finishedProject: 0,
        notStartTask: 0,
        inProgressTask: 0,
        finishedTask: 0
    });
    const isUserHimself = ref(false);
    const projectChartInfo = reactive({
        notStartProject: -1,
        progressingProject: -1,
        completedProject: -1
    });
    const taskChartInfo = reactive({
        notStartTask: -1,
        progressingTask: -1,
        completedTask: -1
    });
    const heatmapChartInfo = reactive({
        data: new Array<HeatMapData>()
    });

    init();

    async function init() {
        ApplicationUtils.setTitle("Profile");

        await RequestUtils.getUserInformation(props.username).then(resp => {
            if (resp.statusCode == StatusCode.requiredParamsIsEmpty) {
                userNotFound.value = true;
            }
            if (resp.statusCode == StatusCode.userNotFound) {
                userNotFound.value = true;
            }

            if (resp.statusCode == StatusCode.success) {
                info.value = resp.responseData;

                projectChartInfo.notStartProject = resp.responseData.notStartProject;
                projectChartInfo.progressingProject = resp.responseData.inProgressProject;
                projectChartInfo.completedProject = resp.responseData.finishedProject;

                taskChartInfo.notStartTask = resp.responseData.notStartTask;
                taskChartInfo.progressingTask = resp.responseData.inProgressTask;
                taskChartInfo.completedTask = resp.responseData.finishedTask;
            }

            if (props.username === LocalStorageUtils.getUsernameFromToken())
                isUserHimself.value = true;
        }).catch(() => ApplicationUtils.showMessage(message.timeout, "error"));
        RequestUtils.getHeatMap(info.value.uuid).then(resp => {
            if (resp.statusCode === StatusCode.success)
                heatmapChartInfo.data = resp.responseData;
            loading.value = false;
        }).catch(() => {
            ApplicationUtils.showMessage(message.timeout, "error");
            heatmapChartInfo.data = new Array<HeatMapData>();
            loading.value = false;
        });
    }

    watch(useRoute(), () => reload());
</script>

<style scoped>
    .block-features {
        max-width: 1280px;
        margin-top: 24px;
        margin-left: auto;
        margin-right: auto;
    }

    .block-main {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
</style>
