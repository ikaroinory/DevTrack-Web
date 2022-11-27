<template>
    <el-form :model="signInForm" :rules="signInFormRules" ref="signInFormRef">
        <el-form-item prop="username">
            <el-input v-model="signInForm.username"
                      type="text"
                      :placeholder="lang.username"
            />
        </el-form-item>
        <el-form-item prop="password">
            <el-input v-model="signInForm.password"
                      type="password"
                      :placeholder="lang.password"
                      show-password
            />
        </el-form-item>

        <el-form-item>
            <el-button style="width: 100%"
                       type="primary"
                       @click="submitSignInForm"
                       :loading="requestingService">
                <div v-text="lang.signIn"/>
            </el-button>
        </el-form-item>

        <el-form-item>
            <div style="width: 100%">
                <div style="display: flex;justify-content: space-between;align-items: center">
                    <router-link class="el-link el-link--primary"
                                 v-text="lang.forgotPassword"
                                 to="/account/forget"
                    />
                    <div style="display: flex;align-items: center">
                        <div v-text="lang.noAccount"/>
                        <router-link class="el-link el-link--primary"
                                     v-text="lang.signUp"
                                     :to="{name: 'signUp'}"
                        />
                    </div>
                </div>
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
    import SessionStorageUtils from "@/utils/SessionStorageUtils";
    import LocalStorageUtils from "@/utils/LocalStorageUtils";
    import SignInForm from "@/utils/forms/SignInForm";

    const lang = ApplicationUtils.locale.form.signIn;
    const message = ApplicationUtils.locale.message;

    const requestingService = ref(false);
    const signInForm = reactive<SignInForm>({
        username: "",
        password: ""
    });
    const signInFormRules: FormRules = {
        username: [{ required: true, message: lang.enterUsername, trigger: "blur" }],
        password: [{ required: true, message: lang.enterPassword, trigger: "blur" }]
    };

    const signInFormRef = ref<FormInstance>();

    function submitSignInForm() {
        signInFormRef.value?.validate(async (valid) => {
            if (!valid) return;

            requestingService.value = true;
            let username: string = "";
            await RequestUtils.signIn(signInForm).then(resp => {
                if (resp.statusCode === StatusCode.userNotExists)
                    ApplicationUtils.showMessage(message.userNotFound, "error");
                if (resp.statusCode === StatusCode.passwordError)
                    ApplicationUtils.showMessage(message.passwordError, "error");

                if (resp.statusCode === StatusCode.success) {
                    LocalStorageUtils.setToken(resp.resultData);
                    username = LocalStorageUtils.getUsernameFromToken();
                    ApplicationUtils.showMessage(message.welcomeUser.replace("%s", username), "success");
                }
                requestingService.value = false;
            }).catch(() => {
                ApplicationUtils.showMessage(message.timeout, "error");
                requestingService.value = false;
            });
            RequestUtils.getUserInformation(username).then(resp => {
                SessionStorageUtils.setUserInformation(resp.resultData);
                SessionStorageUtils.setAccessMode("user");
                router.push({ name: "dashboard" });
                requestingService.value = false;
            }).catch(() => {
                ApplicationUtils.showMessage(message.timeout, "error");
                requestingService.value = false;
            });
        });
    }
</script>
