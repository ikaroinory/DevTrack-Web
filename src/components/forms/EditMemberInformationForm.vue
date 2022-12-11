<template>
    <el-form label-position="left" label-width="100px">
        <el-form-item :label="lang.role">
            <el-select style="width: 100%" v-model="newRoleUUID">
                <el-option v-for="item in roleList"
                           :key="item.uuid"
                           :label="item.name"
                           :value="item.uuid"
                />
            </el-select>
        </el-form-item>

        <el-button type="primary" @click="submit">
            <div>{{ lang.submit }}</div>
        </el-button>
    </el-form>
</template>

<script lang="ts" setup>
    import { inject, reactive, ref } from "vue";
    import Role from "@/utils/po/Role";
    import ApplicationUtils from "@/utils/ApplicationUtils";
    import RequestUtils from "@/utils/RequestUtils";

    defineExpose({ clearForm, init });
    const props = defineProps<{
        recordUUID: string,
        roleUUID: string,
        roleList: Array<Role>
    }>();

    const reload: Function = inject("reload")!;
    const lang = ApplicationUtils.locale.form.editMemberInformation;
    const message = ApplicationUtils.locale.message;

    const form = reactive({
        recordUUID: props.recordUUID
    });

    const newRoleUUID = ref(props.roleUUID);

    function init() {
        newRoleUUID.value = props.roleUUID;
    }

    function clearForm() {
        form.recordUUID = props.recordUUID;

        newRoleUUID.value = props.roleUUID;
    }

    function submit() {
        RequestUtils.updateMemberRole(props.recordUUID, newRoleUUID.value).then(() => {
            ApplicationUtils.showMessage(message.submitSuccessfully, "success");
            reload();
        }).catch(() => {
            ApplicationUtils.showMessage(message.timeout, "error");
        });
    }
</script>
