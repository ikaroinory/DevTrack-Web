<template>
    <div class="table-box">
        <el-table v-loading="loading" :data="tasks" height="100%" :row-style="{height: '7vh'}">
            <el-table-column :label="lang.name" prop="taskName" width="300px">
                <template #default="scope">
                    <el-tooltip effect="dark" v-if="scope.row.taskDescription">
                        <template #content>
                            <template v-for="item in toList(scope.row.taskDescription)">
                                {{ item }} <br/>
                            </template>
                        </template>
                        <div v-text="scope.row.taskName"></div>
                    </el-tooltip>
                    <div v-text="scope.row.taskName" v-else></div>
                </template>
            </el-table-column>
            <el-table-column :label="lang.principal" width="220px">
                <template #default="scope">
                    <UserItem :username="scope.row.principalUsername" :nickname="scope.row.principalNickname"
                              :avatar="scope.row.principalAvatar"
                              router/>
                </template>
            </el-table-column>
            <el-table-column :label="lang.priority" min-width="180px">
                <template #default="scope">
                    <div v-if="scope.row.priority === 1" style="display:flex; align-items: center">
                        <el-icon size="1.2rem" color="rgb(93, 207, 255)" style="margin-right: 6px">
                            <Warning/>
                        </el-icon>
                        <div v-text="enums.general"/>
                    </div>
                    <div v-else-if="scope.row.priority === 2" style="display:flex; align-items: center">
                        <el-icon size="1.2rem" color="rgb(64, 224, 195)" style="margin-right: 6px">
                            <Warning/>
                        </el-icon>
                        <div v-text="enums.normal"/>
                    </div>
                    <div v-else-if="scope.row.priority === 3" style="display:flex; align-items: center">
                        <el-icon size="1.2rem" color="rgb(244, 214, 109)" style="margin-right: 6px">
                            <Warning/>
                        </el-icon>
                        <div v-text="enums.important"/>
                    </div>
                    <div v-else-if="scope.row.priority === 4" style="display:flex; align-items: center">
                        <el-icon size="1.2rem" color="rgb(251, 127, 183)" style="margin-right: 6px">
                            <Warning/>
                        </el-icon>
                        <div v-text="enums.urgent"/>
                    </div>
                    <div v-else-if="scope.row.priority === 5" style="display:flex; align-items: center">
                        <el-icon size="1.2rem" color="rgb(250, 136, 136)" style="margin-right: 6px">
                            <Warning/>
                        </el-icon>
                        <div v-text="enums.mostUrgent"/>
                    </div>
                    <div v-else style="display:flex; align-items: center">
                        <el-icon size="1.2rem" style="margin-right: 6px">
                            <Warning/>
                        </el-icon>
                        <div v-text="enums.unknown"/>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="lang.deadline" min-width="200px">
                <template #default="scope">
                    <div v-text="(scope.row.deadline ?? '').replace('T',' ')"/>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from "vue";
    import { Warning } from "@element-plus/icons-vue";
    import TaskInformation from "@/utils/dto/TaskInformation";
    import UserItem from "@/components/items/UserItem.vue";
    import RequestUtils from "@/utils/RequestUtils";
    import ApplicationUtils from "@/utils/ApplicationUtils";

    const lang = ApplicationUtils.locale.view.scheduleTable;
    const message = ApplicationUtils.locale.message;
    const enums = ApplicationUtils.locale.enum;

    const loading = ref(false);
    const tasks = ref<Array<TaskInformation>>([]);

    init();

    function init() {
        getTasks();
    }

    function getTasks() {
        loading.value = true;
        RequestUtils.getUsersSchedule().then(resp => {
            tasks.value = resp.responseData;
            console.log(tasks.value);
            loading.value = false;
        }).catch(() => {
            ApplicationUtils.showMessage(message.timeout, "error");
            loading.value = false;
        });
    }

    function toList(val: string) {
        return val.split("\n");
    }
</script>

<style scoped>
    .table-box {
        flex-grow: 1;
        height: 0;
        padding: 0 12px;
    }
</style>