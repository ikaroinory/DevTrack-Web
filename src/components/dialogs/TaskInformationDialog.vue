<template>
    <el-dialog v-model="thisShow"
               :title="lang.title"
               @open="openDialog"
               @closed="closedDialog"
               style="width: 1000px" align-center
               :close-on-click-modal="false" :close-on-press-escape="false">
        <TaskInformationDisplay ref="displayRef"
                                :task="task"
                                :project-member-list="projectMemberList"
        />
    </el-dialog>
</template>

<script lang="ts" setup>
    import { computed, inject, ref } from "vue";
    import ApplicationUtils from "@/utils/ApplicationUtils";
    import TaskInformationDisplay from "@/components/display/TaskInformationDisplay.vue";
    import TaskInformation from "@/utils/dto/TaskInformation";
    import ProjectMemberInformation from "@/utils/dto/ProjectMemberInformation";

    const props = defineProps<{
        show: boolean,
        task: TaskInformation,
        projectMemberList: Array<ProjectMemberInformation>
    }>();
    const emits = defineEmits(["update:show"]);
    const thisShow = computed({
        get: () => props.show,
        set: val => emits("update:show", val)
    });
    const reload: Function = inject("reload")!;

    const lang = ApplicationUtils.locale.form.taskInformation;

    const displayRef = ref();

    function openDialog() {
        displayRef.value.init();
    }

    function closedDialog() {
        reload();
    }
</script>
