<template>
    <el-transfer :data="data" v-model="form.recordUUIDList"
                 :titles="[lang.members, lang.removeList]"
    />
    <div style="margin-top: 16px">
        <el-button type="primary" @click="submit">
            <div v-text="lang.remove"/>
        </el-button>
        <el-button @click="reset">
            <div v-text="lang.reset"/>
        </el-button>
    </div>
</template>

<script lang="ts" setup>
    import { inject, reactive, ref } from "vue";
    import ProjectMemberInformation from "@/utils/dto/ProjectMemberInformation";
    import StatusCode from "@/utils/enums/StatusCode";
    import ApplicationUtils from "@/utils/ApplicationUtils";
    import RequestUtils from "@/utils/RequestUtils";
    import LocalStorageUtils from "@/utils/LocalStorageUtils";

    defineExpose({ clearForm });

    const props = defineProps({
        members: { type: Array, required: true }
    });
    const lang = ApplicationUtils.locale.form.removeProjectMembers;
    const message = ApplicationUtils.locale.message;
    const reload: Function = inject("reload")!;

    const data = ref<Array<{ key: String, label: String, disabled: Boolean }>>([]);
    const form = reactive({
        recordUUIDList: []
    });

    init();

    function init() {
        props.members.map(value => {
            const v = value as ProjectMemberInformation;
            if (v.userUUID !== LocalStorageUtils.getUserUUIDFromToken())
                data.value.push({
                    key: v.recordUUID,
                    label: v.nickname + "(" + v.username + ")",
                    disabled: false
                });
        });
    }

    function reset() {
        if (form.recordUUIDList.length === 0)
            ApplicationUtils.showMessage(message.youHaveNotModifiedForm, "warning");
        else {
            clearForm();
            ApplicationUtils.showMessage(message.resetSuccessfully, "success");
        }
    }

    function submit() {
        RequestUtils.removeProjectMembers(form).then(resp => {
            if (resp === StatusCode.success) {
                ApplicationUtils.showMessage(message.removeSuccessfully, "success");
                reload();
            }
        }).catch(() => ApplicationUtils.showMessage(message.timeout, "error"));
    }

    function clearForm() {
        form.recordUUIDList = [];
    }

</script>
