<template>
    <div class="global-frame-fillet" style="height: 450px">
        <div class="global-chart-title">{{ lang.title }}</div>
        <div style="width: 100%; height: 100%" id="chart-task-overview"/>
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

    const lang = ApplicationUtils.locale.chart.taskOverview;

    const notStart = ref(0);
    const inProgress = ref(0);
    const completed = ref(0);

    async function init() {
        await RequestUtils.getTaskOverview(props.uuid).then(resp => {
            if (resp.statusCode !== StatusCode.success) return;

            notStart.value = resp.responseData.notStart;
            inProgress.value = resp.responseData.inProgress;
            completed.value = resp.responseData.completed;
        });

        const chart = echarts.init(document.getElementById("chart-task-overview")!);

        const option = {
            tooltip: { trigger: "item" },
            legend: {
                orient: "vertical",
                left: "left",
                top: "center"
            },
            series: [
                {
                    type: "pie",
                    radius: "50%",
                    data: [
                        { value: notStart.value, name: lang.notStart, itemStyle: { color: "#f56c6c" } },
                        { value: inProgress.value, name: lang.inProgress, itemStyle: { color: "#fac858" } },
                        { value: completed.value, name: lang.completed, itemStyle: { color: "#67c23a" } }
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
