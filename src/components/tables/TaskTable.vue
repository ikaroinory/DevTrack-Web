<template>
    <div class="table-box">
        <el-table
            :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            style="height: 100%"
            :row-class-name="tableRowClassName"
            @row-click="openDetails"
            :row-style="{height: '7vh'}">
            <template v-for="item in tableHead">
                <el-table-column :prop="item.data"
                                 :label="item.columnLabel"
                />
            </template>
        </el-table>
    </div>

    <div class="pagination-box">
        <el-pagination
            @current-change="handleCurrentChange"
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :background="true"
            :total="tableData.length"
            :hide-on-single-page="true"
        >
        </el-pagination>
    </div>

    <el-dialog v-model="tableDialogVisible" align-center width="70%">
        <div class="taskDialogComponents">
            <TaskTableDetailsDialog/>
        </div>
    </el-dialog>
</template>

<script lang="ts" setup>
    import { ref } from "vue";
    import TaskTableDetailsDialog from "@/components/display/TaskInformationDisplay.vue";
    import ApplicationUtils from "@/utils/ApplicationUtils";

    const lang = ApplicationUtils.locale.view.taskTable;
    const currentPage = ref(1);
    const pageSize = ref(15);
    const tableDialogVisible = ref(false);

    interface Tasks {
        id: number;
        name: string;
        principal: string;
        startDate: string;
        endDate: string;
        status: string;
    }

    const tableRowClassName = ({ row }: { row: Tasks }) => {
        if (row.status === "进行中") {
            return "warning-row";
        } else if (row.status === "已完成") {
            return "success-row";
        }
        return "";
    };

    const openDetails = (row: any) => {
        tableDialogVisible.value = true;
    };

    const handleCurrentChange = (val: number) => {
        currentPage.value = val;
    };

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
        },
        {
            data: "startDate",
            columnLabel: lang.startTime
        },
        {
            data: "endDate",
            columnLabel: lang.deadline
        },
        {
            data: "status",
            columnLabel: lang.status
        }
    ];
</script>

<style scoped>
    :deep(.warning-row) {
        --el-table-tr-bg-color: var(--el-color-warning-light-9);
    }

    :deep(.success-row) {
        --el-table-tr-bg-color: var(--el-color-success-light-9);
    }

    .taskDialogComponents {
        height: 60vh;
    }

    .table-box {
        flex-grow: 1;
        height: 0;
        padding: 0 12px;
    }

    .pagination-box {
        display: flex;
        justify-content: center;
        margin: 12px;
        position: relative;
    }

    /*调整分页中total样式*/
    :deep(.el-pagination__total) {
        width: 100px;
        position: absolute;
        right: 15px;
    }

    :deep(.el-table__row):hover {
        cursor: pointer;
    }
</style>