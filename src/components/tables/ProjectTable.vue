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
    interface Projects {
        uuid: string;
        name: string;
        principalUsername: string;
    }

    const tableData: Projects[] = [
        {
            uuid: "1",
            name: "project1",
            principalUsername: "handsome boy",
        },
        {
            uuid: "2",
            name: "project2",
            principalUsername: "wxt",
        },
        {
            uuid: "3",
            name: "project3",
            principalUsername: "twq",
        }
    ];

    const tableHead = [
        {
            data: "name",
            columnLabel: "项目名称"
        },
        {
            data: "principalUsername",
            columnLabel: "负责人"
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