<template>
    <div class="global-frame-fillet">
        <div class="global-frame-title">{{ lang.title }}</div>
    </div>
    <div style="display: flex">
        <TaskOverviewChart style="width: 30%" :uuid="uuid"/>
        <TaskStatisticsChart style="width: 70%" :uuid="uuid"/>
    </div>
</template>

<script lang="ts" setup>
    import TaskStatisticsChart from "@/components/charts/TaskStatisticsChart.vue";
    import { inject, watch } from "vue";
    import { useRoute } from "vue-router";
    import TaskOverviewChart from "@/components/charts/TaskOverviewChart.vue";
    import ApplicationUtils from "@/utils/ApplicationUtils";

    const props = defineProps<{
        uuid: string
    }>();
    const reload: Function = inject("reload")!;

    const lang = ApplicationUtils.locale.view.projectTableReport;

    watch(useRoute(), () => reload());
</script>
