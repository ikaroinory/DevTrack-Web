<template>
    <el-dialog v-model="thisShow"
               :title="lang.title"
               @open="openDialog"
               @closed="closedDialog"
               style="width: 800px" align-center
               :close-on-click-modal="false" :close-on-press-escape="false">
        <EditMemberInformationForm ref="formRef"
                                   :record-u-u-i-d="recordUUID"
                                   :role-u-u-i-d="roleUUID"
                                   :role-list="roleList"
        />
    </el-dialog>
</template>

<script lang="ts" setup>
    import { computed, ref } from "vue";
    import EditMemberInformationForm from "@/components/forms/EditMemberInformationForm.vue";
    import ApplicationUtils from "@/utils/ApplicationUtils";
    import Role from "@/utils/po/Role";

    const props = defineProps<{
        show: boolean,
        recordUUID: string,
        roleUUID: string,
        roleList: Array<Role>
    }>();
    const emits = defineEmits(["update:show"]);
    const thisShow = computed({
        get: () => props.show,
        set: val => emits("update:show", val)
    });
    const lang = ApplicationUtils.locale.form.editMemberInformation;

    const formRef = ref();

    function openDialog() {formRef.value.init();}

    function closedDialog() {
        formRef.value.clearForm();
    }
</script>
