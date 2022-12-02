<template>
    <div class="line" style="margin-bottom: 16px">
        <div class="title-label">{{ lang.roleName }}</div>
        <el-input v-model="newRole.name"
                  :minlength="1" :maxlength="8"
                  show-word-limit clearable
        />
    </div>

    <div style="margin-bottom: 8px">{{ lang.permission }}</div>
    <div class="line" style="margin-bottom: 16px">
        <el-checkbox v-model="newRole.invite" :label="lang.invite"/>
        <el-checkbox v-model="newRole.createTask" :label="lang.createTask"/>
        <el-checkbox v-model="newRole.updateTask" :label="lang.updateTask"/>
        <el-checkbox v-model="newRole.deleteTask" :label="lang.deleteTask"/>
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

        newRole.value.invite = props.role.invite;
        newRole.value.createTask = props.role.createTask;
        newRole.value.updateTask = props.role.updateTask;
        newRole.value.deleteTask = props.role.deleteTask;
    }

    function submit() {
        if (newRole.value.name === "") {
            ApplicationUtils.showMessage(message.theNameCannotBeEmpty, "error");
            return;
        }

        RequestUtils.updateRole(newRole.value).then(() => {
            ApplicationUtils.showMessage(message.updateSuccessfully, "success");
            reload();
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
