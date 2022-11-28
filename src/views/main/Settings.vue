<template>
    <div class="frame-settings">
        <el-tabs v-model="activeTab" tab-position="left">
            <el-tab-pane class="frame-tab-pane" :label="lang.general" name="general">
                <div class="item-settings">
                    <div class="label-title" v-text="lang.languageSetting"/>
                    <div class="label-description" v-text="lang.selectLanguage"/>
                    <div style="margin-bottom: 12px">
                        <el-select v-model="currentLocale">
                            <el-option v-for="item in localeOptions"
                                       :key="item.value"
                                       :label="item.label"
                                       :value="item.value"
                            />
                        </el-select>
                    </div>
                    <div>
                        <el-button type="primary" @click="changeLocale">
                            <div v-text="lang.modify"/>
                        </el-button>
                    </div>
                </div>
                <div class="item-settings">
                    <div class="label-title" v-text="lang.clearStorage"/>
                    <div class="label-description" v-text="lang.clearStorageDescription"/>
                    <el-button type="warning" @click="clearStorage">
                        <div v-text="lang.clear"/>
                    </el-button>
                </div>
                <div class="item-settings">
                    <div class="label-title" v-text="lang.cancellation"/>
                    <div class="label-description" style="color: var(--color-red)" v-text="lang.cancellationDescription"/>
                    <el-button type="danger" disabled>
                        <div v-text="lang.cancel"/>
                    </el-button>
                </div>
            </el-tab-pane>
            <el-tab-pane class="frame-tab-pane" :label="lang.about" name="about">
                <a v-text="lang.applicationServiceAgreement"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from "vue";
    import i18n from "@/plugins/VueI18n";
    import router from "@/plugins/VueRouter";
    import ApplicationUtils from "@/utils/ApplicationUtils";

    const lang = ApplicationUtils.locale.view.settings;
    const message = ApplicationUtils.locale.message;

    const localeOptions = [];

    const activeTab = ref("general");
    const currentLocale = ref(i18n.global.locale);

    init();

    function init() {
        ApplicationUtils.setTitle(lang.title);
        Object.entries(i18n.global.messages).forEach(([key, value]) => localeOptions.push({ value: key, label: value.name }));
    }

    function changeLocale() {
        if (ApplicationUtils.changeLocale(currentLocale.value))
            ApplicationUtils.showMessage(message.updateSuccessfully, "success");
        else
            ApplicationUtils.showMessage(message.youNeedToSelectAnOptionDifferentFromTheCurrentOne, "warning");
    }

    function clearStorage() {
        ApplicationUtils.showMessageBox(
            message.clearStorageWarning.replace("%btn", message.button.ok),
            "warning",
            "OkCancel"
        ).then(() => {
            ApplicationUtils.clearStorage();
            router.replace({ name: "signIn" });
        }).catch(() => {});
    }
</script>

<style scoped>
    .frame-settings {
        width: 1200px;
        margin: 100px auto;
    }

    .frame-tab-pane {
        margin-left: 60px;
    }

    .label-title, .label-description {
        margin-bottom: 12px;
    }

    .label-title {
        font-weight: bold;
    }

    .label-description {
        color: #8b949e;
        font-size: 12px;
    }

    .item-settings {
        margin-bottom: 40px;
    }

    .item-settings:nth-last-child(1) {
        margin-bottom: 0;
    }
</style>
