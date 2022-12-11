<template>
    <div class="global-frame-fillet">
        <div class="global-vertical-margin">
            <div class="global-flex-box">
                <div class="global-frame-title"
                     v-text="lang.taskList"
                />
                <div>
                    <el-button type="primary" @click="showNewTaskDialog = true">
                        <plus class="global-icon"/>
                        <span v-text="lang.newTask"/>
                    </el-button>
                </div>
            </div>
        </div>

        <div class="global-vertical-margin">
            <el-table v-loading="loading" max-height="570" :data="tasks" @row-click="showDialog" fit
                      :row-class-name="tableRowClassName">
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
                            {{ GlobalData.sourceOfDemandList.filter(value => value.value === scope.row.sourceOfDemand)[0].label }}
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

        <div class="global-vertical-margin">
            <el-pagination v-model:current-page="currentPage"
                           v-model:page-size="pageSize"
                           @current-change="changePage"
                           :background="true"
                           :total="recordCount"
                           :hide-on-single-page="false"
            />
        </div>
    </div>

    <NewTaskDialog v-model:show="showNewTaskDialog" :project-uuid="uuid"/>

    <TaskInformationDialog v-model:show="showTaskInformationDialog"
                           :task="currentTask"
                           :project-member-list="projectMemberList"
    />
</template>

<script lang="ts" setup>
    import { ref } from "vue";
    import { Plus } from "@icon-park/vue-next";
    import { Clock, Warning } from "@element-plus/icons-vue";
    import NewTaskDialog from "@/components/dialogs/NewTaskDialog.vue";
    import TaskInformation from "@/utils/dto/TaskInformation";
    import TaskInformationDialog from "@/components/dialogs/TaskInformationDialog.vue";
    import ApplicationUtils from "@/utils/ApplicationUtils";
    import RequestUtils from "@/utils/RequestUtils";
    import StatusCode from "@/utils/enums/StatusCode";
    import ProjectMemberInformation from "@/utils/dto/ProjectMemberInformation";
    import UserItem from "@/components/items/UserItem.vue";
    import GlobalData from "@/utils/GlobalData";

    const props = defineProps({
        uuid: { type: String, required: true }
    });

    const lang = ApplicationUtils.locale.view.projectTasks;
    const message = ApplicationUtils.locale.message;
    const enums = ApplicationUtils.locale.enum;

    const loading = ref(false);
    const showNewTaskDialog = ref(false);
    const showTaskInformationDialog = ref(false);
    const tasks = ref<Array<TaskInformation>>([]);
    const currentTask = ref<TaskInformation>();
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
        ApplicationUtils.setTitle(lang.title);
        getPage(currentPage.value);

        RequestUtils.getProjectMemberInformation(props.uuid).then(resp => {
            if (resp.statusCode !== StatusCode.success) return;

            projectMemberList.value = resp.responseData;
        });
    }

    function clearTable() {
        tasks.value = [];
    }

    function getPage(pageNum: number) {
        loading.value = true;
        RequestUtils.getOnePageProjectTasks(pageNum, pageSize, props.uuid).then(resp => {
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

    function showDialog(row: TaskInformation) {
        currentTask.value = row;
        showTaskInformationDialog.value = true;
    }

    function toList(val: string) {
        return val.split("\n");
    }
</script>

<style scoped>
    :deep(.expiration-row) {
        --el-table-tr-bg-color: #fde2e2;
    }
</style>