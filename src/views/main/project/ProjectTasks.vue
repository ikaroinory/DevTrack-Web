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
            <el-table v-loading="loading" max-height="570" :data="tasks" @row-click="showDialog">
                <el-table-column label="No" type="index" :index="1"/>
                <el-table-column :label="lang.name" prop="taskName"/>
                <el-table-column :label="lang.type">
                    <template #default="scope">
                        <div v-if="scope.row.taskType === 1"
                             v-text="enums.newFeature"
                        />
                        <div v-else-if="scope.row.taskType === 2"
                             v-text="enums.bugfix"
                        />
                        <div v-else
                             v-text="enums.unknown"
                        />
                    </template>
                </el-table-column>
                <el-table-column :label="lang.priority">
                    <template #default="scope">
                        <div v-if="scope.row.priority === 1"
                             v-text="enums.general"
                        />
                        <div v-else-if="scope.row.priority === 2"
                             v-text="enums.normal"
                        />
                        <div v-else-if="scope.row.priority === 3"
                             v-text="enums.important"
                        />
                        <div v-else-if="scope.row.priority === 4"
                             v-text="enums.urgent"
                        />
                        <div v-else-if="scope.row.priority === 5"
                             v-text="enums.mostUrgent"
                        />
                        <div v-else
                             v-text="enums.unknown"
                        />
                    </template>
                </el-table-column>
                <el-table-column :label="lang.sourceOfDemand">
                    <template #default="scope">
                        <div v-if="scope.row.sourceOfDemand === 1"
                             v-text="enums.rdPost"
                        />
                        <div v-else-if="scope.row.sourceOfDemand === 2"
                             v-text="enums.testPost"
                        />
                        <div v-else
                             v-text="enums.unknown"
                        />
                    </template>
                </el-table-column>
                <el-table-column :label="lang.startTime">
                    <template #default="scope">
                        <div v-text="(scope.row.startTime ?? '').replace('T',' ')"/>
                    </template>
                </el-table-column>
                <el-table-column :label="lang.deadline">
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
    />
</template>

<script lang="ts" setup>
    import { ref } from "vue";
    import { Plus } from "@icon-park/vue-next";
    import NewTaskDialog from "@/components/dialogs/NewTaskDialog.vue";
    import TaskInformation from "@/utils/dto/TaskInformation";
    import TaskInformationDialog from "@/components/dialogs/TaskInformationDialog.vue";
    import ApplicationUtils from "@/utils/ApplicationUtils";
    import RequestUtils from "@/utils/RequestUtils";

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

    init();

    function init() {
        ApplicationUtils.setTitle(lang.title);
        getPage(currentPage.value);
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
</script>
