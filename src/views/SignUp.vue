<template>
    <el-card class="sign-up-container">
        <h3 v-text="lang.label"/>

        <SignUpForm/>
    </el-card>
</template>

<script lang="ts" setup>
    import ApplicationUtils from "@/utils/ApplicationUtils";
    import SignUpForm from "@/components/forms/SignUpForm.vue";

    const lang = ApplicationUtils.locale.view.signUp;

    init();

    function init() {
        ApplicationUtils.setTitle(lang.title);
    }
</script>

<style scoped>
    .sign-up-container {
        width: 400px;
        text-align: center;
        transform: translate(-50%, -50%);
        left: 50%;
        top: 50%;
        position: absolute;
        padding: 0 20px;
    }
</style>
