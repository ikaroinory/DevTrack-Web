<template>
    <div class="frame-project-background">
        <div class="frame-project-preview">
            <div class="frame-function-bar">
                <div class="function-bar-flex">
                    <el-select v-model="projectType">
                        <el-option v-for="item in projectTypeOptions" :key="item.value" :label="item.label" :value="item.value"/>
                    </el-select>
                    <el-button class="newProject" type="primary" @click="newProjectDialogVisible = true">
                        <el-icon>
                            <Plus/>
                        </el-icon><span v-text="lang.newProject"/>
                    </el-button>
                </div>
            </div>
            <div class="frame-project-preview-list">
                <ProjectPreviewDisplay/>
            </div>
        </div>
    </div>

    <NewProjectDialog v-model:show="newProjectDialogVisible"/>
</template>

<script lang="ts" setup>
    import { ref } from "vue";
    import { Plus } from "@element-plus/icons-vue";
    import ApplicationUtils from "@/utils/ApplicationUtils";
    import ProjectPreviewDisplay from "@/components/display/ProjectPreviewDisplay.vue";
    import NewProjectDialog from "@/components/dialogs/NewProjectDialog.vue";

    const lang = ApplicationUtils.locale.view.projectPreview;

    const projectTypeOptions = [
        { value: "0", label: lang.allProjects },
        { value: "1", label: lang.privateProjects },
        { value: "2", label: lang.publicProjects },
        { value: "3", label: lang.notStartProjects },
        { value: "4", label: lang.inProgressProjects },
        { value: "5", label: lang.completedProjects }
    ];
    const projectType = ref(projectTypeOptions[0]);

    const newProjectDialogVisible = ref(false);

    init();

    function init() {
        ApplicationUtils.setTitle(lang.title);
    }
</script>

<style scoped>
    .frame-project-background {}

    .frame-project-preview {}

    .frame-function-bar {
        margin: 20px;
    }

    .frame-project-preview-list {
        margin: 20px;
    }

    .function-bar-flex {
        margin: 0 8px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .newProject {
        margin-left: 12px;
    }
</style>