<template>
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

    const props = defineProps<{
        uuid: string
    }>();
    const reload: Function = inject("reload")!;

    watch(useRoute(), () => reload());
</script>

<style scoped>

</style>
