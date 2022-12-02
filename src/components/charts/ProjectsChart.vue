<template>
    <div class="frame-project-display">
        <div class="label-title" v-text="lang.title"/>
        <div class="frame-chart">
            <div style="width: 100px">
                <div id="chart-projects"/>
            </div>
            <div style="width: 214px">
                <div>
                    <div class="block-flex">
                        <span class="label-barTitle" v-text="lang.notStart"/>
                        <div>
                            <span class="label-amount">{{ notStartProject < 0 ? 0 : notStartProject }}</span>
                            <span class="label-totalAmount">/{{ projectCount < 0 ? 0 : projectCount }}</span>
                        </div>
                    </div>
                    <el-progress class="chart-bar" :show-text="false" color="#f56c6c" :percentage="notStartPercentage"/>
                </div>
                <div style="margin-top: 16px">
                    <div class="block-flex">
                        <span class="label-barTitle" v-text="lang.inProgress"/>
                        <div>
                            <span class="label-amount">{{ progressingProject < 0 ? 0 : progressingProject }}</span>
                            <span class="label-totalAmount">/{{ projectCount < 0 ? 0 : projectCount }}</span>
                        </div>
                    </div>
                    <el-progress class="chart-bar" :show-text="false" color="#fac858" :percentage="progressingPercentage"/>
                </div>
                <div style="margin-top: 16px">
                    <div class="block-flex">
                        <span class="label-barTitle" v-text="lang.completed"/>
                        <div>
                            <span class="label-amount">{{ completedProject < 0 ? 0 : completedProject }}</span>
                            <span class="label-totalAmount">/{{ projectCount < 0 ? 0 : projectCount }}</span>
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
        notStartProject: number,
        progressingProject: number,
        completedProject: number
    }>();

    const lang = ApplicationUtils.locale.chart.projects;

    const projectCount = computed(() => props.notStartProject + props.progressingProject + props.completedProject);
    const notStartPercentage = computed(() => projectCount.value > 0 ? props.notStartProject * 100 / projectCount.value : 0);
    const progressingPercentage = computed(() => projectCount.value > 0 ? props.progressingProject * 100 / projectCount.value : 0);
    const completedPercentage = computed(() => projectCount.value > 0 ? props.completedProject * 100 / projectCount.value : 0);

    function initialize(): void {
        const chart = echarts.init(document.getElementById("chart-projects")!, undefined, { width: 100, height: 100 });
        const option = {
            tooltip: { show: true },
            series: [
                {
                    type: "pie",
                    data: [
                        { name: lang.notStart, value: props.notStartProject, itemStyle: { color: "#f56c6c" } },
                        { name: lang.inProgress, value: props.progressingProject, itemStyle: { color: "#fac858" } },
                        { name: lang.completed, value: props.completedProject, itemStyle: { color: "#67c23a" } }
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
                        { name: "Projects", value: 1, itemStyle: { color: "#c8c9cc" } }
                    ],
                    radius: "90%",
                    label: { show: false }
                }
            ]
        };
        chart.setOption(projectCount.value === 0 ? optionWithNoData : option);
        window.addEventListener("resize", () => chart.resize());
    }

    watch(props, () => initialize());
</script>

<style scoped>
    .frame-project-display {
        width: 459px;
        height: 180px;
        margin: 24px 0 0 0 !important;
        padding: 16px 0;
        text-align: left;
        background-color: #ffffff;
        border: 1px solid #e4e7ed;
        border-radius: 4px;
        box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
    }

    .frame-chart {
        margin: 18px 32px;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }


    .block-flex { display: flex; }

    .label-title { padding: 0 16px; }

    .label-title, .label-barTitle, .label-totalAmount {
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
