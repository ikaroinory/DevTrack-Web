<template>
    <div v-if="recordCount !== 0">
        <div v-loading="loading" class="global-vertical-margin">
            <ProjectItem v-for="item in list"
                         :uuid="item.uuid"
                         :name="item.name"
                         :description="item.description"
                         :progress="item.progress"
                         :creator="item.creatorNickname"
                         :creation-time="item.creationTime"
            />
        </div>
        <div class="global-vertical-margin">
            <el-pagination v-model:current-page="currentPage"
                           v-model:page-size="pageSize"
                           @current-change="changePage"
                           :background="true"
                           :total="recordCount"
                           :hide-on-single-page="false"
            />
        </div>
    </div>
    <div v-else>
        <el-empty :description="message.projectNotFound"/>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from "vue";
    import ProjectItem from "@/components/items/ProjectItem.vue";
    import RequestUtils from "@/utils/RequestUtils";
    import ProjectInformation from "@/utils/dto/ProjectInformation";
    import ApplicationUtils from "@/utils/ApplicationUtils";

    const message = ApplicationUtils.locale.message;

    const list = ref<Array<ProjectInformation>>([]);
    const loading = ref(false);
    const currentPage = ref(1);
    const pageSize = 5;
    const recordCount = ref(1);

    function init() {
        getPage(currentPage.value);
    }

    function clearTable() {
        list.value = [];
    }

    function getPage(pageNum: number) {
        loading.value = true;
        RequestUtils.getOnePageUserProjects(pageNum, pageSize).then(resp => {
            list.value = resp.responseData.list;
            recordCount.value = resp.responseData.recordCount;
            loading.value = false;
        }).catch(() => {
            ApplicationUtils.showMessage(message.timeout, "error");
            loading.value = false;
        });
    }

    function changePage(val: number) {
        clearTable();
        getPage(val);
    }

    init();
</script>
