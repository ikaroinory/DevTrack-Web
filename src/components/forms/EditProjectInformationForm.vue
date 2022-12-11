<template>
    <el-form style="padding: 0 20px" :model="form" label-position="left" label-width="100px">
        <el-form-item :label="lang.projectName"
                      prop="name">
            <el-input type="text" v-model="form.name" clearable/>
        </el-form-item>
        <el-form-item :label="lang.principal"
                      prop="principal">
            <el-select style="width: 100%" v-model="form.principalUUID">
                <el-option v-for="item in principalOptions"
                           :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
        </el-form-item>
        <el-form-item :label="lang.description"
                      prop="description">
            <el-input v-model="form.description"
                      type="textarea" :rows="3" maxlength="100" resize="none" show-word-limit
            />
        </el-form-item>
        <el-form-item :label="lang.startTime"
                      prop="startTime">
            <el-date-picker style="width: 100%"
                            v-model="form.startTime"
                            type="datetime" :disabled-date="disableStartTime"
                            :placeholder="lang.selectATime"
                            value-format="YYYY-MM-DD HH:mm:ss"
            />
        </el-form-item>

        <el-button style="width: 100%"
                   @click="submitEditProjectInformationForm"
                   type="primary">
            <div v-text="lang.submit"/>
        </el-button>
    </el-form>
</template>

<script lang="ts" setup>
    import { inject, reactive } from "vue";
    import ApplicationUtils from "@/utils/ApplicationUtils";
    import UpdateProjectForm from "@/utils/forms/UpdateProjectForm";
    import StatusCode from "@/utils/enums/StatusCode";
    import RequestUtils from "@/utils/RequestUtils";
    import ProjectMemberInformation from "@/utils/dto/ProjectMemberInformation";

    defineExpose({ clearForm });

    const props = defineProps({
        uuid: { type: String, required: true },
        name: { type: String, required: true },
        principal: { type: String, required: true },
        description: { type: String, required: true },
        startTime: { type: String, required: true },
        members: { type: Array, required: true }
    });

    const lang = ApplicationUtils.locale.form.editProjectInformation;
    const message = ApplicationUtils.locale.message;
    const reload: Function = inject("reload")!;

    const form = reactive<UpdateProjectForm>({
        projectUUID: props.uuid,
        name: props.name,
        principalUUID: props.principal,
        description: props.description,
        startTime: props.startTime
    });

    const principalOptions: Array<{ value: String, label: String }> = [];

    function init() {
        props.members.map(value => {
            const v = value as ProjectMemberInformation;
            principalOptions.push({
                value: v.userUUID,
                label: v.nickname + (v.nickname !== v.username ? "(" + v.username + ")" : "")
            });
        });
    }

    function disableStartTime(current: Date) {
        const now = new Date();
        return current.getTime() < new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    }

    function submitEditProjectInformationForm() {
        RequestUtils.updateProject(form).then(resp => {
            if (resp === StatusCode.projectNotFound)
                ApplicationUtils.showMessage(
                    message.projectNotFoundWithUUID.replace("%s", form.projectUUID.valueOf()),
                    "error"
                );
            if (resp === StatusCode.notUpdate)
                ApplicationUtils.showMessage(message.youHaveNotModifiedForm, "warning");
            if (resp === StatusCode.success) {
                ApplicationUtils.showMessage(message.submitSuccessfully, "success");
                reload();
            }
        }).catch(() => ApplicationUtils.showMessage(message.timeout, "error"));
    }

    function clearForm() {
        form.projectUUID = props.uuid;
        form.name = props.name;
        form.principalUUID = props.principal;
        form.description = props.description;
        form.startTime = props.startTime;
    }

    init();
</script>
