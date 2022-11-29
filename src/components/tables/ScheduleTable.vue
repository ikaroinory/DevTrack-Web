<template>
    <el-scrollbar>
        <el-table
            :data="tableData"
            style="width: 100%;"
            :height="actualHeight"
            ref="tableRef"
            :row-style="{height: tableHeight + 'px'}">
           >
            <template v-for="item in tableHead">
                <el-table-column :prop="item.data" :label="item.columnLabel"/>
            </template>
        </el-table>
    </el-scrollbar>
</template>

<script lang="ts" setup>
    import { onMounted, ref } from "vue";

    let windowHeight = window.innerHeight;
    let actualHeight = (windowHeight - 74) / 2 - 78 + "px";
    const tableRef = ref();
    const tableHeight = ref(0);
    onMounted(() => {
        tableHeight.value = (tableRef.value.$el.clientHeight - 40) / 5;
    })

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
            columnLabel: "任务名称"
        },
        {
            data: "principal",
            columnLabel: "负责人"
        }
    ];
</script>

<style scoped>

</style>