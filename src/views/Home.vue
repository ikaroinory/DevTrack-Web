<template>
    <div>
        <div class="header-bar">
            <div class="header-bar-flex">
                <img style="width: 150px; margin-bottom: 2px"
                     src="../assets/logo/logo_long.svg"
                     alt=""
                />
                <div style="display: flex">
                    <div v-if="LocalStorageUtils.getUsernameFromToken() === ''">
                        <el-link style="margin-right: 20px" href="/signIn" :underline="false">
                            <div v-text="lang.signIn"/>
                        </el-link>
                        <el-button type="primary" @click="signUp">
                            <div v-text="lang.signUp"/>
                        </el-button>
                    </div>
                    <el-avatar v-else :size="32" :src="avatar" @click="goToProfile"/>
                </div>
            </div>
        </div>

        <div class="block-header">
            <div class="block-header-slogan">
                <div style="display: flex; justify-content: flex-end">
                    <div>
                        <h1 v-text="lang.slogan"/>
                        <div v-text="lang.faceTo"/>
                        <div style="margin-top: 50px">
                            <el-button style="width: 40%" type="primary" size="large" @click="signUp">
                                <div v-text="lang.joinNow"/>
                            </el-button>
                            <el-button style="width: 40%" type="primary" size="large" @click="signIn" plain>
                                <div v-text="lang.clickToSignIn"/>
                            </el-button>
                        </div>
                    </div>
                </div>
            </div>
            <img style="width: 700px; padding-right: 100px"
                 src="../assets/illustrations/ExperienceDesign.png"
                 alt=""
            />
        </div>

        <div class="block-features">
            <div class="block-part">
                <img style="width: 600px"
                     src="../assets/illustrations/EngineeringTeam.png"
                     alt=""
                />
                <div class="block-slogan">
                    <h2 v-text="lang.title1"/>
                    <div>
                        <span v-text="lang.description1_1"/><br/>
                        <span v-text="lang.description1_2"/>
                    </div>
                </div>
            </div>

            <div class="block-part">
                <div class="block-slogan">
                    <h2 v-text="lang.title2"/>
                    <div>
                        <span v-text="lang.description2_1"/><br/>
                        <span v-text="lang.description2_2"/>
                    </div>
                </div>
                <img style="width: 420px"
                     src="../assets/illustrations/TeamUp.png"
                     alt=""
                />
            </div>

            <div class="block-part">
                <img style="width: 400px"
                     src="../assets/illustrations/Projections.png"
                     alt=""
                />
                <div class="block-slogan">
                    <h2 v-text="lang.title3"/>
                    <div>
                        <span v-text="lang.description3_1"/><br/>
                        <span v-text="lang.description3_2"/><br/>
                        <span v-text="lang.description3_3"/>
                    </div>
                </div>
            </div>

            <div class="block-part">
                <div class="block-slogan">
                    <h2 v-text="lang.title4"/>
                    <div>
                        <span v-text="lang.description4_1"/><br/>
                        <span v-text="lang.description4_2"/>
                    </div>
                </div>
                <img style="width: 400px"
                     src="../assets/illustrations/HappyNews.png"
                     alt=""
                />
            </div>
        </div>

        <div class="block-join-now">
            <img style="width: 450px" src="../assets/illustrations/Cat.png" alt=""/>
            <div class="block-join-now-slogan">
                <h2 v-text="lang.joinDevTrackNow"/>
                <div>
                    <el-button type="primary" @click="signUp">
                        <div v-text="lang.joinNow"/>
                    </el-button>
                </div>
            </div>
        </div>
    </div>
    <div class="block-footer">
        <div class="block-footer-flex">
            <div>
                <div>
                    <div style="display: flex;align-items: center">
                        <div style="width: 150px; margin-right: 20px"
                             v-text="lang.thanks"
                        />
                        <div class="label-contributor" v-text="lang.guanyuHu"/>
                        <div class="label-contributor" v-text="lang.zhipengYang"/>
                        <div class="label-contributor" v-text="lang.xiaotongWu"/>
                    </div>
                    <div style="display: flex;align-items: center">
                        <div style="width: 150px; margin-right: 20px"
                             v-text="lang.specialThanks"
                        />
                        <div class="label-contributor" v-text="lang.xinranWang"/>
                    </div>
                </div>
                <div style="display: flex;align-items: center;margin-top: 20px">
                    <img style="width: 150px; margin-right: 20px"
                         src="../assets/logo/logo_long.svg"
                         alt=""
                    />
                    <a style="color: #73777a;margin-right: 20px" href="/signUp" v-text="lang.quickSignUp"/>
                    <a style="color: #73777a;margin-right: 20px" href="/signIn" v-text="lang.signInNow"/>
                </div>
                <div style="margin-top: 20px;font-size: 14px" v-text="lang.copyright"/>
            </div>
        </div>
    </div>

    <el-tooltip content="回到顶部">
        <el-backtop :right="100" :bottom="100"/>
    </el-tooltip>
</template>

<script lang="ts" setup>
    import { ref } from "vue";
    import router from "@/plugins/VueRouter";
    import SessionStorageUtils from "@/utils/SessionStorageUtils";
    import ApplicationUtils from "@/utils/ApplicationUtils";
    import LocalStorageUtils from "@/utils/LocalStorageUtils";

    const lang = ApplicationUtils.locale.view.home;

    const avatar = ref(SessionStorageUtils.getUserAvatar());

    init();

    function init() {
        ApplicationUtils.setTitle();
    }

    function signUp() {
        router.push({ name: "signUp" });
    }

    function signIn() {
        router.push({ name: "signIn" });
    }

    function goToProfile() {
        router.push({ name: "profile", params: { username: LocalStorageUtils.getUsernameFromToken() } });
    }
</script>

<style scoped>
    .header-bar {
        width: 100%;
        background-color: white;
        position: fixed;
        border-bottom: 1px solid #dcdfe6;
    }

    .header-bar-flex {
        margin: 0 auto;
        display: flex;
        width: 1280px;
        text-align: left;
        justify-content: space-between;
        align-items: center;
    }

    .block-header {
        display: flex;
        background-color: #f6f6f6;
        justify-content: center;
        align-items: center;
    }

    .block-features {
        margin: 0 auto;
        width: 1280px;
    }

    .block-join-now, .block-part {
        display: flex;
        height: 520px;
        justify-content: center;
        align-items: center;
    }

    .block-join-now {
        display: flex;
        height: 300px;
        background-color: #f6f6f6;
        justify-content: center;
        align-items: center;
    }

    .block-header-slogan {
        width: 700px;
        text-align: left;
    }

    .block-slogan {
        text-align: left;
    }

    .block-join-now-slogan {
        text-align: center;
    }

    .block-footer {
        padding: 80px 0;
        background-color: #252525;
        color: #73777a;
        text-align: left;
    }

    .block-footer-flex {
        display: flex;
        width: 1280px;
        margin: 0 auto;
    }

    .label-contributor {
        width: 300px;
        margin-right: 20px
    }

    .label-contributor:nth-last-child(1) {
        margin-right: 0;
    }
</style>
