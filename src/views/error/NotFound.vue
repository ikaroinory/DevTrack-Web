<template>
    <el-empty :description="lang.description"/>
</template>

<script lang="ts" setup>
    import ApplicationUtils from "@/utils/ApplicationUtils";

    const lang = ApplicationUtils.locale.view.notFound;

    init();

    function init() {
        ApplicationUtils.setTitle(lang.title);
    }
</script>
