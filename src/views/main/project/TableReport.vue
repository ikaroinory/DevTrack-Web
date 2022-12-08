<template>
    <TaskStatisticsChart :uuid="uuid"/>
</template>

<script lang="ts" setup>
    import TaskStatisticsChart from "@/components/charts/TaskStatisticsChart.vue";
    import { inject, watch } from "vue";
    import { useRoute } from "vue-router";

    const props = defineProps<{
        uuid: string
    }>();
    const reload: Function = inject("reload")!;

    watch(useRoute(), () => reload());
</script>

<style scoped>

</style>
