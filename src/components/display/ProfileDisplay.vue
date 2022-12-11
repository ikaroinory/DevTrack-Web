<template>
    <div class="frame-profile-display">
        <div class="frame-avatar">
            <el-avatar :size="256" :src="'data:image/jpeg;base64,' + props.avatar"/>
        </div>
        <div class="frame-name">
            <div v-if="nickname !== username" class="label-nickname">{{ props.nickname }}</div>
            <div class="label-username">{{ props.username }}</div>
        </div>
        <div>
            <el-button v-if="props.isUserHimself" class="button-editProfile" type="primary" @click="editProfile">
                <div v-text="lang.editProfile"/>
            </el-button>
            <el-button v-else class="button-follow" type="primary" @click="follow">
                <div v-text="lang.follow"/>
            </el-button>
        </div>
        <div class="frame-info">
            <div class="item-info" v-if="props.gender !== 0">
                <male class="icon-info" v-if="props.gender === 1"/>
                <female class="icon-info" v-else-if="props.gender === 2"/>
            </div>
            <div class="item-info" v-if="props.location !== ''">
                <local-two class="icon-info"/>
                <div class="label-info">{{ props.location }}</div>
            </div>
            <div class="item-info" v-if="props.website !== ''">
                <earth class="icon-info"/>
                <div class="label-info"><a :href="props.website">{{ props.website }}</a></div>
            </div>
            <div class="item-info" v-if="props.introduction !== ''">
                <info class="icon-info"/>
                <div class="label-info">{{ props.introduction }}</div>
            </div>
        </div>
        <!--<hr/>-->
        <!--<h3>Achievements</h3>-->

        <EditProfileDialog v-model:show="showEditProfileDialog"
                           :avatar="avatar"
                           :username="username"
                           :nickname="nickname"
                           :gender="gender"
                           :phone="phone"
                           :location="location"
                           :website="website"
                           :introduction="introduction"
                           :sign-up-time="signUpTime"
                           :last-sign-in-time="lastSignInTime"
        />
    </div>
</template>

<script lang="ts" setup>
    import { ref } from "vue";
    import { Earth, Female, Info, LocalTwo, Male } from "@icon-park/vue-next";
    import ApplicationUtils from "@/utils/ApplicationUtils";
    import EditProfileDialog from "@/components/dialogs/EditProfileDialog.vue";

    const props = defineProps<{
        username: string
        nickname: string
        avatar: string
        gender: number
        phone: string
        location: string
        website: string
        introduction: string
        signUpTime: string
        lastSignInTime: string
        isUserHimself: boolean
    }>();

    const lang = ApplicationUtils.locale.display.profile;
    const showEditProfileDialog = ref(false);

    function editProfile() {
        showEditProfileDialog.value = true;
    }

    function follow() {
        ApplicationUtils.showMessage("关注失败！", "error");
    }
</script>

<style scoped>
    .frame-profile-display {
        width: 256px;
    }

    .frame-avatar {}

    .frame-name, .frame-info {
        padding: 16px 0;
    }

    .item-info {
        display: flex;
        align-items: stretch;
        margin-bottom: 8px
    }

    .item-info:nth-last-child(1) {
        margin-bottom: 0;
    }

    .label-nickname {
        display: block;
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 4px;
    }

    .label-username {
        display: block;
        color: #8b949e;
    }

    .label-info {
        font-size: 14px;
        font-weight: bold;
        margin-left: 8px;
    }

    .button-editProfile, .button-follow {
        width: 100%;
        margin-left: 0 !important;
    }

    .icon-info {
        width: 16px;
        height: 16px;
        overflow: visible;
    }
</style>
