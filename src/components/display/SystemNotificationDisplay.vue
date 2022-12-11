<template>
    <div class="global-frame-fillet global-vertical-margin">
        <div class="global-frame-title" v-text="lang.title"/>
    </div>
    <div class="global-frame-fillet global-vertical-margin">
        <div class="notification-title">Title</div>
        <div class="notification-description">Description.</div>
        <div class="receive-time">2022-11-28 23:24:00</div>
    </div>
</template>

<script lang="ts" setup>
    import ApplicationUtils from "@/utils/ApplicationUtils";

    const lang = ApplicationUtils.locale.display.systemNotification;
</script>

<style scoped>
    .notification-title {
        font-weight: bold;
        margin-bottom: 8px;
    }

    .notification-description {
        margin-bottom: 8px;
        color: var(--color-text-description);
    }

    .receive-time {
        color: var(--color-text-description);
        font-size: 14px;
    }
</style>
