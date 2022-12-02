<template>
    <el-dialog v-model="thisShow"
               :title="lang.title"
               @open="openDialog"
               style="width: 800px" align-center
               :close-on-click-modal="false" :close-on-press-escape="false">
        <EditRoleForm ref="formRef" :role="role"/>
    </el-dialog>
</template>

<script lang="ts" setup>
    import { computed, ref } from "vue";
    import ApplicationUtils from "@/utils/ApplicationUtils";
    import EditRoleForm from "@/components/forms/EditRoleForm.vue";
    import Role from "@/utils/po/Role";

    const props = defineProps<{
        show: boolean,
        role: Role
    }>();
    const emits = defineEmits(["update:show"]);
    const thisShow = computed({
        get: () => props.show,
        set: val => emits("update:show", val)
    });

    const lang = ApplicationUtils.locale.form.editRole;

    const formRef = ref();

    function openDialog() {formRef.value.init();}
</script>
