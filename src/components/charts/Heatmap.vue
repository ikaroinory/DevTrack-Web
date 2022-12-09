<template>
    <div class="block-features">
        <div class="block-title" v-text="lang.title"/>
        <calendar-heatmap class="chart-heatmap"
                          :tooltip-formatter="tooltipFormatter"
                          :range-color="rangeColor" :values="props.data"
                          :end-date="Date.now()"
                          :no-data-text="lang.noData"
                          :round="2"
        />
    </div>
</template>

<script lang="ts" setup>
    import { CalendarHeatmap } from "vue3-calendar-heatmap";
    import { CalendarItem } from "vue3-calendar-heatmap/dist/src/components/Heatmap";
    import ApplicationUtils from "@/utils/ApplicationUtils";

    const props = defineProps<{
        data: Array<{ date: string, count: number | null }>
    }>();

    const lang = ApplicationUtils.locale.chart.heatmap;

    const rangeColor = [
        "#ebedf0", "#9be9a8", "#40c463",
        "#30a14e", "#216e39", "#0e4429"
    ];
    const tooltipFormatter = (item: CalendarItem, unit: string) => {
        const year = item.date.getFullYear();
        const month = item.date.getMonth() + 1;
        const day = item.date.getDate();
        const date = year + "-" +
            (month < 10 ? "0" + month : month) + "-" +
            (day < 10 ? "0" + day : day);
        return lang.finishSomeTasks.replace("%d", (item.count ?? 0).toString())
            .replace("%x", date);
    };
</script>

<style scoped>
    .block-features {
        width: 100%;
        height: 180px;
        padding: 16px;
        text-align: left;
        background-color: #ffffff;
        border: 1px solid #e4e7ed;
        border-radius: var(--border-radius-item);
        box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
    }

    .block-title {
        padding: 0 16px;
        color: #8b949e;
        font-size: 10px;
    }

    .chart-heatmap {
        margin-top: 9px;
    }
</style>
