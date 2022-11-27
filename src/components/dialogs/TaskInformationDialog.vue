<template>
    <el-dialog v-model="thisShow"
               :title="lang.title"
               style="width: 1000px" align-center
               :close-on-click-modal="false" :close-on-press-escape="false">
        <TaskInformationDisplay/>
    </el-dialog>
</template>

<script lang="ts" setup>
    import { computed } from "vue";
    import ApplicationUtils from "@/utils/ApplicationUtils";
    import TaskInformationDisplay from "@/components/display/TaskInformationDisplay.vue";

    const props = defineProps({
        show: { type: Boolean, required: true }
    });
    const emits = defineEmits(["update:show"]);
    const thisShow = computed({
        get: () => props.show,
        set: val => emits("update:show", val)
    });
    const lang = ApplicationUtils.locale.display.taskInformation;
</script>
