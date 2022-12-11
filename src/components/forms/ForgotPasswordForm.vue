<template>
    <el-form :model="forgotPassword" :rules="forgotPasswordFormRules" ref="forgotPasswordFormRef" label-position="top" label-width="80px">
        <el-form-item prop="email" :label="lang.email">
            <el-input type="email" v-model="forgotPassword.email"/>
        </el-form-item>
        <el-form-item prop="vCode" :label="lang.vCode">
            <el-input type="text" v-model="forgotPassword.vCode">
                <template #append>
                    <el-button class="button-getVCode"
                               type="primary"
                               @click="getVCode"
                               v-if="!timer.isCountdown">
                        <div v-text="lang.getVCode"/>
                    </el-button>
                    <el-button v-else disabled>
                        <div v-text="lang.availableInXSeconds.replace('%d',timer.count.toString())"/>
                    </el-button>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item prop="password" :label="lang.newPassword">
            <el-input type="password" v-model="forgotPassword.newPassword" show-password/>
        </el-form-item>
        <el-form-item prop="confirmPassword" :label="lang.confirmPassword">
            <el-input type="password" v-model="forgotPassword.confirmPassword" show-password/>
        </el-form-item>


        <el-form-item>
            <el-button class="button-reset"
                       type="primary"
                       @click="submitForgotPasswordForm"
                       :loading="requestingService">
                <div v-text="lang.reset"/>
            </el-button>
        </el-form-item>

<!--        <el-form-item>-->
<!--            <div style="display: flex;align-items: center">-->
<!--                <div v-text="lang.haveAccount"/>-->
<!--                <router-link class="el-link el-link&#45;&#45;primary"-->
<!--                             v-text="lang.signIn"-->
<!--                             :to="{name: 'signIn'}"-->
<!--                />-->
<!--            </div>-->
<!--        </el-form-item>-->
    </el-form>
</template>

<script lang="ts" setup>
    import { reactive, ref } from "vue";
    import { FormInstance, FormRules } from "element-plus";
    import router from "@/plugins/VueRouter";
    import StatusCode from "@/utils/enums/StatusCode";
    import ApplicationUtils from "@/utils/ApplicationUtils";
    import RequestUtils from "@/utils/RequestUtils";

    const lang = ApplicationUtils.locale.form.forgotPassword;
    const message = ApplicationUtils.locale.message;

    const forgotPasswordFormRef = ref<FormInstance>();

    const timer = reactive({
        id: -1,
        isCountdown: false,
        count: 0,

        start() {
            this.isCountdown = true;
            this.count = 60;
            this.id = setInterval(() => {
                if (this.count > 0 && this.count <= 60)
                    this.count--;
                else
                    this.stop();
            }, 1000);
        },
        stop() {
            this.isCountdown = false;
            clearInterval(this.id);
            this.id = -1;
        }
    });

    const requestingService = ref(false);
    const forgotPassword = reactive({
        newPassword: "",
        confirmPassword: "",
        email: "",
        vCode: ""
    });

    const formValidator = {
        newPassword(rule: any, value: any, callback: any) {
            const regex = new RegExp("^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*,._])[0-9a-zA-Z!@#$%^&*,._]{8,16}$");
            if (!regex.test(value))
                callback(lang.passwordRule);
            //不能与原密码相同
            return callback();
        },
        confirmPassword(rule: any, value: any, callback: any) {
            if (value !== forgotPassword.newPassword)
                callback(lang.confirmPasswordError);
            return callback();
        }
    };

    const forgotPasswordFormRules: FormRules = {
        newPassword: [
            { required: true, message: lang.enterNewPassword, trigger: "blur" },
            { validator: formValidator.newPassword, trigger: "blur" }
        ],
        confirmPassword: [
            { required: true, message: lang.confirmPasswordTip, trigger: "blur" },
            { validator: formValidator.confirmPassword, trigger: "blur" }
        ],
        email: [
            { required: true, message: lang.enterEmail, trigger: "blur" },
            { type: "email", message: lang.emailFormatError, trigger: "blur" }
        ],
        vCode: [{ required: true, message: lang.enterVCode, trigger: "blur" }]
    };

    function getVCode() {
        if (forgotPassword.email === "") {
            ApplicationUtils.showMessage(message.enterEmail, "error");
            return;
        }

        // timer.start();
        // RequestUtils.getSignUpCode(forgotPassword.email).then(() => {
        //     ApplicationUtils.showMessage(message.vCodeSendSuccessfully, "success");
        // }).catch(() => {
        //     ApplicationUtils.showMessage(message.vCodeSendFailed, "error");
        //     requestingService.value = false;
        //     timer.stop();
        // });
    }

    function submitForgotPasswordForm() {
        forgotPasswordFormRef.value?.validate((valid) => {
            if (!valid) return;

            // requestingService.value = true;
            // const newSignUpForm = JSON.parse(JSON.stringify(forgotPassword));
            // delete newSignUpForm.confirmPassword;
            // console.log(newSignUpForm);
            // RequestUtils.signUp(newSignUpForm).then(resp => {
            //     if (resp === StatusCode.userExists)
            //         ApplicationUtils.showMessage(message.userExists, "error");
            //     if (resp === StatusCode.vCodeError)
            //         ApplicationUtils.showMessage(message.vCodeError, "error");
            //     if (resp === StatusCode.invalidVCode)
            //         ApplicationUtils.showMessage(message.vCodeInvalid, "error");
            //     if (resp === StatusCode.vCodeRecordNotFound)
            //         ApplicationUtils.showMessage(message.noVCodeRecord, "error");
            //     if (resp === StatusCode.uuidConflict)
            //         ApplicationUtils.showMessage(message.uuidConflict, "error");
            //
            //     if (resp === StatusCode.success) {
            //         ApplicationUtils.showMessage(message.signUpSuccessfully, "success");
            //         router.push({ name: "signIn" });
            //     }
            //
            //     requestingService.value = false;
            // }).catch(() => {
            //     ApplicationUtils.showMessage(message.timeout, "error");
            //     requestingService.value = false;
            // });
        });
    }
</script>

<style scoped>
    .button-getVCode {
        background-color: var(--el-button-bg-color) !important;
        color: white !important;
        border-top-left-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
    }

    .button-getVCode:hover {
        background-color: var(--el-button-hover-bg-color) !important;
    }

    .button-getVCode:active {
        background-color: var(--el-button-active-bg-color) !important;
    }

    .button-reset {
        width: 100%;
    }
</style>
