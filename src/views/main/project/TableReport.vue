<template>
    <div class="global-frame-fillet" style="margin-bottom: 0">
        <div class="global-frame-title">{{ lang.title }}</div>
    </div>
    <div style="display: flex">
        <div>
            <TaskOverviewChart style="width: 22%" :uuid="uuid"/>
            <PlannedCompletionChart style="width: 22%" :uuid="uuid"/>
        </div>
        <TaskStatisticsChart style="width: 78%; margin-left: 0" :uuid="uuid"/>
    </div>
</template>

<script lang="ts" setup>
    import TaskStatisticsChart from "@/components/charts/TaskStatisticsChart.vue";
    import { inject, watch } from "vue";
    import { useRoute } from "vue-router";
    import TaskOverviewChart from "@/components/charts/TaskOverviewChart.vue";
    import ApplicationUtils from "@/utils/ApplicationUtils";
    import PlannedCompletionChart from "@/components/charts/PlannedCompletionChart.vue";

    const props = defineProps<{
        uuid: string
    }>();
    const reload: Function = inject("reload")!;

    const lang = ApplicationUtils.locale.view.projectTableReport;

    watch(useRoute(), () => reload());
</script>
