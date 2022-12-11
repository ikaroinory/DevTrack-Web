<template>
    <el-card class="forgot-password-container">
        <h3 v-text="lang.label"/>

        <ForgotPasswordForm/>
    </el-card>
</template>

<script lang="ts" setup>
    import ApplicationUtils from "@/utils/ApplicationUtils";
    import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm.vue";

    const lang = ApplicationUtils.locale.view.forgotPassword;

    init();

    function init() {
        ApplicationUtils.setTitle(lang.title);
    }
</script>

<style scoped>
    .forgot-password-container {
        width: 400px;
        text-align: center;
        transform: translate(-50%, -50%);
        left: 50%;
        top: 50%;
        position: absolute;
        padding: 0 20px;
    }
</style>
