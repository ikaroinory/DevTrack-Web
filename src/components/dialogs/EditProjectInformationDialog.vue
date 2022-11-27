<template>
    <el-dialog v-model="thisShow"
               :title="lang.title"
               style="width: 800px" align-center
               @closed="closedDialog"
               :close-on-click-modal="false" :close-on-press-escape="false">
        <EditProjectInformationForm ref="formRef"
                                    :uuid="uuid"
                                    :name="name"
                                    :principal="principal"
                                    :description="description"
                                    :start-time="startTime"
                                    :members="members"
        />
    </el-dialog>
</template>

<script lang="ts" setup>
    import EditProjectInformationForm from "@/components/forms/EditProjectInformationForm.vue";
    import { computed, ref } from "vue";
    import ApplicationUtils from "@/utils/ApplicationUtils";

    const props = defineProps({
        show: { type: Boolean, required: true },
        uuid: { type: String, required: true },
        name: { type: String, required: true },
        principal: { type: String, required: true },
        description: { type: String, required: true },
        startTime: { type: String, required: true },
        members: { type: Array, required: true }
    });
    const emits = defineEmits(["update:show"]);
    const thisShow = computed({
        get: () => props.show,
        set: val => emits("update:show", val)
    });

    const lang = ApplicationUtils.locale.form.editProjectInformation;

    const formRef = ref();

    function closedDialog() {
        formRef.value.clearForm();
    }
</script>
