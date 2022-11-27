<template>
    <el-container style="height: 100%">
        <el-aside width="150px" style="border-right: var(--border-default);">
            <el-menu style="border-right: none"
                     :router="true" :default-active="'./' + $route.path.split('/').at(-1)">
                <el-menu-item index="./overview">
                    <div style="display: flex;align-items: center">
                        <view-grid-detail class="icon"/>
                        <div v-text="locale.overview"/>
                    </div>
                </el-menu-item>
                <el-menu-item index="./members">
                    <div style="display: flex;align-items: center">
                        <peoples class="icon"/>
                        <div v-text="locale.members"/>
                    </div>
                </el-menu-item>
                <el-menu-item index="./tasks">
                    <div style="display: flex;align-items: center">
                        <list-two class="icon"/>
                        <div v-text="locale.tasks"/>
                    </div>
                </el-menu-item>
                <el-menu-item index="./roles">
                    <div style="display: flex;align-items: center">
                        <permissions class="icon"/>
                        <div v-text="locale.roles"/>
                    </div>
                </el-menu-item>
                <el-menu-item index="./tableReport">
                    <div style="display: flex;align-items: center">
                        <table-report class="icon"/>
                        <div v-text="locale.tableReport"/>
                    </div>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main>
            <router-view/>
        </el-main>
    </el-container>
</template>

<script lang="ts" setup>
    import { ListTwo, Peoples, Permissions, TableReport, ViewGridDetail } from "@icon-park/vue-next";
    import ApplicationUtils from "@/utils/ApplicationUtils";

    const props = defineProps({
        uuid: { type: String, required: true }
    });

    const locale = ApplicationUtils.locale.view.projectFrame;
</script>

<style scoped>
    .icon {
        margin-right: 8px;
    }

    .el-menu-item {
        justify-content: center;
    }
</style>
