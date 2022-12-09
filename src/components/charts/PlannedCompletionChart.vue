<template>
    <div class="global-frame-fillet" style="min-width: 450px; height: 240px">
        <div class="global-chart-title">{{ lang.title }}</div>
        <div style="width: 100%; height: 100%" id="chart-task-planned-completion"/>
    </div>
</template>

<script lang="ts" setup>
    import ApplicationUtils from "@/utils/ApplicationUtils";
    import { onMounted, ref } from "vue";
    import * as echarts from "echarts";
    import RequestUtils from "@/utils/RequestUtils";
    import StatusCode from "@/utils/enums/StatusCode";

    const props = defineProps<{
        uuid: string
    }>();

    const lang = ApplicationUtils.locale.chart.plannedCompletion;

    const withinDeadlines = ref(0);
    const withoutDeadlines = ref(0);

    async function init() {
        await RequestUtils.getPlannedCompletion(props.uuid).then(resp => {
            if (resp.statusCode !== StatusCode.success) return;

            withinDeadlines.value = resp.responseData.withinDeadlines;
            withoutDeadlines.value = resp.responseData.withoutDeadlines;
        });

        const chart = echarts.init(document.getElementById("chart-task-planned-completion")!);

        const option = {
            tooltip: { trigger: "item" },
            series: [
                {
                    type: "pie",
                    radius: "50%",
                    data: [
                        { value: withoutDeadlines.value, name: lang.withoutDeadlines, itemStyle: { color: "#f56c6c" } },
                        { value: withinDeadlines.value, name: lang.withinDeadlines, itemStyle: { color: "#67c23a" } }
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: "rgba(0, 0, 0, 0.5)"
                        }
                    }
                }
            ]
        };

        chart.setOption(option);
        window.addEventListener("resize", () => chart.resize());
    }

    onMounted(() => init());
</script>
