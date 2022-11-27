<template>
    <div v-loading="loading">
        <div class="frame-project-information">
            <div class="frame-project-information-header">
                <div class="project-name">{{ info.name }}</div>
                <div class="frame-project-information-flex-abstract">
                    <div class="project-creator">{{ info.creatorNickname }}</div>
                    <div class="project-create-time">{{ lang.createdAt }} {{ info.creationTime }}</div>
                </div>
            </div>
        </div>
        <div class="frame-project-information">
            <div class="frame-project-information-header">
                <div class="frame-project-information-flex-header">
                    <div class="project-information-label"
                         v-text="lang.projectInformation"
                    />
                    <div>
                        <el-button type="primary" @click="setMembersPrivileges=true">
                            <edit class="icon"/>
                            <span v-text="lang.setMemberRole"/>
                        </el-button>
                        <el-button type="primary" @click="modifyProjectInformation=true">
                            <edit class="icon"/>
                            <span v-text="lang.editProjectInformation"/>
                        </el-button>
                    </div>
                </div>
            </div>

            <div style="margin-top: 32px">
                <div class="frame-project-information-flex-creator">
                    <div class="project-creator-label"
                         v-text="lang.creator"
                    />
                    <UserItem :username="info.creatorUsername" :nickname="info.creatorNickname" :avatar="info.creatorAvatar" router/>
                </div>
                <div class="frame-project-information-flex-principal">
                    <div class="project-principal-label"
                         v-text="lang.principal"
                    />
                    <UserItem :username="info.principalUsername" :nickname="info.principalNickname" :avatar="info.principalAvatar" router/>
                </div>
                <div class="frame-project-information-flex-description">
                    <div class="project-description-label"
                         v-text="lang.description"
                    />
                    <div style="overflow: visible;">{{ info.description ?? lang.noDescription }}</div>
                </div>
                <div class="frame-project-information-flex-start-time">
                    <div class="project-start-time-label"
                         v-text="lang.startTime"
                    />
                    <div>{{ info.startTIme ?? lang.unspecified }}</div>
                </div>
                <div class="frame-project-information-flex-status">
                    <div class="project-status-label"
                         v-text="lang.status"
                    />
                    <div v-if="info.status==='1'">
                        <hourglass-full class="icon" size="19" fill="#f56c6c"/>
                        <span v-text="lang.notStart"/>
                    </div>
                    <div v-else-if="info.status==='2'">
                        <pie-two class="icon" size="19" fill="#fac858"/>
                        <span v-text="lang.inProgress"/>
                    </div>
                    <div v-else-if="info.status==='3'">
                        <success class="icon" size="19" fill="#67c23a"/>
                        <span v-text="lang.completed"/>
                    </div>
                    <div v-else>
                        <caution class="icon" size="19" fill="#fac858"/>
                        <span v-text="lang.unknown"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="frame-project-information">
            <div class="frame-project-information-header">
                <div class="frame-project-information-flex-header">
                    <div class="project-information-label"
                         v-text="lang.memberRank"
                    />
                    <div>
                        <el-button type="danger" @click="removeMembersDialog = true">
                            <minus class="icon"/>
                            <span v-text="lang.deleteMembers"/>
                        </el-button>
                    </div>
                </div>
            </div>
            <div style="margin-top: 32px">
                <el-table max-height="570" :data="members">
                    <el-table-column type="index" label="No" :index="1"/>
                    <el-table-column :label=lang.nickname>
                        <template #default="scope">
                            <UserItem :username="scope.row.username" :nickname="scope.row.nickname" :avatar="scope.row.avatar" router/>
                        </template>
                    </el-table-column>
                    <el-table-column prop="roleName"
                                     :label=lang.role
                    />
                    <el-table-column prop="joinTime"
                                     :label=lang.joinTime
                    />
                </el-table>
            </div>
        </div>
    </div>

    <EditProjectInformationDialog v-model:show="modifyProjectInformation"
                                  :uuid="info.uuid"
                                  :name="info.name"
                                  :principal="info.principalUUID"
                                  :description="info.description ?? ''"
                                  :start-time="info.startTIme ?? ''"
                                  :members="members"
    />
    <SetRoleDialog v-model:show="setMembersPrivileges"
                   :uuid="uuid"
    />
    <RemoveProjectMembersDialog v-model:show="removeMembersDialog"
                                :members="members"
    />
</template>

<script lang="ts" setup>
    import { reactive, ref } from "vue";
    import { Caution, Edit, HourglassFull, Minus, PieTwo, Success } from "@icon-park/vue-next";
    import ProjectInformation from "@/utils/dto/ProjectInformation";
    import RequestUtils from "@/utils/RequestUtils";
    import ProjectMemberInformation from "@/utils/dto/ProjectMemberInformation";
    import EditProjectInformationDialog from "@/components/dialogs/EditProjectInformationDialog.vue";
    import RemoveProjectMembersDialog from "@/components/dialogs/RemoveProjectMembersDialog.vue";
    import ApplicationUtils from "@/utils/ApplicationUtils";
    import SetRoleDialog from "@/components/dialogs/SetRoleDialog.vue";
    import UserItem from "@/components/items/UserItem.vue";

    const props = defineProps({
        uuid: { type: String, required: true }
    });
    const lang = ApplicationUtils.locale.view.projectOverview;
    const loading = ref(false);
    const info = reactive<ProjectInformation>({
        uuid: "",
        name: "",
        creatorUUID: "",
        creatorUsername: "",
        creatorNickname: "",
        creatorAvatar: "",
        principalUUID: "",
        principalUsername: "",
        principalNickname: "",
        principalAvatar: "",
        description: "",
        creationTime: "",
        startTIme: "",
        status: ""
    });
    const members = ref<Array<ProjectMemberInformation>>([]);
    const modifyProjectInformation = ref(false);
    const setMembersPrivileges = ref(false);
    const removeMembersDialog = ref(false);

    function init() {
        ApplicationUtils.setTitle(lang.title);
        loading.value = true;
        RequestUtils.getProjectInformation(props.uuid).then(resp => {
            info.uuid = resp.resultData.uuid;
            info.name = resp.resultData.name;
            info.creatorUUID = resp.resultData.creatorUUID;
            info.creatorUsername = resp.resultData.creatorUsername;
            info.creatorNickname = resp.resultData.creatorNickname;
            info.creatorAvatar = resp.resultData.creatorAvatar;
            info.principalUUID = resp.resultData.principalUUID;
            info.principalUsername = resp.resultData.principalUsername;
            info.principalNickname = resp.resultData.principalNickname;
            info.principalAvatar = resp.resultData.principalAvatar;
            info.description = resp.resultData.description;
            info.creationTime = resp.resultData.creationTime;
            info.startTIme = resp.resultData.startTIme;
            info.status = resp.resultData.status;
            loading.value = false;
        }).catch(() => {
            loading.value = false;
        });
        RequestUtils.getOnePageProjectMemberInformation(1, 10, props.uuid).then(resp => members.value = resp.list);
    }

    init();
</script>

<style scoped>
    .frame-project-information {
        margin: 20px;
        padding: 24px;
        border: var(--border-default);
        border-radius: var(--border-radius-item);
        box-shadow: var(--shadow-default);
    }

    .frame-project-information-flex-header {
        display: flex;
        justify-content: space-between;
    }

    .frame-project-information-flex-abstract {
        display: flex;
        align-items: center;
        margin-top: 16px;
    }

    .frame-project-information-flex-creator {
        display: flex;
        align-items: center;
    }

    .frame-project-information-flex-principal {
        display: flex;
        align-items: center;
        margin-top: 20px;
    }

    .frame-project-information-flex-description {
        display: flex;
        margin-top: 20px;
    }

    .frame-project-information-flex-start-time {
        display: flex;
        margin-top: 20px;
    }

    .frame-project-information-flex-status {
        display: flex;
        margin-top: 20px;
    }

    .project-name, .project-information-label {
        font-size: 20px;
        font-weight: bold;
    }

    .project-creator, .project-create-time {
        color: var(--color-text-remark);
        font-size: 14px;
    }

    .project-creator {
        margin-right: 8px;
    }

    .project-creator-label,
    .project-principal-label,
    .project-start-time-label,
    .project-description-label,
    .project-status-label {
        flex-shrink: 0;
        margin-right: 8px;
        width: 150px;
    }

    .icon {
        margin-right: 4px;
    }
</style>
