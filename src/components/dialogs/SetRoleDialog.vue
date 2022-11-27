<template>
    <el-dialog v-model="thisShow"
               :title="lang.title"
               style="width: 800px" align-center
               :close-on-click-modal="false" :close-on-press-escape="false">
        <SetRoleForm
            :uuid="uuid"
        />
    </el-dialog>
</template>

<script lang="ts" setup>
    import { computed } from "vue";
    import SetRoleForm from "@/components/forms/SetRoleForm.vue";
    import ApplicationUtils from "@/utils/ApplicationUtils";

    const props = defineProps({
        show: { type: Boolean, required: true },
        uuid: { type: String, required: true }
    });
    const emits = defineEmits(["update:show"]);
    const thisShow = computed({
        get: () => props.show,
        set: val => emits("update:show", val)
    });
    const lang = ApplicationUtils.locale.form.setMembersRole;
</script>
