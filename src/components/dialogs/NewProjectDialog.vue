<template>
    <el-dialog v-model="thisShow"
               :title="lang.title"
               width="40%" align-center
               @close="closedDialog"
               :close-on-click-modal="false" :close-on-press-escape="false">
        <NewProjectForm ref="formRef"/>
    </el-dialog>
</template>

<script lang="ts" setup>
    import { computed, ref } from "vue";
    import NewProjectForm from "@/components/forms/NewProjectForm.vue";
    import ApplicationUtils from "@/utils/ApplicationUtils";

    const props = defineProps({
        show: { type: Boolean, required: true }
    });
    const emits = defineEmits(["update:show"]);
    const thisShow = computed({
        get: () => props.show,
        set: val => emits("update:show", val)
    });

    const lang = ApplicationUtils.locale.form.newProject;

    const formRef = ref();

    function closedDialog() {
        formRef.value.reset();
    }
</script>
