<template>
    <div class="task-details-container task-flex-column">
        <div style="margin-bottom: 20px">
            <el-input v-model="curTaskInformation.taskName"
                      @blur="updateTitle"
                      input-style="font-size: 2rem; height: 3rem;"
            />
        </div>

        <el-row>
            <el-col :span="6">
                <div class="task-flex">
                    <el-icon size="3rem" :style="{color: iconColor}">
                        <Clock/>
                    </el-icon>
                    <div class="task-second-main">
                        <span class="little-text">{{ lang.status }}</span>
                        <div style="padding-left: 11px; margin-top: 6px">{{ status }}</div>
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="task-flex">
                    <el-avatar :size="48" :src="'data:image/jpeg;base64,' + curTaskInformation.principalAvatar"/>
                    <div class="task-second-main">
                        <div class="task-select">
                            <span class="little-text">{{ lang.principal }}</span>
                            <el-select v-model="curTaskInformation.principalUUID" @change="updatePrincipal">
                                <el-option v-for="item in projectMembers"
                                           :key="item.value"
                                           :label="item.label"
                                           :value="item.value"
                                />
                            </el-select>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="task-flex-column">
                    <span class="little-text">{{ lang.startTime }}</span>
                    <el-date-picker v-model="curTaskInformation.startTime"
                                    type="datetime"
                                    :disabled-date="disableStartTime"
                                    @change="updateStartTime"
                    />
                </div>
            </el-col>
            <el-col :span="6">
                <div class="task-flex-column">
                    <span class="little-text">{{ lang.deadline }}</span>
                    <el-date-picker v-model="curTaskInformation.deadline"
                                    type="datetime"
                                    :disabled-date="disableDeadline"
                                    @change="updateDeadline"
                    />
                </div>
            </el-col>
        </el-row>

        <el-divider/>

        <el-row>
            <el-col :span="8">
                <div class="task-flex-column">
                    <span class="little-text">{{ lang.taskType }}</span>
                    <div class="task-select">
                        <el-select v-model="curTaskInformation.taskType" @change="updateType">
                            <el-option v-for="item in taskTypeList"
                                       :key="item.value"
                                       :label="item.label"
                                       :value="item.value"
                            />
                        </el-select>
                    </div>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="task-flex-column">
                    <span class="little-text">{{ lang.priority }}</span>
                    <div class="task-select">
                        <el-select v-model="curTaskInformation.priority" @change="updatePriority">
                            <el-option v-for="item in priorityList"
                                       :key="item.value"
                                       :label="item.label"
                                       :value="item.value"
                            />
                        </el-select>
                    </div>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="task-flex-column">
                    <span class="little-text">{{ lang.sourceOfDemand }}</span>
                    <div class="task-select">
                        <el-select v-model="curTaskInformation.sourceOfDemand" @change="updateSourceOfDemand">
                            <el-option v-for="item in sourceOfDemandList"
                                       :key="item.value"
                                       :label="item.label"
                                       :value="item.value"
                            />
                        </el-select>
                    </div>
                </div>
            </el-col>
        </el-row>

        <el-row style="margin-top: 16px">
            <el-col :span="24">
                <div class="task-flex-column">
                    <span class="little-text">{{ lang.members }}</span>
                    <div class="task-select">
                        <el-select style="width: 100%" v-model="taskMembers" multiple
                                   @visible-change="updateMembers"
                                   @remove-tag="updateMembers(false)">
                            <el-option v-for="item in projectMembers"
                                       :key="item.value"
                                       :label="item.label"
                                       :value="item.value"
                            />
                        </el-select>
                    </div>
                </div>
            </el-col>
        </el-row>

        <div class="task-fourthly-container task-flex-column">
            <span class="little-text">{{ lang.description }}</span>
            <el-input v-model="curTaskInformation.taskDescription"
                      type="textarea" resize="none" maxlength="100" show-word-limit
                      @blur="updateDescription"
            />
        </div>

        <div>
            <el-button v-if="!isFinished" type="success" @click="finishTask(true)">{{ lang.finish }}</el-button>
            <el-button v-else type="info" @click="finishTask(false)">{{ lang.unfinished }}</el-button>
            <el-button type="danger" @click="deleteTask">{{ lang.delete }}</el-button>
        </div>

        <div style="margin-top: 15px">
            <div class="task-create-info little-text">
                {{ curTaskInformation.creatorNickname }} {{ lang.createAt }} {{ curTaskInformation.creationTime }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { computed, inject, ref } from "vue";
    import { Clock } from "@element-plus/icons-vue";
    import TaskInformation from "@/utils/dto/TaskInformation";
    import ApplicationUtils from "@/utils/ApplicationUtils";
    import RequestUtils from "@/utils/RequestUtils";
    import StatusCode from "@/utils/enums/StatusCode";
    import TaskMemberInformation from "@/utils/dto/TaskMemberInformation";
    import ProjectMemberInformation from "@/utils/dto/ProjectMemberInformation";

    defineExpose({ init });
    const props = defineProps<{
        task: TaskInformation,
        projectMemberList: Array<ProjectMemberInformation>
    }>();
    const reload: Function = inject("reload")!;

    const lang = ApplicationUtils.locale.form.taskInformation;
    const message = ApplicationUtils.locale.message;
    const enumLang = ApplicationUtils.locale.enum;

    const taskTypeList = ref([
        { value: 0, label: enumLang.unknown },
        { value: 1, label: enumLang.newFeature },
        { value: 2, label: enumLang.bugfix }
    ]);
    const priorityList = ref([
        { value: 0, label: enumLang.unknown },
        { value: 1, label: enumLang.general },
        { value: 2, label: enumLang.normal },
        { value: 3, label: enumLang.important },
        { value: 4, label: enumLang.urgent },
        { value: 5, label: enumLang.mostUrgent }
    ]);
    const sourceOfDemandList = ref([
        { value: 0, label: enumLang.unknown },
        { value: 1, label: enumLang.rdPost },
        { value: 2, label: enumLang.testPost }
    ]);

    const curTaskInformation = ref<TaskInformation>({
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
    const projectMemberAvatarList = ref<{ [key: string]: string }>({});
    const projectMembers = ref<Array<{ value: string, label: string }>>([]);
    const oldTaskMembers = ref<Array<string>>([]);
    const taskMembers = ref<Array<string>>([]);

    const iconColor = computed(() => {
        if (curTaskInformation.value.finishTime)
            return "#40e0c3";
        else if (!curTaskInformation.value.startTime || new Date(curTaskInformation.value.startTime).getTime() > Date.now())
            return "#ff8888";
        else
            return "#f6c659";
    });
    const status = computed(() => {
        if (curTaskInformation.value.finishTime)
            return enumLang.completed;
        else if (!curTaskInformation.value.startTime || new Date(curTaskInformation.value.startTime).getTime() > Date.now())
            return enumLang.notStart;
        else
            return enumLang.inProgress;
    });
    const isFinished = computed(() => typeof (curTaskInformation.value.finishTime as string | null) === "string");

    function init() {
        projectMembers.value = [];
        taskMembers.value = [];

        curTaskInformation.value = JSON.parse(JSON.stringify(props.task));

        props.projectMemberList.map(value => {
            const v = value as ProjectMemberInformation;
            projectMembers.value.push({
                value: v.userUUID,
                label: v.nickname + (v.nickname !== v.username ? "(" + v.username + ")" : "")
            });
            projectMemberAvatarList.value[v.userUUID] = v.avatar;
        });

        RequestUtils.getTaskMembers(props.task.taskUUID).then(resp => {
            if (resp.statusCode !== StatusCode.success) return;

            resp.responseData.map(value => {
                const v = value as TaskMemberInformation;
                taskMembers.value.push(v.userUUID);
                oldTaskMembers.value.push(v.userUUID);
            });
        });
    }

    //禁用当前时间之前的时间
    function disableStartTime(current: Date) {
        const now = new Date();
        return current.getTime() < new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    }

    //禁用开始时间之前的时间
    function disableDeadline(current: Date) {
        let startTimeToDate = new Date(curTaskInformation.value.startTime);
        return current < startTimeToDate;
    }

    function updateTitle() {
        if (curTaskInformation.value.taskName === props.task.taskName) return;

        RequestUtils.updateTaskTitle(props.task.taskUUID, curTaskInformation.value.taskName).then(resp => {
            if (resp !== StatusCode.success) return;

            ApplicationUtils.showMessage(message.updateSuccessfully, "success");
        });
    }

    function updatePrincipal() {
        curTaskInformation.value.principalAvatar = projectMemberAvatarList.value[curTaskInformation.value.principalUUID];

        RequestUtils.updateTaskPrincipal(props.task.taskUUID, curTaskInformation.value.principalUUID).then(resp => {
            if (resp !== StatusCode.success) return;

            ApplicationUtils.showMessage(message.updateSuccessfully, "success");
        });
    }

    function updateStartTime() {
        RequestUtils.updateTaskStartTime(props.task.taskUUID, curTaskInformation.value.startTime).then(resp => {
            if (resp !== StatusCode.success) return;

            ApplicationUtils.showMessage(message.updateSuccessfully, "success");
        });
    }

    function updateDeadline() {
        RequestUtils.updateTaskDeadline(props.task.taskUUID, curTaskInformation.value.deadline).then(resp => {
            if (resp !== StatusCode.success) return;

            ApplicationUtils.showMessage(message.updateSuccessfully, "success");
        });
    }

    function updateType() {
        RequestUtils.updateTaskType(props.task.taskUUID, curTaskInformation.value.taskType).then(resp => {
            if (resp !== StatusCode.success) return;

            ApplicationUtils.showMessage(message.updateSuccessfully, "success");
        });
    }

    function updatePriority() {
        RequestUtils.updateTaskPriority(props.task.taskUUID, curTaskInformation.value.priority).then(resp => {
            if (resp !== StatusCode.success) return;

            ApplicationUtils.showMessage(message.updateSuccessfully, "success");
        });
    }

    function updateSourceOfDemand() {
        RequestUtils.updateTaskSourceOfDemand(props.task.taskUUID, curTaskInformation.value.sourceOfDemand).then(resp => {
            if (resp !== StatusCode.success) return;

            ApplicationUtils.showMessage(message.updateSuccessfully, "success");
        });
    }

    function updateDescription() {
        if (curTaskInformation.value.taskDescription === props.task.taskDescription) return;

        RequestUtils.updateTaskDescription(props.task.taskUUID, curTaskInformation.value.taskDescription).then(resp => {
            if (resp !== StatusCode.success) return;

            ApplicationUtils.showMessage(message.updateSuccessfully, "success");
        });
    }

    function updateMembers(val: boolean) {
        if (val) return;

        if (taskMembers.value.sort().toString() === oldTaskMembers.value.sort().toString()) return;

        RequestUtils.updateTaskMembers(props.task.taskUUID, taskMembers.value).then(resp => {
            if (resp !== StatusCode.success) return;

            ApplicationUtils.showMessage(message.updateSuccessfully, "success");

            oldTaskMembers.value = [...taskMembers.value];
        });

    }

    function finishTask(val: boolean) {
        RequestUtils.finishTask(props.task.taskUUID, val).then(resp => {
            if (resp !== StatusCode.success) return;

            ApplicationUtils.showMessage(message.updateSuccessfully, "success");
        });
    }

    function deleteTask() {
        RequestUtils.deleteTask(props.task.taskUUID).then(resp => {
            if (resp !== StatusCode.success) return;

            ApplicationUtils.showMessage(message.updateSuccessfully, "success");
            reload();
        });
    }
</script>

<style scoped>
    .task-flex {
        display: flex;
    }

    .task-flex-column {
        display: flex;
        flex-direction: column;
    }

    /*完整容器*/
    .task-details-container {
        padding: 0 15px 15px 15px;
    }

    /*第二个盒子容器的主要内容部分*/
    .task-second-main {
        width: 200px;
    }

    /*第四个盒子容器*/
    .task-fourthly-container {
        margin: 15px 0;
    }

    /*较小样式的文字*/
    .little-text {
        color: var(--color-text-remark);
        font-size: 13px;
        padding-left: 11px;
    }

    /*隐藏input类型的边框*/
    :deep(.el-input__wrapper) {
        box-shadow: 0 0 0 0;
    }

    :deep(.el-input__wrapper):hover {
        box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
    }

    :deep(.el-input__wrapper):focus-within {
        box-shadow: 0 0 0 1px var(--el-input-focus-border-color) inset;
    }

    /*隐藏选择器的箭头*/
    :deep(.el-select .el-input .el-select__caret) {
        color: #ffffff;
    }

    .task-select:hover:deep(.el-select .el-input .el-select__caret) {
        color: var(--el-select-input-color);
        font-size: var(--el-select-input-font-size);
    }

    .task-select:focus-within:deep(.el-select .el-input .el-select__caret) {
        color: var(--el-select-input-color);
        font-size: var(--el-select-input-font-size);
    }
</style>