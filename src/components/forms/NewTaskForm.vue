<template>
    <el-form :model="taskForm" :rules="taskFormRules" ref="taskFormRef" label-position="top">
        <el-form-item prop="title" :label="lang.taskTitle">
            <el-input type="text" v-model="taskForm.title" :placeholder="lang.enterTitle"/>
        </el-form-item>
        <el-row>
            <el-col :span="11">
                <el-form-item prop="type" :label="lang.taskType">
                    <el-select style="width: 100%" v-model="taskForm.type" :placeholder="lang.selectTaskType">
                        <el-option v-for="item in taskTypeList"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value"
                        />
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="2"/>
            <el-col :span="11">
                <el-form-item prop="principal" :label="lang.principal">
                    <el-select style="width: 100%" v-model="taskForm.principal" :placeholder="lang.selectPrincipal">
                        <el-option v-for="item in members"
                                   :key="item.userUUID"
                                   :label="item.nickname + (item.nickname !== item.username ? '(' + item.username + ')' : '')"
                                   :value="item.userUUID"
                        />
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="11">
                <el-form-item prop="priority" :label="lang.priority">
                    <el-select style="width: 100%" v-model="taskForm.priority">
                        <el-option v-for="item in priorityList"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value"
                        />
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="2"/>
            <el-col :span="11">
                <el-form-item prop="SourceOfDemand" :label="lang.sourceOfDemand">
                    <el-select style="width: 100%" v-model="taskForm.sourceOfDemand">
                        <el-option v-for="item in sourceOfDemandList"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value"
                        />
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="11">
                <el-form-item prop="startTime" :label="lang.startTime">
                    <el-date-picker v-model="taskForm.startTime"
                                    style="width: 100%"
                                    type="datetime"
                                    :placeholder="lang.selectStartTime"
                                    :disabled-date="disableStartTime"
                    />
                </el-form-item>
            </el-col>
            <el-col :span="2"/>
            <el-col :span="11">
                <el-form-item prop="deadline" :label="lang.deadline">
                    <el-date-picker v-model="taskForm.deadline"
                                    style="width: 100%"
                                    type="datetime"
                                    :placeholder="lang.selectDeadline"
                                    :disabled-date="disableDeadline"
                    />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-form-item prop="members" :label="lang.members">
                    <el-select style="width: 100%"
                               v-model="taskForm.members"
                               multiple
                               :placeholder="lang.selectMembers">
                        <el-option v-for="item in members"
                                   :key="item.userUUID"
                                   :label="item.nickname + (item.nickname !== item.username ? '(' + item.username + ')' : '')"
                                   :value="item.userUUID"
                        />
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item prop="description" :label="lang.description">
            <el-input
                v-model="taskForm.description"
                maxlength="100"
                :placeholder="lang.enterDescription"
                show-word-limit
                type="textarea"
                resize="none"
            />
        </el-form-item>

        <el-form-item>
            <el-button style="width: 100%"
                       type="primary"
                       @click="submitTaskForm"
                       :loading="requestingServe">
                <span v-text="lang.create"/>
            </el-button>
        </el-form-item>
    </el-form>
</template>
<script lang="ts" setup>
    import { reactive, ref } from "vue";
    import type { FormInstance, FormRules } from "element-plus";
    import RequestUtils from "@/utils/RequestUtils";
    import ApplicationUtils from "@/utils/ApplicationUtils";
    import NewTaskForm from "@/utils/forms/NewTaskForm";
    import ProjectMemberInformation from "@/utils/dto/ProjectMemberInformation";
    import StatusCode from "@/utils/enums/StatusCode";

    defineExpose({ clearForm: reset });

    const props = defineProps({
        projectUuid: { type: String, required: true }
    });

    const lang = ApplicationUtils.locale.form.newTask;
    const enumLang = ApplicationUtils.locale.enum;
    const message = ApplicationUtils.locale.message;

    const taskFormRef = ref<FormInstance>();
    const requestingServe = ref(false);
    const taskForm = ref<NewTaskForm>({
        fromProject: props.projectUuid,
        type: 0,
        title: "",
        principal: "",
        priority: 0,
        sourceOfDemand: 0,
        description: "",
        startTime: "",
        deadline: "",
        members: new Array<string>()
    });
    const taskFormRules = reactive<FormRules>({
        title: [
            { required: true, message: lang.enterTitle, trigger: "blur" }
        ]
    });
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
    const members = ref<Array<ProjectMemberInformation>>([]);

    function init() {
        RequestUtils.getProjectMemberInformation(props.projectUuid).then(resp => {
            members.value = resp.responseData;
        });
    }

    function submitTaskForm() {
        if (!taskFormRef) return;

        taskFormRef.value?.validate((valid) => {
            if (!valid) return;

            requestingServe.value = true;
            RequestUtils.newTask(taskForm.value).then(resp => {
                switch (resp) {
                    case StatusCode.permissionDenied:
                        ApplicationUtils.showMessage(message.permissionDenied, "error");
                        break;
                    case StatusCode.uuidConflict:
                        ApplicationUtils.showMessage(message.uuidConflict, "error");
                        break;
                    case StatusCode.success:
                        ApplicationUtils.showMessage(message.createSuccessfully, "success");
                        break;
                    default:
                        ApplicationUtils.showMessage(message.unknownException, "warning");
                        break;
                }
                requestingServe.value = false;
            }).catch(() => {
                ApplicationUtils.showMessage(message.timeout, "error");
                requestingServe.value = false;
            });
        });
    }

    const disableStartTime = (current: Date) => {
        const now = new Date();
        return current.getTime() < new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    };

    const disableDeadline = (current: Date) => {
        let startTimeToDate = new Date(taskForm.value.startTime);
        return current < startTimeToDate;
    };

    function reset() {taskFormRef.value?.resetFields();}

    init();
</script>
