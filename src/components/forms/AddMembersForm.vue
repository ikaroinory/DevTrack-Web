<template>
    <el-form>
        <el-form-item>
            <el-select
                style="width: 100%"
                v-model="form.usernameList"
                :placeholder="lang.enterUsername"
                :no-data-text="lang.enterUsernameToAddMembers"
                multiple filterable allow-create default-first-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button @click="submit" type="primary">
                <div v-text="lang.add"/>
            </el-button>
            <el-button @click="clear">
                <div v-text="lang.reset"/>
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
    import { inject, reactive } from "vue";
    import AddProjectMembersForm from "@/utils/forms/AddProjectMembersForm";
    import StatusCode from "@/utils/enums/StatusCode";
    import ApplicationUtils from "@/utils/ApplicationUtils";
    import RequestUtils from "@/utils/RequestUtils";

    defineExpose({ clearForm });

    const props = defineProps({
        uuid: { type: String, required: true }
    });
    const lang = ApplicationUtils.locale.form.addMembers;
    const message = ApplicationUtils.locale.message;
    const reload: Function = inject("reload")!;

    const form = reactive<AddProjectMembersForm>({
        usernameList: [],
        projectUUID: props.uuid
    });

    function clearForm() {
        form.usernameList = [];
    }

    function clear() {
        if (form.usernameList.length === 0)
            ApplicationUtils.showMessage(message.youHaveNotModifiedForm, "warning");
        else {
            ApplicationUtils.showMessage(message.resetSuccessfully, "success");
            clearForm();
        }
    }

    function submit() {
        if (form.usernameList.length === 0) {
            ApplicationUtils.showMessage(message.youHaveNotModifiedForm, "warning");
            return;
        }

        RequestUtils.addProjectMembers(form).then(resp => {
            if (resp.statusCode === StatusCode.projectNotFound)
                ApplicationUtils.showMessage(message.projectNotFound, "error");

            if (resp.statusCode === StatusCode.success) {
                if (resp.resultData === form.usernameList.length) {
                    ApplicationUtils.showMessageBox(
                        message.addSuccessfully
                            .replace("%d", resp.resultData.toString()),
                        "success"
                    );
                    reload();
                }
                if (resp.resultData < form.usernameList.length && resp.resultData > 0) {
                    ApplicationUtils.showMessageBox(
                        message.addWarning
                            .replace("%d1", form.usernameList.length.toString())
                            .replace("%d2", resp.resultData.toString()),
                        "warning"
                    );
                    reload();
                }
                if (resp.resultData === 0)
                    ApplicationUtils.showMessageBox(
                        message.addFailed
                            .replace("%d", resp.resultData.toString()),
                        "error"
                    );
            }
        }).catch(() => ApplicationUtils.showMessage(message.timeout, "error"));
    }
</script>
