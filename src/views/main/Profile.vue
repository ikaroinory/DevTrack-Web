<template>
    <el-container class="block-features" v-show="!userNotFound" v-loading="loading">
        <el-aside>
            <ProfileDisplay v-bind="info"/>
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
    import SessionStorageUtils from "@/utils/SessionStorageUtils";
    import ProjectsChart from "@/components/charts/ProjectsChart.vue";
    import TasksChart from "@/components/charts/TasksChart.vue";
    import Heatmap from "@/components/charts/Heatmap.vue";
    import RequestUtils from "@/utils/RequestUtils";
    import TaskCountStatistics from "@/utils/dto/TaskCountStatistics";

    const props = defineProps<{
        username: string
    }>();

    provide("reload", () => reload());

    const lang = ApplicationUtils.locale.view.profile;
    const message = ApplicationUtils.locale.message;

    const reload: Function = inject("reload")!;
    const loading = ref(true);
    const userNotFound = ref(false);

    const info = reactive({
        uuid: "",
        nickname: props.username,
        username: props.username,
        avatar: "data:image/jpeg;base64,",
        gender: 0,
        phone: "",
        location: "",
        website: "",
        signUpTime: "",
        introduction: "",
        lastSignInTime: "",
        isUserHimself: false
    });
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
        data: new Array<TaskCountStatistics>()
    });

    init();

    async function init() {
        ApplicationUtils.setTitle("Profile");

        await RequestUtils.getUserInformation(props.username).then(resp => {
            if (resp.statusCode == StatusCode.requiredParamsIsNull) {
                ApplicationUtils.showMessage(message.requiredParamsIsNull, "error");
                userNotFound.value = true;
            }
            if (resp.statusCode == StatusCode.userNotExists) {
                ApplicationUtils.showMessage(message.userNotFound, "error");
                userNotFound.value = true;
            }

            if (resp.statusCode == StatusCode.success) {
                info.uuid = resp.resultData.uuid;
                info.nickname = resp.resultData.nickname;
                info.username = resp.resultData.username;
                info.avatar += resp.resultData.avatar;
                info.gender = resp.resultData.gender;
                info.phone = resp.resultData.phone ?? "";
                info.location = resp.resultData.location ?? "";
                info.website = resp.resultData.website ?? "";
                info.introduction = resp.resultData.introduction ?? "";
                info.signUpTime = resp.resultData.signUpTime;
                info.lastSignInTime = resp.resultData.lastSignInTime;
            }

            if (props.username === SessionStorageUtils.getUserUsername())
                info.isUserHimself = true;
        }).catch(() => ApplicationUtils.showMessage(message.timeout, "error"));

        RequestUtils.getUserProjectList(info.uuid).then(resp => {
            if (resp.statusCode === StatusCode.requiredParamsIsNull)
                ApplicationUtils.showMessage(message.uuidInvalid, "error");

            if (resp.statusCode === StatusCode.success) {
                projectChartInfo.notStartProject = resp.resultData.notStart.length;
                projectChartInfo.progressingProject = resp.resultData.progressing.length;
                projectChartInfo.completedProject = resp.resultData.completed.length;
            }
            loading.value = false;
        }).catch(() => {
            ApplicationUtils.showMessage(message.timeout, "error");
            projectChartInfo.notStartProject = 0;
            projectChartInfo.progressingProject = 0;
            projectChartInfo.completedProject = 0;
            loading.value = false;
        });
        RequestUtils.getUserTaskList(info.uuid).then(resp => {
            if (resp.statusCode === StatusCode.requiredParamsIsNull)
                ApplicationUtils.showMessage(message.uuidInvalid, "error");

            if (resp.statusCode === StatusCode.success) {
                taskChartInfo.notStartTask = resp.resultData.notStart.length;
                taskChartInfo.progressingTask = resp.resultData.progressing.length;
                taskChartInfo.completedTask = resp.resultData.completed.length;
            }
            loading.value = false;
        }).catch(() => {
            ApplicationUtils.showMessage(message.timeout, "error");
            taskChartInfo.notStartTask = 0;
            taskChartInfo.progressingTask = 0;
            taskChartInfo.completedTask = 0;
            loading.value = false;
        });
        RequestUtils.getHeatMap(info.uuid).then(resp => {
            if (resp.statusCode === StatusCode.success)
                heatmapChartInfo.data = resp.resultData;
            loading.value = false;
        }).catch(() => {
            ApplicationUtils.showMessage(message.timeout, "error");
            heatmapChartInfo.data = new Array<TaskCountStatistics>();
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
