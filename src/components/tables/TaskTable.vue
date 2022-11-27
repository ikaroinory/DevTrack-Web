<template>
    <el-table
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        @row-click="openDetails"
        :row-style="{height: actualHeight}">
        <template v-for="(item,index) in tableHead">
            <el-table-column :prop="item.data"
                             :label="item.columnLabel"
            />
        </template>
    </el-table>

    <div class="pagination-box" style="margin-top:15px;">
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

    const currentPage = ref(1);
    const pageSize = ref(12);
    const tableDialogVisible = ref(false);
    let windowHeight = window.innerHeight;
    let actualHeight = (windowHeight - 231) / 12 + "px";

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
            columnLabel: "任务名称"
        },
        {
            data: "principal",
            columnLabel: "负责人"
        },
        {
            data: "startDate",
            columnLabel: "开始时间"
        },
        {
            data: "endDate",
            columnLabel: "截止时间"
        },
        {
            data: "status",
            columnLabel: "任务状态"
        }
    ];
</script>

<style scoped>
    .el-table >>> .warning-row {
        --el-table-tr-bg-color: var(--el-color-warning-light-9);
    }

    .el-table >>> .success-row {
        --el-table-tr-bg-color: var(--el-color-success-light-9);
    }

    .taskDialogComponents {
        height: 60vh;
    }

    .pagination-box {
        position: absolute;
        bottom: 7px;
        transform: translate(-50%);
        left: 50%;
    }

    .pagination-box >>> .el-pagination__total {
        width: 100px;
        display: flex;
        justify-content: right;
    }

    .el-table >>> .el-table__row:hover {
        cursor: pointer;
    }
</style>