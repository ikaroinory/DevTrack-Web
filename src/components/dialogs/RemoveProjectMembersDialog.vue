<template>
    <el-dialog v-model="thisShow"
               :title="lang.title"
               style="width: 602px" align-center
               @closed="closedDialog"
               :close-on-click-modal="false" :close-on-press-escape="false">
        <RemoveProjectMembersForm ref="formRef" :members="members"/>
    </el-dialog>
</template>

<script lang="ts" setup>
    import { computed, ref } from "vue";
    import RemoveProjectMembersForm from "@/components/forms/RemoveProjectMembersForm.vue";
    import ApplicationUtils from "@/utils/ApplicationUtils";

    const props = defineProps({
        show: { type: Boolean, required: true },
        members: { type: Array, required: true }
    });
    const emits = defineEmits(["update:show"]);
    const thisShow = computed({
        get: () => props.show,
        set: val => emits("update:show", val)
    });
    const lang = ApplicationUtils.locale.form.removeProjectMembers;

    const formRef = ref();

    function closedDialog() {
        formRef.value.clearForm();
    }
</script>
