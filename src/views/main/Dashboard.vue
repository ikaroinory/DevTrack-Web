<template>
    <div class="dashboard-container">
        <div class="left-container box-style box-flex">
            <div class="top-title">
                <span v-text="lang.taskList"/>
            </div>
            <TaskTable/>
        </div>
        <div class="right-container box-flex">
            <div class="right-box box-style box-flex">
                <div class="top-title">
                    <span v-text="lang.schedule"/>
                </div>
                <ScheduleTable/>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import TaskTable from "@/components/tables/TaskTable.vue";
    import ScheduleTable from "@/components/tables/ScheduleTable.vue";
    import ApplicationUtils from "@/utils/ApplicationUtils";
    const lang = ApplicationUtils.locale.view.dashboard;
</script>

<style scoped>
    .dashboard-container {
        display: flex;
        height: 100%;
        padding: 12px;
        box-sizing: border-box;
    }
    .left-container {
        flex-grow: 5;
        width: 0;
    }
    .right-container {
        flex-grow: 3;
        width: 0;
        margin-left: 12px;
    }
    .right-box {
        flex-grow: 1;
        height: 0;
    }
    .box-flex {
        display: flex;
        flex-direction: column;
    }
    .box-style {
        border-radius: var(--border-radius-item);
        box-shadow: var(--shadow-default);
    }
    .top-title {
        margin: 12px;
        height: 30px;
        padding: 0 12px;
        box-sizing: border-box;
        font-size: 20px;
        font-weight: bold;
    }
</style>
