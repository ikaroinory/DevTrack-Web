<template>
    <el-dialog v-model="thisShow"
               :title="lang.title"
               style="width: 800px" align-center
               @closed="closedDialog"
               :close-on-click-modal="false" :close-on-press-escape="false">
        <NewRoleForm ref="formRef"
                     :project-uuid="projectUuid"
        />
    </el-dialog>
</template>

<script lang="ts" setup>
    import { computed, ref } from "vue";
    import ApplicationUtils from "@/utils/ApplicationUtils";
    import NewRoleForm from "@/components/forms/NewRoleForm.vue";

    const props = defineProps<{
        show: boolean,
        projectUuid: string
    }>();
    const emits = defineEmits(["update:show"]);
    const thisShow = computed({
        get: () => props.show,
        set: val => emits("update:show", val)
    });
    const lang = ApplicationUtils.locale.form.newRole;

    const formRef = ref();

    function closedDialog() {
        formRef.value.resetForm();
    }
</script>
