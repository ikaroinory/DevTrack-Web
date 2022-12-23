<template>
    <div class="line" style="margin-bottom: 16px">
        <div class="title-label">{{ lang.roleName }}</div>
        <el-input v-model="newRole.name"
                  :minlength="1" :maxlength="8"
                  show-word-limit clearable
        />
    </div>

    <div style="margin-bottom: 8px">{{ lang.permission }}</div>

    <div style="margin: 0 16px 8px 16px">
        <el-row>
            <el-col :span="8">
                <el-checkbox v-model="newRole.inviteMember" :label="lang.inviteMember"/>
            </el-col>
            <el-col :span="8">
                <el-checkbox v-model="newRole.updateMember" :label="lang.updateMember"/>
            </el-col>
            <el-col :span="8">
                <el-checkbox v-model="newRole.removeMember" :label="lang.removeMember"/>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-checkbox v-model="newRole.updateProject" :label="lang.updateProject"/>
            </el-col>
            <el-col :span="8">
                <el-checkbox v-model="newRole.deleteProject" :label="lang.deleteProject"/>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-checkbox v-model="newRole.createTask" :label="lang.createTask"/>
            </el-col>
            <el-col :span="8">
                <el-checkbox v-model="newRole.updateTask" :label="lang.updateTask"/>
            </el-col>
            <el-col :span="8">
                <el-checkbox v-model="newRole.deleteTask" :label="lang.deleteTask"/>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-checkbox v-model="newRole.createRole" :label="lang.createRole"/>
            </el-col>
            <el-col :span="8">
                <el-checkbox v-model="newRole.updateRole" :label="lang.updateRole"/>
            </el-col>
            <el-col :span="8">
                <el-checkbox v-model="newRole.removeRole" :label="lang.removeRole"/>
            </el-col>
        </el-row>
    </div>

    <div>
        <el-button type="primary" @click="submit">{{ lang.submit }}</el-button>
    </div>
</template>

<script lang="ts" setup>
    import ApplicationUtils from "@/utils/ApplicationUtils";
    import Role, { defaultRole } from "@/utils/po/Role";
    import { defineExpose, inject, ref } from "vue";
    import RequestUtils from "@/utils/RequestUtils";
    import StatusCode from "@/utils/enums/StatusCode";

    defineExpose({ init });
    const props = defineProps<{
        role: Role
    }>();
    const reload: Function = inject("reload")!;
    const lang = ApplicationUtils.locale.form.editRole;
    const message = ApplicationUtils.locale.message;

    const newRole = ref(defaultRole);

    function init() {
        newRole.value.uuid = props.role.uuid;
        newRole.value.name = props.role.name;
        newRole.value.project = props.role.project;

        newRole.value.inviteMember = props.role.inviteMember;
        newRole.value.updateMember = props.role.updateMember;
        newRole.value.removeMember = props.role.removeMember;
        newRole.value.updateProject = props.role.updateProject;
        newRole.value.deleteProject = props.role.deleteProject;
        newRole.value.createTask = props.role.createTask;
        newRole.value.updateTask = props.role.updateTask;
        newRole.value.deleteTask = props.role.deleteTask;
        newRole.value.createRole = props.role.createRole;
        newRole.value.updateRole = props.role.updateRole;
        newRole.value.removeRole = props.role.removeRole;
    }

    function submit() {
        if (newRole.value.name === "") {
            ApplicationUtils.showMessage(message.theNameCannotBeEmpty, "error");
            return;
        }

        RequestUtils.updateRole(newRole.value).then(resp => {
            if (resp === StatusCode.success) {
                ApplicationUtils.showMessage(message.updateSuccessfully, "success");
                reload();
            }
        }).catch(() => {
            ApplicationUtils.showMessage(message.timeout, "error");
        });
    }
</script>

<style scoped>
    .title-label {
        width: 100px;
    }

    .line {
        display: flex;
        align-items: center;
    }
</style>
