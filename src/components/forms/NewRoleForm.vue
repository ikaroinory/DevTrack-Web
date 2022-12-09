<template>
    <el-form label-position="top">
        <el-form-item :label="lang.name">
            <el-input v-model="role.name"
                      :minlength="1" :maxlength="8"
                      clearable show-word-limit
            />
        </el-form-item>
        <el-form-item :label="lang.permissions">
            <div style="width: 100%">
                <el-row>
                    <el-col :span="8">
                        <el-checkbox v-model="role.inviteMember" :label="lang.inviteMember"/>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="role.updateMember" :label="lang.updateMember"/>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="role.removeMember" :label="lang.removeMember"/>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-checkbox v-model="role.updateProject" :label="lang.updateProject"/>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="role.deleteProject" :label="lang.deleteProject"/>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-checkbox v-model="role.createTask" :label="lang.createTask"/>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="role.updateTask" :label="lang.updateTask"/>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="role.deleteTask" :label="lang.deleteTask"/>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-checkbox v-model="role.createRole" :label="lang.createRole"/>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="role.updateRole" :label="lang.updateRole"/>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="role.removeRole" :label="lang.removeRole"/>
                    </el-col>
                </el-row>
            </div>
        </el-form-item>

        <el-form-item>
            <el-button style="width: 100%" type="primary" @click="create">{{ lang.create }}</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
    import ApplicationUtils from "@/utils/ApplicationUtils";
    import { inject, ref } from "vue";
    import Role from "@/utils/po/Role";
    import RequestUtils from "@/utils/RequestUtils";
    import StatusCode from "@/utils/enums/StatusCode";

    defineExpose({ resetForm });
    const props = defineProps<{
        projectUuid: string
    }>();

    const reload: Function = inject("reload")!;
    const lang = ApplicationUtils.locale.form.newRole;
    const message = ApplicationUtils.locale.message;

    const role = ref<Role>({
        uuid: "",
        project: "",
        name: "",
        inviteMember: false,
        updateMember: false,
        removeMember: false,
        updateProject: false,
        deleteProject: false,
        createTask: false,
        updateTask: false,
        deleteTask: false,
        createRole: false,
        updateRole: false,
        removeRole: false
    });

    init();

    function init() {
        role.value.project = props.projectUuid;
    }

    function resetForm() {
        role.value = {
            uuid: "",
            project: "",
            name: "",
            inviteMember: false,
            updateMember: false,
            removeMember: false,
            updateProject: false,
            deleteProject: false,
            createTask: false,
            updateTask: false,
            deleteTask: false,
            createRole: false,
            updateRole: false,
            removeRole: false
        };
        role.value.project = props.projectUuid;
    }

    function create() {
        if (role.value.name === "") {
            ApplicationUtils.showMessage(message.theNameCannotBeEmpty, "error");
            return;
        }
        RequestUtils.newRole(role.value).then(resp => {
            switch (resp) {
                case StatusCode.requiredParamsIsEmpty:
                    ApplicationUtils.showMessage(message.requiredParamsIsNull, "error");
                    break;
                case StatusCode.permissionDenied:
                    ApplicationUtils.showMessage(message.permissionDenied, "error");
                    break;
                case StatusCode.uuidConflict:
                    ApplicationUtils.showMessage(message.uuidConflict, "error");
                    break;
                case StatusCode.success:
                    ApplicationUtils.showMessage(message.createSuccessfully, "success");
                    reload();
                    break;
                default:
                    ApplicationUtils.showMessage(message.unknownException, "warning");
                    break;
            }
        }).catch(() => ApplicationUtils.showMessage(message.timeout, "error"));
    }
</script>
