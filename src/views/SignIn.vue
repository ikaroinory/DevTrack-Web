<template>
    <el-card class="sign-in-container">
        <h3 v-text="lang.label"/>

        <SignInForm/>
    </el-card>
</template>

<script lang="ts" setup>
    import SignInForm from "@/components/forms/SignInForm.vue";
    import ApplicationUtils from "@/utils/ApplicationUtils";

    const lang = ApplicationUtils.locale.view.signIn;

    init();

    function init() {
        ApplicationUtils.setTitle(lang.title);
    }
</script>

<style scoped>
    .sign-in-container {
        width: 400px;
        text-align: center;
        transform: translate(-50%, -50%);
        left: 50%;
        top: 50%;
        position: absolute;
        padding: 0 20px;
    }
</style>
