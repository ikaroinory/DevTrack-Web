<template>
    <el-form>
        <el-form-item label="记录号">
            <div v-text="recordUUID"/>
        </el-form-item>
        <el-form-item label="成员名">
            <div v-text="role"/>
        </el-form-item>
        <el-form-item>
            <el-input type="text" v-model="form.nicknameInProject" clearable/>
        </el-form-item>
        <el-form-item>
            <el-select>

            </el-select>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
    import { reactive } from "vue";

    defineExpose({ clearForm });
    const props = defineProps({
        recordUUID: { type: String, required: true },
        nicknameInProject: { type: String, required: true },
        role: { type: String, required: true }
    });

    const form = reactive({
        recordUUID: props.recordUUID,
        nicknameInProject: props.nicknameInProject,
        role: props.role
    });

    function clearForm() {
        form.recordUUID = props.recordUUID;
        form.nicknameInProject = props.nicknameInProject;
        form.role = props.role;
    }
</script>
