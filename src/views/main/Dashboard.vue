<template>
    <div class="main-box">
        <el-container :style="{height:actualHeight}">
            <el-aside class="main-left">
                <div class="function-top">
                    <span v-text="lang.tasks"/>
                    <div style="flex-grow: 1"></div>
                    <el-tooltip effect="dark" :content="lang.newTask" placement="top" :hide-after="0">
                        <el-icon class="main-icon" @click="taskDialogVisible=true">
                            <Plus/>
                        </el-icon>
                    </el-tooltip>
                    <el-tooltip effect="dark" :content="lang.more" placement="top" :hide-after="0">
                        <el-icon class="main-icon">
                            <MoreFilled/>
                        </el-icon>
                    </el-tooltip>
                </div>
                <TaskTable></TaskTable>
            </el-aside>
            <el-container class="main-right">
                <el-header class="main-right-top">
                    <div class="function-top">
                        <span class="date-title">我的日程</span>
                        <el-date-picker v-model="date" type="date" placeholder="Pick a day" :clearable="false"
                                        style="width: 130px;"/>
                        <div style="flex-grow: 1"></div>
                        <el-tooltip effect="dark" content="新建日程" placement="top" :hide-after="0">
                            <el-icon class="main-icon">
                                <Plus/>
                            </el-icon>
                        </el-tooltip>
                        <el-tooltip effect="dark" :content="lang.more" placement="top" :hide-after="0">
                            <el-icon class="main-icon">
                                <MoreFilled/>
                            </el-icon>
                        </el-tooltip>
                    </div>
                    <ScheduleTable></ScheduleTable>
                </el-header>
                <el-main class="main-right-bottom">
                    <div class="function-top">
                        <span v-text="lang.projects"/>
                        <div style="flex-grow: 1"></div>
                        <el-tooltip effect="dark" :content="lang.newProject" placement="top" :hide-after="0">
                            <el-icon class="main-icon">
                                <Plus/>
                            </el-icon>
                        </el-tooltip>
                        <el-tooltip effect="dark" :content="lang.more" placement="top" :hide-after="0">
                            <el-icon class="main-icon">
                                <MoreFilled/>
                            </el-icon>
                        </el-tooltip>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>

    <NewTaskDialog v-model:show="taskDialogVisible"/>
</template>

<script lang="ts" setup>
    import { ref } from "vue";
    import { MoreFilled, Plus } from "@element-plus/icons-vue";
    import TaskTable from "@/components/tables/TaskTable.vue";
    import ScheduleTable from "@/components/tables/ScheduleTable.vue";
    import ApplicationUtils from "@/utils/ApplicationUtils";
    import NewTaskDialog from "@/components/dialogs/NewTaskDialog.vue";

    const lang = ApplicationUtils.locale.view.dashboard;
    let windowHeight = window.innerHeight;
    let actualHeight = windowHeight - 75 + "px";

    const taskDialogVisible = ref(false);

    let myDate = new Date();
    const currentDate = myDate.toLocaleDateString();
    const date = ref(currentDate);

    const taskDialogRef = ref();

    init();

    function init() {
        ApplicationUtils.setTitle("Dashboard");
    }

    function resetForm() {
        taskDialogRef.value.reset();
    }
</script>

<style scoped>
    .main-box {
        background-color: rgb(238, 243, 253);
        padding: 12px;
    }

    .main-left {
        flex-grow: 5;
        background-color: #ffffff;
        border-radius: 5px;
        position: relative;
        padding: 0 15px 15px 15px;
    }

    .function-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        padding: 12px;
        height: 32px;
    }

    .main-right {
        width: 0;
        flex-grow: 3;
        padding-left: 12px;
        display: flex;
        flex-direction: column;
    }

    .main-right .main-right-top {
        height: 0;
        background-color: #ffffff;
        flex-grow: 1;
        border-radius: 5px;
        margin-bottom: 12px;
        --el-header-padding: 0;
        padding: 0 15px 15px 15px;
    }

    .main-right .main-right-bottom {
        height: 0;
        background-color: #ffffff;
        flex-grow: 1;
        border-radius: 5px;
        --el-main-padding: 0;
        padding: 0 15px 15px 15px;
    }

    .date-title {
        padding-right: 12px;
    }

    .main-icon {
        color: #9eacc4;
        font-size: 1.1rem;
        padding: 4px 10px;
    }

    .main-icon:hover {
        color: #348fe4;
        background-color: rgba(52, 143, 228, .1);
        border-radius: 0.25rem;
        cursor: pointer;
    }
</style>
