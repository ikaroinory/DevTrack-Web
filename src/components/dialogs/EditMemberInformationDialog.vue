<template>
    <el-dialog v-model="thisShow"
               :title="lang.title"
               @closed="closedDialog"
               style="width: 800px" align-center
               :close-on-click-modal="false" :close-on-press-escape="false">
        <!--        <EditMemberInformationForm ref="formRef"-->
        <!--                                   :record-u-u-i-d="recordUUID"-->
        <!--                                   :nickname-in-project="nicknameInProject"-->
        <!--                                   :role="role"-->
        <!--        />-->
        TODO......
    </el-dialog>
</template>

<script lang="ts" setup>
    import { computed, ref } from "vue";
    // import EditMemberInformationForm from "@/components/forms/EditMemberInformationForm.vue";
    import ApplicationUtils from "@/utils/ApplicationUtils";

    const props = defineProps({
        show: { type: Boolean, required: true },
        recordUUID: { type: String, required: true },
        nicknameInProject: { type: String, required: true },
        role: { type: String, required: true }
    });
    const emits = defineEmits(["update:show"]);
    const thisShow = computed({
        get: () => props.show,
        set: val => emits("update:show", val)
    });
    const lang = ApplicationUtils.locale.form.editMemberInformation;

    const formRef = ref();

    function closedDialog() {
        formRef.value.clearForm();
    }
</script>
