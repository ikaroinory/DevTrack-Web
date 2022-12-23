<template>
    <div class="table-box">
        <el-table v-loading="loading" :data="tasks" @row-click="showDialog" fit
                  :row-class-name="tableRowClassName" height="100%" :row-style="{height: '7vh'}">
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
            <el-table-column :label="lang.status" min-width="180px">
                <template #default="scope">
                    <div v-if="scope.row.finishTime" style="display:flex; align-items: center">
                        <el-icon size="1.2rem" color="#40e0c3" style="margin-right: 6px">
                            <Clock/>
                        </el-icon>
                        <div v-text="enums.completed"/>
                    </div>
                    <div v-else-if="!scope.row.startTime || new Date(scope.row.startTime).getTime() > Date.now()"
                         style="display:flex; align-items: center">
                        <el-icon size="1.2rem" color="#ff8888" style="margin-right: 6px">
                            <Clock/>
                        </el-icon>
                        <div v-text="enums.notStart"/>
                    </div>
                    <div v-else style="display:flex; align-items: center">
                        <el-icon size="1.2rem" color="#f6c659" style="margin-right: 6px">
                            <Clock/>
                        </el-icon>
                        <div v-text="enums.inProgress"/>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="lang.type" min-width="180px">
                <template #default="scope">
                    <div>
                        {{ GlobalData.taskTypeList.filter(value => value.value === scope.row.taskType)[0].label }}
                    </div>
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
            <el-table-column :label="lang.sourceOfDemand" min-width="200px">
                <template #default="scope">
                    <div>
                        {{
                            GlobalData.sourceOfDemandList.filter(value => value.value === scope.row.sourceOfDemand)[0].label
                        }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="lang.startTime" min-width="200px">
                <template #default="scope">
                    <div v-text="(scope.row.startTime ?? '').replace('T',' ')"/>
                </template>
            </el-table-column>
            <el-table-column :label="lang.deadline" min-width="200px">
                <template #default="scope">
                    <div v-text="(scope.row.deadline ?? '').replace('T',' ')"/>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="pagination-box">
        <el-pagination v-model:current-page="currentPage"
                       v-model:page-size="pageSize"
                       @current-change="changePage"
                       :background="true"
                       :total="recordCount"
                       :hide-on-single-page="false"
        />
    </div>
    <TaskInformationDialog v-model:show="showTaskInformationDialog"
                           :task="currentTask"
                           :project-member-list="projectMemberList"
    />
</template>
<script lang="ts" setup>
    import { ref } from "vue";
    import { Clock, Warning } from "@element-plus/icons-vue";
    import TaskInformation from "@/utils/dto/TaskInformation";
    import TaskInformationDialog from "@/components/dialogs/TaskInformationDialog.vue";
    import ApplicationUtils from "@/utils/ApplicationUtils";
    import GlobalData from "@/utils/GlobalData";
    import RequestUtils from "@/utils/RequestUtils";
    import StatusCode from "@/utils/enums/StatusCode";
    import UserItem from "@/components/items/UserItem.vue";
    import ProjectMemberInformation from "@/utils/dto/ProjectMemberInformation";
    const lang = ApplicationUtils.locale.view.taskTable;
    const message = ApplicationUtils.locale.message;
    const enums = ApplicationUtils.locale.enum;
    const loading = ref(false);
    const showTaskInformationDialog = ref(false);
    const tasks = ref<Array<TaskInformation>>([]);
    const currentTask = ref<TaskInformation>({
        creationTime: "",
        creatorAvatar: "",
        creatorNickname: "",
        creatorUUID: "",
        creatorUsername: "",
        deadline: "",
        finishTime: "",
        fromProjectUUID: "",
        principalAvatar: "",
        principalNickname: "",
        principalUUID: "",
        principalUsername: "",
        priority: 0,
        sourceOfDemand: 0,
        startTime: "",
        taskDescription: "",
        taskName: "",
        taskType: 0,
        taskUUID: ""
    });
    const currentPage = ref(1);
    const pageSize = 10;
    const recordCount = ref(1);
    const projectMemberList = ref<Array<ProjectMemberInformation>>([]);
    const tableRowClassName = ({ row }: { row: TaskInformation }) => {
        if (!row.deadline) return;
        const now = new Date();
        now.setHours(now.getHours() + 8);
        if (Date.parse(row.deadline) < (!row.finishTime ? now.getTime() : Date.parse(row.finishTime)))
            return "expiration-row";
        return;
    };
    init();
    function init() {
        getPage(currentPage.value);
    }
    function clearTable() {
        tasks.value = [];
    }
    function getPage(pageNum: number) {
        loading.value = true;
        RequestUtils.getTasksFromUser(pageNum, pageSize).then(resp => {
            tasks.value = resp.responseData.list;
            recordCount.value = resp.responseData.recordCount;
            loading.value = false;
        }).catch(() => {
            ApplicationUtils.showMessage(message.timeout, "error");
            loading.value = false;
        });
    }
    function changePage(val: number) {
        clearTable();
        getPage(val);
    }
    async function showDialog(row: TaskInformation) {
        currentTask.value = row;
        await RequestUtils.getProjectMemberInformation(currentTask.value?.fromProjectUUID || "").then(resp => {
            if (resp.statusCode !== StatusCode.success) return;
            projectMemberList.value = resp.responseData;
        });
        showTaskInformationDialog.value = true;
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
