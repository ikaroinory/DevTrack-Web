<template>
    <div class="block-features">
        <div class="block-title" v-text="lang.title"/>
        <div class="block-charts">
            <div style="width: 100px">
                <div id="chart-tasks"/>
            </div>
            <div style="width: 214px">
                <div>
                    <div class="block-flex">
                        <span class="label-barTitle" v-text="lang.notStart"/>
                        <div>
                            <span class="label-amount">{{ notStartTask < 0 ? 0 : notStartTask }}</span>
                            <span class="label-totalAmount">/{{ taskCount < 0 ? 0 : taskCount }}</span>
                        </div>
                    </div>
                    <el-progress class="chart-bar" :show-text="false" color="#f56c6c" :percentage="notStartPercentage"/>
                </div>
                <div style="margin-top: 16px">
                    <div class="block-flex">
                        <span class="label-barTitle" v-text="lang.inProgress"/>
                        <div>
                            <span class="label-amount">{{ progressingTask < 0 ? 0 : progressingTask }}</span>
                            <span class="label-totalAmount">/{{ taskCount < 0 ? 0 : taskCount }}</span>
                        </div>
                    </div>
                    <el-progress class="chart-bar" :show-text="false" color="#fac858" :percentage="progressingPercentage"/>
                </div>
                <div style="margin-top: 16px">
                    <div class="block-flex">
                        <span class="label-barTitle" v-text="lang.completed"/>
                        <div>
                            <span class="label-amount">{{ completedTask < 0 ? 0 : completedTask }}</span>
                            <span class="label-totalAmount">/{{ taskCount < 0 ? 0 : taskCount }}</span>
                        </div>
                    </div>
                    <el-progress class="chart-bar" :show-text="false" color="#67c23a" :percentage="completedPercentage"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import * as echarts from "echarts";
    import { computed, watch } from "vue";
    import ApplicationUtils from "@/utils/ApplicationUtils";

    const props = defineProps<{
        notStartTask: number,
        progressingTask: number,
        completedTask: number
    }>();

    const lang = ApplicationUtils.locale.chart.tasks;

    const taskCount = computed(() => props.notStartTask + props.progressingTask + props.completedTask);
    const notStartPercentage = computed(() => taskCount.value > 0 ? props.notStartTask * 100 / taskCount.value : 0);
    const progressingPercentage = computed(() => taskCount.value > 0 ? props.progressingTask * 100 / taskCount.value : 0);
    const completedPercentage = computed(() => taskCount.value > 0 ? props.completedTask * 100 / taskCount.value : 0);

    function initialize(): void {
        const chart = echarts.init(document.getElementById("chart-tasks")!, undefined, { width: 100, height: 100 });
        const option = {
            tooltip: { show: true },
            series: [
                {
                    type: "pie",
                    data: [
                        { name: lang.notStart, value: props.notStartTask, itemStyle: { color: "#f56c6c" } },
                        { name: lang.inProgress, value: props.progressingTask, itemStyle: { color: "#fac858" } },
                        { name: lang.completed, value: props.completedTask, itemStyle: { color: "#67c23a" } }
                    ],
                    radius: "90%",
                    label: { show: false }
                }
            ]
        };
        const optionWithNoData = {
            tooltip: { show: true, formatter: lang.noRecords },
            series: [
                {
                    type: "pie",
                    data: [
                        { name: "Tasks", value: 1, itemStyle: { color: "#c8c9cc" } }
                    ],
                    radius: "90%",
                    label: { show: false }
                }
            ]
        };
        chart.setOption(taskCount.value === 0 ? optionWithNoData : option);
        window.addEventListener("resize", () => chart.resize());
    }

    watch(props, () => initialize());
</script>

<style scoped>
    .block-features {
        width: 459px;
        height: 180px;
        margin: 24px 0 0 0 !important;
        padding: 16px 0;
        text-align: left;
        background-color: #ffffff;
        border: 1px solid #e4e7ed;
        border-radius: var(--border-radius-item);
        box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
    }

    .block-flex { display: flex; }

    .block-charts {
        margin: 18px 32px;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .block-title { padding: 0 16px; }

    .block-title, .label-barTitle, .label-totalAmount {
        color: #8b949e;
        font-size: 10px;
    }

    .label-barTitle { width: 80px; }

    .label-amount {
        margin-right: 8px;
        font-size: 16px;
        font-weight: bold;
    }

    .chart-bar { margin-top: 8px; }
</style>
