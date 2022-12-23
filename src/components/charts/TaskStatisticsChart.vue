<template>
    <div class="global-frame-fillet" style="width: 1000px; height: 550px">
        <div class="global-chart-title">{{ lang.title }}</div>
        <div style="width: 100%; height: 100%" id="chart-task-completion-statistics"/>
    </div>
</template>

<script lang="ts" setup>
    import * as echarts from "echarts";
    import { onMounted, ref } from "vue";
    import ApplicationUtils from "@/utils/ApplicationUtils";
    import RequestUtils from "@/utils/RequestUtils";
    import StatusCode from "@/utils/enums/StatusCode";

    const props = defineProps<{
        uuid: string
    }>();

    const lang = ApplicationUtils.locale.chart.taskStatistics;

    const dateList = ref<Array<string>>([]);
    const creationList = ref<Array<number | null>>([]);
    const completionList = ref<Array<number | null>>([]);

    async function init() {
        await RequestUtils.getTaskStatistics(props.uuid).then(resp => {
            if (resp.statusCode !== StatusCode.success) return;

            dateList.value = resp.responseData.dateList;
            creationList.value = resp.responseData.creationList;
            completionList.value = resp.responseData.completionList;
        });

        const chart = echarts.init(document.getElementById("chart-task-completion-statistics")!);

        const option = {
            tooltip: { show: true, trigger: "axis" },
            xAxis: {
                type: "category",
                data: dateList.value
            },
            yAxis: {
                type: "value"
            },
            series: [
                {
                    name: lang.creation,
                    data: creationList.value,
                    type: "line",
                    smooth: true,
                    connectNulls: true
                },
                {
                    name: lang.completion,
                    data: completionList.value,
                    type: "line",
                    smooth: true,
                    connectNulls: true
                }
            ],
            dataZoom: [
                { show: "true", start: 35, end: 100 }
            ],
            legend: {
                data: [lang.creation, lang.completion]
            }
        };

        chart.setOption(option);
        window.addEventListener("resize", () => chart.resize());
    }

    onMounted(() => init());
</script>
