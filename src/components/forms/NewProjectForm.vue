<template>
    <el-form :model="newProjectForm" :rules="newProjectFormRules" ref="newProjectFormRef" label-position="top">
        <el-form-item prop="name" :label="lang.name">
            <el-input type="text" v-model="newProjectForm.name" :placeholder="lang.enterName"/>
        </el-form-item>

        <el-row>
            <el-col :span="12">
                <el-form-item prop="type" :label="lang.options">
                    <el-radio-group style="width: 100%" v-model="newProjectForm.publicProject">
                        <el-radio :label="true">{{ lang.publicProject }}</el-radio>
                        <el-radio :label="false">{{ lang.privateProject }}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item prop="principal" :label="lang.principal">
                    <el-select style="width: 100%" v-model="newProjectForm.principal" :placeholder="lang.selectPrincipal">
                        <el-option v-for="item in staffOptions"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value"
                        />
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item prop="description" :label="lang.description">
            <el-input
                v-model="newProjectForm.description"
                type="textarea"
                maxlength="100"
                :placeholder="lang.enterDescription"
                show-word-limit
                resize="none"
            />
        </el-form-item>

        <el-form-item>
            <el-button style="width: 100%;" type="primary" @click="submitNewProjectForm" :loading="requestingServe">确认</el-button>
        </el-form-item>
    </el-form>
</template>
<script lang="ts" setup>
    import { reactive, ref } from "vue";
    import type { FormInstance, FormRules } from "element-plus";
    import router from "@/plugins/VueRouter";
    import RequestUtils from "@/utils/RequestUtils";
    import NewProjectForm from "@/utils/forms/NewProjectForm";
    import ApplicationUtils from "@/utils/ApplicationUtils";
    import LocalStorageUtils from "@/utils/LocalStorageUtils";

    const lang = ApplicationUtils.locale.form.newProject;
    const message = ApplicationUtils.locale.message;

    const newProjectFormRef = ref<FormInstance>();
    const requestingServe = ref(false);
    const newProjectForm = reactive<NewProjectForm>({
        name: "",
        creator: LocalStorageUtils.getUserUUIDFromToken(),
        principal: "",
        publicProject: false,
        description: "",
        adminName: lang.admin,
        memberName: lang.member
    });
    const newProjectFormRules: FormRules = {
        name: [{ required: true, message: lang.enterName, trigger: "blur" }],
        principal: [{ required: true, message: lang.selectPrincipal, trigger: "blur" }]
    };

    function submitNewProjectForm() {
        if (!newProjectFormRef) return;

        newProjectFormRef.value?.validate((valid) => {
            if (!valid) return;

            requestingServe.value = true;
            RequestUtils.newProject(newProjectForm).then(resp => {
                ApplicationUtils.showMessage(message.createSuccessfully, "success");

                requestingServe.value = false;
                router.push({ name: "project", params: { uuid: resp.responseData } });
            }).catch(() => {
                ApplicationUtils.showMessage(message.timeout, "error");
                requestingServe.value = false;
            });
        });
    }

    function reset() {newProjectFormRef.value?.resetFields();}

    const staffOptions = [
        {
            value: LocalStorageUtils.getUserUUIDFromToken(),
            label: LocalStorageUtils.getUsernameFromToken() + "(" + LocalStorageUtils.getUsernameFromToken() + ")"
        }
    ];

    defineExpose({ reset });
</script>
