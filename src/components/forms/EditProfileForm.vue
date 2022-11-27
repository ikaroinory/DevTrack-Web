<template>
    <el-form style="padding: 0 20px"
             :model="form"
             label-position="left" label-width="100px">
        <el-form-item style="align-items: center"
                      :label="lang.avatar">
            <el-upload class="block-upload"
                       ref="uploadRef"
                       accept=".png, .jpg, .jpeg" :auto-upload="false" :limit="1" :show-file-list="false"
                       :on-change="onChange" :http-request="uploadRequest" :on-success="uploadSuccessHandler">
                <el-avatar class="image-upload"
                           v-if="avatar"
                           :src="avatar"
                />
                <el-icon class="image-upload"
                         v-else
                         v-text="Plus"
                />
            </el-upload>

            <el-button style="margin-left: 16px"
                       type="primary"
                       @click="uploadAvatar">
                <div v-text="lang.upload"/>
            </el-button>
            <el-button @click="resetAvatar">
                <div v-text="lang.reset"/>
            </el-button>
        </el-form-item>

        <el-form-item :label="lang.username">
            <div v-text="username"/>
        </el-form-item>
        <el-form-item :label="lang.signUpTime">
            <div v-text="signUpTime.replace('T', ' ')"/>
        </el-form-item>
        <el-form-item :label="lang.lastSignInTime">
            <div v-text="lastSignInTime.replace('T', ' ')"/>
        </el-form-item>
        <el-form-item :label="lang.nickname">
            <el-input v-model="form.nickname"
                      type="text"
                      clearable maxlength="16" show-word-limit
            />
        </el-form-item>
        <el-form-item :label="lang.gender">
            <el-radio-group v-model="form.gender">
                <el-radio :label="1">
                    <div v-text="lang.male"/>
                </el-radio>
                <el-radio :label="2">
                    <div v-text="lang.female"/>
                </el-radio>
                <el-radio :label="0">
                    <div v-text="lang.other"/>
                </el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item :label="lang.phone">
            <el-input type="text" clearable v-model="form.phone"/>
        </el-form-item>
        <el-form-item :label="lang.location">
            <el-input type="text" clearable maxlength="32" show-word-limit v-model="form.location"/>
        </el-form-item>
        <el-form-item :label="lang.website">
            <el-input type="text" clearable maxlength="128" show-word-limit v-model="form.website"/>
        </el-form-item>
        <el-form-item :label="lang.introduction">
            <el-input type="text" clearable maxlength="30" show-word-limit v-model="form.introduction"/>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm">
                <div v-text="lang.submit"/>
            </el-button>
            <el-button @click="resetForm">
                <div v-text="lang.reset"/>
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
    import { inject, reactive, ref } from "vue";
    import { Plus } from "@element-plus/icons-vue";
    import { UploadFile, UploadInstance, UploadRequestOptions } from "element-plus";
    import ApplicationUtils from "@/utils/ApplicationUtils";
    import StatusCode from "@/utils/enums/StatusCode";
    import RequestUtils from "@/utils/RequestUtils";
    import EditProfileForm from "@/utils/forms/EditProfileForm";
    import Result from "@/utils/dto/Result";

    defineExpose({ clearForm: resetFormTool });

    const props = defineProps<{
        avatar: string
        username: string
        nickname: string
        gender: number
        phone: string
        location: string
        website: string
        introduction: string
        signUpTime: string
        lastSignInTime: string
    }>();
    const reload: Function = inject("reload")!;
    const lang = ApplicationUtils.locale.form.editProfile;
    const message = ApplicationUtils.locale.message;

    const avatar = ref(props.avatar);
    const form = reactive<EditProfileForm>({
        username: props.username,
        nickname: props.nickname,
        gender: props.gender,
        phone: props.phone,
        location: props.location,
        website: props.website,
        introduction: props.introduction
    });

    const uploadRef = ref<UploadInstance>();

    function onChange(uploadFile: UploadFile) {
        avatar.value = URL.createObjectURL(uploadFile.raw!);
    }

    function uploadRequest(options: UploadRequestOptions) {
        return RequestUtils.updateAvatar({ username: props.username, file: options.file });
    }

    function resetAvatar() {
        if (avatar.value === props.avatar) {
            ApplicationUtils.showMessage(message.youDoNotNeedToResetAvatar, "warning");
            return;
        }
        uploadRef.value?.clearFiles();
        avatar.value = props.avatar;
        ApplicationUtils.showMessage(message.resetSuccessfully, "success");
    }

    function uploadAvatar() {
        if (avatar.value === props.avatar)
            ApplicationUtils.showMessage(message.youHaveNotModifiedAvatar, "warning");
        else
            uploadRef.value?.submit();
    }

    function uploadSuccessHandler(response: Result<string>) {
        if (response.statusCode === StatusCode.success) {
            ApplicationUtils.showMessage(message.updateSuccessfully, "success");
            reload();
        } else
            ApplicationUtils.showMessage(message.uploadFailed, "error");
    }

    function resetFormTool() {
        let count = 0;
        if (form.nickname !== props.nickname) {
            form.nickname = props.nickname;
            count++;
        }
        if (form.gender !== props.gender) {
            form.gender = props.gender;
            count++;
        }
        if (form.phone !== props.phone) {
            form.phone = props.phone;
            count++;
        }
        if (form.location !== props.location) {
            form.location = props.location;
            count++;
        }
        if (form.website !== props.website) {
            form.website = props.website;
            count++;
        }
        if (form.introduction !== props.introduction) {
            form.introduction = props.introduction;
            count++;
        }
        return count;
    }

    function resetForm() {
        if (resetFormTool() === 0)
            ApplicationUtils.showMessage(message.youDoNotNeedToResetForm, "warning");
        else
            ApplicationUtils.showMessage(message.resetSuccessfully, "success");
    }

    function submitForm() {
        RequestUtils.editProfile(form).then(resp => {
            if (resp.statusCode === StatusCode.valueNotUpdate)
                ApplicationUtils.showMessage(message.youHaveNotModifiedForm, "warning");

            if (resp.statusCode === StatusCode.success) {
                ApplicationUtils.showMessage(message.submitSuccessfully, "success");
                reload();
            }
        }).catch(() => ApplicationUtils.showMessage(message.timeout, "error"));
    }
</script>

<style scoped>
    .block-upload {
        border: 1px dashed #dcdfe6;
        border-radius: 50%;
        cursor: pointer;
        width: 178px;
        height: 178px;
    }

    .block-upload:hover {
        border-color: #409eff;
    }

    .image-upload {
        color: #8c939d;
        width: 178px;
        height: 178px;
        text-align: center;
    }
</style>
