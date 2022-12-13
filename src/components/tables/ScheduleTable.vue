<template>
    <div class="table-box">
        <el-table
            :data="tableData"
            style="height: 100%;"
            :row-style="{height: '7vh'}">
            >
            <template v-for="item in tableHead">
                <el-table-column :prop="item.data" :label="item.columnLabel"/>
            </template>
        </el-table>
    </div>
</template>

<script lang="ts" setup>
    import ApplicationUtils from "@/utils/ApplicationUtils";

    const lang = ApplicationUtils.locale.view.scheduleTable;
    interface Tasks {
        id: number;
        name: string;
        principal: string;
        startDate: string;
        endDate: string;
        status: string;
    }

    const tableData: Tasks[] = [
        {
            id: 1,
            name: "project1",
            principal: "handsome boy",
            startDate: "2022-11-13",
            endDate: "2022-11-18",
            status: "未开始"
        },
        {
            id: 2,
            name: "project2",
            principal: "wxt",
            startDate: "2022-11-13",
            endDate: "2022-11-18",
            status: "进行中"
        },
        {
            id: 3,
            name: "project3",
            principal: "twq",
            startDate: "2022-11-13",
            endDate: "2022-11-18",
            status: "已完成"
        },
        {
            id: 4,
            name: "project4",
            principal: "hg",
            startDate: "2022-11-13",
            endDate: "2022-11-18",
            status: "未开始"
        },
        {
            id: 4,
            name: "project4",
            principal: "hg",
            startDate: "2022-11-13",
            endDate: "2022-11-18",
            status: "未开始"
        },
        {
            id: 4,
            name: "project4",
            principal: "hg",
            startDate: "2022-11-13",
            endDate: "2022-11-18",
            status: "未开始"
        },
        {
            id: 4,
            name: "project4",
            principal: "hg",
            startDate: "2022-11-13",
            endDate: "2022-11-18",
            status: "未开始"
        },
        {
            id: 4,
            name: "project4",
            principal: "hg",
            startDate: "2022-11-13",
            endDate: "2022-11-18",
            status: "未开始"
        },
        {
            id: 4,
            name: "project4",
            principal: "hg",
            startDate: "2022-11-13",
            endDate: "2022-11-18",
            status: "未开始"
        },
        {
            id: 4,
            name: "project4",
            principal: "hg",
            startDate: "2022-11-13",
            endDate: "2022-11-18",
            status: "未开始"
        },
        {
            id: 4,
            name: "project4",
            principal: "hg",
            startDate: "2022-11-13",
            endDate: "2022-11-18",
            status: "未开始"
        },
        {
            id: 4,
            name: "project4",
            principal: "hg",
            startDate: "2022-11-13",
            endDate: "2022-11-18",
            status: "未开始"
        },
        {
            id: 4,
            name: "project4",
            principal: "hg",
            startDate: "2022-11-13",
            endDate: "2022-11-18",
            status: "未开始"
        },
        {
            id: 4,
            name: "project4",
            principal: "hg",
            startDate: "2022-11-13",
            endDate: "2022-11-18",
            status: "未开始"
        },
        {
            id: 4,
            name: "project4",
            principal: "hg",
            startDate: "2022-11-13",
            endDate: "2022-11-18",
            status: "未开始"
        },
        {
            id: 4,
            name: "project4",
            principal: "hg",
            startDate: "2022-11-13",
            endDate: "2022-11-18",
            status: "未开始"
        },
        {
            id: 4,
            name: "project4",
            principal: "hg",
            startDate: "2022-11-13",
            endDate: "2022-11-18",
            status: "未开始"
        }
    ];

    const tableHead = [
        {
            data: "name",
            columnLabel: lang.taskName
        },
        {
            data: "principal",
            columnLabel: lang.principal
        }
    ];
</script>

<style scoped>
    .table-box {
        flex-grow: 1;
        height: 0;
        padding: 0 12px;
    }
</style>