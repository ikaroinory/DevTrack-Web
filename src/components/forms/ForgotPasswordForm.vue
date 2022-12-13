<template>
    <el-form :model="forgotPasswordForm" :rules="forgotPasswordFormRules" ref="forgotPasswordFormRef" label-position="top" label-width="80px">
        <el-form-item prop="username" :label="lang.username">
            <el-input type="text" v-model="forgotPasswordForm.username"/>
        </el-form-item>
        <el-form-item prop="email" :label="lang.email">
            <el-input type="email" v-model="forgotPasswordForm.email"/>
        </el-form-item>
        <el-form-item prop="vCode" :label="lang.vCode">
            <el-input type="text" v-model="forgotPasswordForm.vCode">
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
            <el-input type="password" v-model="forgotPasswordForm.password" show-password/>
        </el-form-item>
        <el-form-item prop="confirmPassword" :label="lang.confirmPassword">
            <el-input type="password" v-model="forgotPasswordForm.confirmPassword" show-password/>
        </el-form-item>


        <el-form-item>
            <el-button class="button-reset"
                       type="primary"
                       @click="submitForgotPasswordForm"
                       :loading="requestingService">
                <div v-text="lang.reset"/>
            </el-button>
        </el-form-item>

        <el-form-item>
            <div style="display: flex;align-items: center">
<!--                <div v-text="lang.returnSignIn"/>-->
                <router-link class="el-link el-link--primary"
                             v-text="lang.returnSignIn"
                             :to="{name: 'signIn'}"
                />
            </div>
        </el-form-item>
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
    const forgotPasswordForm = reactive({
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        vCode: ""
    });

    const formValidator = {
        username(rule: any, value: any, callback: any) {
            const regex = new RegExp("^\\w{6,20}$");
            if (!regex.test(value))
                callback(lang.usernameRule);
            return callback();
        },
        password(rule: any, value: any, callback: any) {
            const regex = new RegExp("^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*,._])[0-9a-zA-Z!@#$%^&*,._]{8,16}$");
            if (!regex.test(value))
                callback(lang.passwordRule);
            return callback();
        },
        confirmPassword(rule: any, value: any, callback: any) {
            if (value !== forgotPasswordForm.password)
                callback(lang.confirmPasswordError);
            return callback();
        }
    };

    const forgotPasswordFormRules: FormRules = {
        username: [
            { required: true, message: lang.enterUsername, trigger: "blur" },
            { validator: formValidator.username, trigger: "blur" }
        ],
        password: [
            { required: true, message: lang.enterNewPassword, trigger: "blur" },
            { validator: formValidator.password, trigger: "blur" }
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
        if (forgotPasswordForm.email === "") {
            ApplicationUtils.showMessage(message.enterEmail, "error");
            return;
        }

        timer.start();
        RequestUtils.getForgotPasswordCode(forgotPasswordForm.email).then(() => {
            ApplicationUtils.showMessage(message.vCodeSendSuccessfully, "success");
        }).catch(() => {
            ApplicationUtils.showMessage(message.vCodeSendFailed, "error");
            requestingService.value = false;
            timer.stop();
        });
    }

    function submitForgotPasswordForm() {
        forgotPasswordFormRef.value?.validate((valid) => {
            if (!valid) return;

            requestingService.value = true;
            const newForgotPasswordForm = JSON.parse(JSON.stringify(forgotPasswordForm));
            delete newForgotPasswordForm.confirmPassword;
            RequestUtils.retrieve(newForgotPasswordForm).then(resp => {
                if (resp === StatusCode.userNotFound)
                    ApplicationUtils.showMessage(message.userNotFound, "error");

                if (resp === StatusCode.success) {
                    ApplicationUtils.showMessage(message.resetPasswordSuccessfully, "success");
                    router.push({ name: "signIn" });
                }

                requestingService.value = false;
            }).catch(() => {
                ApplicationUtils.showMessage(message.timeout, "error");
                requestingService.value = false;
            });
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
