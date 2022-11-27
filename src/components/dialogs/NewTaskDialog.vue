<template>
    <el-dialog v-model="thisShow"
               :title="lang.title"
               style="width: 800px" align-center
               @closed="closedDialog"
               :close-on-click-modal="false" :close-on-press-escape="false">
        <NewTaskForm ref="formRef" :project-uuid="projectUuid"/>
    </el-dialog>
</template>

<script lang="ts" setup>
    import { computed, ref } from "vue";
    import ApplicationUtils from "@/utils/ApplicationUtils";
    import NewTaskForm from "@/components/forms/NewTaskForm.vue";

    const props = defineProps({
        show: { type: Boolean, required: true },
        projectUuid: { type: String, required: true }
    });
    const emits = defineEmits(["update:show"]);
    const thisShow = computed({
        get: () => props.show,
        set: val => emits("update:show", val)
    });
    const lang = ApplicationUtils.locale.form.newTask;

    const formRef = ref();

    function closedDialog() {
        formRef.value.clearForm();
    }
</script>
