<template>
    <div class='global-frame-fillet'>
        <div class="global-vertical-margin">
            <div class="global-flex-box">
                <div class="global-frame-title">{{ lang.roleList }}</div>

                <div>
                    <el-button type="primary">
                        <plus class="global-icon"/>
                        <span>{{ lang.newRole }}</span>
                    </el-button>
                </div>
            </div>
        </div>

        <div class="global-vertical-margin">
            <el-table v-loading="tableLoading" max-height="570" :data="roleList">
                <el-table-column label="No" type="index" :index="1"/>
                <el-table-column :label="lang.roleName" prop="name"/>
                <el-table-column :label="lang.operations">
                    <template #default="scope">
                        <el-button type="primary">{{ lang.edit }}</el-button>
                        <el-button type="danger">{{ lang.remove }}</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from "vue";
    import { Plus } from "@icon-park/vue-next";
    import ApplicationUtils from "@/utils/ApplicationUtils.js";
    import Role from "@/utils/po/Role";
    import RequestUtils from "@/utils/RequestUtils";

    const props = defineProps({
        uuid: { type: String, required: true }
    });

    const lang = ApplicationUtils.locale.view.projectRoles;
    const message = ApplicationUtils.locale.message;

    const tableLoading = ref(false);
    const roleList = ref<Array<Role>>([]);
    const pageSize = 10;
    const currentPage = ref(1);
    const recordCount = ref(1);

    init();

    function init() {
        ApplicationUtils.setTitle(lang.title);
        getPage(currentPage.value);
    }

    function clearTable() {roleList.value = [];}

    function getPage(pageNum: number) {
        tableLoading.value = true;
        RequestUtils.getOnePageRoles(props.uuid, pageNum, pageSize).then(resp => {
            roleList.value = resp.list;
            recordCount.value = resp.recordCount;
            tableLoading.value = false;
        }).catch(() => {
            ApplicationUtils.showMessage(message.timeout, "error");
            tableLoading.value = false;
        });
    }

    function changePage(val: number) {
        clearTable();
        getPage(val);
    }
</script>
