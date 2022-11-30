<template>
    <div class="global-frame-fillet">
        <div style="display: flex; justify-content: space-between">
            <div class="global-frame-title global-vertical-margin" v-text="lang.memberList"/>
            <div>
                <el-button type="primary" @click="addMembersDialog = true">
                    <plus class="icon"/>
                    <span v-text="lang.inviteMembers"/>
                </el-button>
            </div>
        </div>
        <div class="global-vertical-margin">
            <el-table v-loading="loading" max-height="570" :data="members">
                <el-table-column label="No" type="index" :index="1"/>
                <el-table-column :label="lang.nicknameAndUsername">
                    <template #default="scope">
                        <UserItem :username="scope.row.username" :nickname="scope.row.nickname" :avatar="scope.row.avatar" router/>
                    </template>
                </el-table-column>
                <el-table-column prop="roleName" :label="lang.role"/>
                <el-table-column prop="joinTime" :label="lang.joinTime"/>
                <el-table-column :label="lang.operations">
                    <template #default="scope">
                        <el-button type="primary" @click="edit(scope.row)">
                            <div v-text="lang.edit"/>
                        </el-button>
                        <el-button type="danger" @click="remove(scope.row)">
                            <div v-text="lang.remove"/>
                        </el-button>
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

    <EditMemberInformationDialog v-model:show="showDialog"
                                 :record-u-u-i-d="recordUUID"
                                 :nickname-in-project="nicknameInProject"
                                 :role="role"
    />
    <AddMembersDialog v-model:show="addMembersDialog"
                      :uuid="uuid"
    />
</template>

<script lang="ts" setup>
    import { inject, ref } from "vue";
    import { Plus } from "@icon-park/vue-next";
    import ProjectMemberInformation from "@/utils/dto/ProjectMemberInformation";
    import UserItem from "@/components/items/UserItem.vue";
    import EditMemberInformationDialog from "@/components/dialogs/EditMemberInformationDialog.vue";
    import AddMembersDialog from "@/components/dialogs/AddMembersDialog.vue";
    import RequestUtils from "@/utils/RequestUtils";
    import ApplicationUtils from "@/utils/ApplicationUtils";
    import StatusCode from "@/utils/enums/StatusCode";

    const props = defineProps({
        uuid: { type: String, required: true }
    });

    const reload: Function = inject("reload")!;

    const lang = ApplicationUtils.locale.view.projectMembers;
    const message = ApplicationUtils.locale.message;

    const loading = ref(false);
    const members = ref<Array<ProjectMemberInformation>>([]);
    const currentPage = ref(1);
    const pageSize = 10;
    const recordCount = ref(1);
    const showDialog = ref(false);
    const recordUUID = ref("");
    const nicknameInProject = ref("");
    const role = ref("");
    const addMembersDialog = ref(false);

    function init() {
        ApplicationUtils.setTitle(lang.title);
        getPage(currentPage.value);
    }

    function clearTable() {
        members.value = [];
    }

    function getPage(pageNum: number) {
        loading.value = true;
        RequestUtils.getOnePageProjectMemberInformation(pageNum, pageSize, props.uuid).then(resp => {
            members.value = resp.list;
            recordCount.value = resp.recordCount;
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

    function edit(members: ProjectMemberInformation) {
        recordUUID.value = members.recordUUID;
        nicknameInProject.value = members.nicknameInProject;
        role.value = members.roleName;
        showDialog.value = true;
    }

    function remove(member: ProjectMemberInformation) {
        ApplicationUtils.showMessageBox(
            message.doYouWantToRemoveTheUserFromThisProject
                .replace("%user", member.nickname + "(" + member.username + ")"),
            "warning",
            "OkCancel"
        ).then(() => {
            RequestUtils.removeProjectMember(member.recordUUID).then(resp => {
                if (resp.statusCode === StatusCode.success) {
                    ApplicationUtils.showMessage(message.removeSuccessfully, "success");
                    reload();
                }
            }).catch(() => ApplicationUtils.showMessage(message.timeout, "error"));
        }).catch(() => {});
    }

    init();
</script>
