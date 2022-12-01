<template>
    <el-form label-position="left" label-width="100px">
        <el-form-item :label="lang.role">
            <el-select style="width: 100%" v-model="newRole">
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
    import { reactive, ref } from "vue";
    import Role from "@/utils/po/Role";
    import ApplicationUtils from "@/utils/ApplicationUtils";

    defineExpose({ clearForm, init });
    const props = defineProps<{
        recordUUID: string,
        roleUUID: string,
        roleList: Array<Role>
    }>();

    const lang = ApplicationUtils.locale.form.editMemberInformation;

    const form = reactive({
        recordUUID: props.recordUUID
    });

    const newRole = ref(props.roleUUID);

    function init() {
        newRole.value = props.roleUUID;
    }

    function clearForm() {
        form.recordUUID = props.recordUUID;

        newRole.value = props.roleUUID;
    }

    function submit() {

    }
</script>
