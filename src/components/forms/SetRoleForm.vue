<template>
    <el-form :model="membersTest" label-position="left" label-width="100px">
        <el-form-item label-width="0">
            <div class="formTitle">
                <span class="formRole" v-text="lang.role"/>
                <span class="formPrivileges" v-text="lang.permission"/>
            </div>
        </el-form-item>
        <div v-for="(item,index) in membersTest" :key="index">
            <el-form-item :label="item.name" prop="privileges">
                <el-checkbox v-model="item.invite" :label="lang.invite"/>
                <el-checkbox v-model="item.add" :label="lang.addMembers"/>
            </el-form-item>
        </div>
        <el-form-item label-width="0">
            <el-button style="width: 100%" type="primary" @click="submitSetPrivileges">
                <div v-text="lang.submit"/>
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
    import { reactive } from "vue";
    import ApplicationUtils from "@/utils/ApplicationUtils";

    const lang = ApplicationUtils.locale.form.setMembersRole;

    const membersTest = reactive([
        { name: lang.admin, invite: "", add: "", remove: "" },
        { name: lang.member, invite: "", add: "", remove: "" }
    ]);

    const submitSetPrivileges = () => {
        alert("submit");
    };
</script>

<style scoped>
    .formRole {
        display: inline-block;
        width: 100px;
    }
</style>
