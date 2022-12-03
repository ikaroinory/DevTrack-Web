<template>
    <div class='global-frame-fillet'>
        <div class="global-vertical-margin">
            <div class="global-flex-box">
                <div class="global-frame-title">{{ lang.roleList }}</div>

                <div>
                    <el-button type="primary" @click="showNewRoleDialog = true">
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
                        <el-button type="primary" @click="edit(scope.row)">{{ lang.edit }}</el-button>
                        <el-button type="danger" @click="remove(scope.row)">{{ lang.remove }}</el-button>
                    </template>
                </el-table-column>
            </el-table>
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

    <NewRoleDialog v-model:show="showNewRoleDialog"
                   :project-uuid="uuid"
    />
    <EditRoleDialog v-model:show="showEditRoleDialog"
                    :role="currentRole"
    />
</template>

<script lang="ts" setup>
    import { inject, ref } from "vue";
    import { Plus } from "@icon-park/vue-next";
    import ApplicationUtils from "@/utils/ApplicationUtils.js";
    import Role, { defaultRole } from "@/utils/po/Role";
    import RequestUtils from "@/utils/RequestUtils";
    import EditRoleDialog from "@/components/dialogs/EditRoleDialog.vue";
    import StatusCode from "@/utils/enums/StatusCode";
    import NewRoleDialog from "@/components/dialogs/NewRoleDialog.vue";

    const props = defineProps({
        uuid: { type: String, required: true }
    });

    const reload: Function = inject("reload")!;
    const lang = ApplicationUtils.locale.view.projectRoles;
    const message = ApplicationUtils.locale.message;

    const tableLoading = ref(false);
    const showNewRoleDialog = ref(false);
    const showEditRoleDialog = ref(false);
    const roleList = ref<Array<Role>>([]);
    const pageSize = 10;
    const currentPage = ref(1);
    const recordCount = ref(1);
    const currentRole = ref<Role>(defaultRole);

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

    function edit(role: Role) {
        currentRole.value = role;
        showEditRoleDialog.value = true;
    }

    function remove(role: Role) {
        ApplicationUtils.showMessageBox(
            message.doYouWantToRemoveTheRole.replace("%role", role.name),
            "warning",
            "OkCancel"
        ).then(() => {
            RequestUtils.removeRole(role.uuid).then(resp => {
                switch (resp) {
                    case StatusCode.requiredParamsIsNull:
                        ApplicationUtils.showMessage(message.requiredParamsIsNull, "error");
                        break;
                    case StatusCode.permissionDenied:
                        ApplicationUtils.showMessage(message.permissionDenied, "error");
                        break;
                    case StatusCode.roleRecordExists:
                        ApplicationUtils.showMessage(message.roleRecordExists, "error");
                        break;
                    case StatusCode.roleNotFound:
                        ApplicationUtils.showMessage(message.roleNotFound, "error");
                        break;
                    case StatusCode.success:
                        ApplicationUtils.showMessage(message.removeSuccessfully, "success");
                        reload();
                        break;
                    default:
                        ApplicationUtils.showMessage(message.unknownException, "warning");
                        break;
                }
            }).catch(() => ApplicationUtils.showMessage(message.timeout, "error"));
        }).catch(() => {});
    }
</script>
