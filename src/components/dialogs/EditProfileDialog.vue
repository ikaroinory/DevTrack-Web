<template>
    <el-dialog v-model="thisShow"
               :title="lang.title"
               style="width: 800px" align-center
               @closed="closedDialog"
               :close-on-click-modal="false" :close-on-press-escape="false">
        <EditProfileForm ref="editProfileFormRef"
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
    </el-dialog>
</template>

<script lang="ts" setup>
    import { computed, ref } from "vue";
    import EditProfileForm from "@/components/forms/EditProfileForm.vue";
    import ApplicationUtils from "@/utils/ApplicationUtils";

    const props = defineProps({
        show: { type: Boolean, required: true },
        avatar: { type: String, required: true },
        username: { type: String, required: true },
        nickname: { type: String, required: true },
        gender: { type: Number, required: true },
        phone: { type: String, required: true },
        location: { type: String, required: true },
        website: { type: String, required: true },
        introduction: { type: String, required: true },
        signUpTime: { type: String, required: true },
        lastSignInTime: { type: String, required: true }
    });
    const emits = defineEmits(["update:show"]);
    const thisShow = computed({
        get: () => props.show,
        set: val => emits("update:show", val)
    });
    const lang = ApplicationUtils.locale.form.editProfile;
    const editProfileFormRef = ref();

    function closedDialog() {
        editProfileFormRef.value.clearForm();
    }
</script>
