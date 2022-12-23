<template>
    <div class="global-frame-fillet">
        <div class="global-frame-title" v-text="lang.title"/>
    </div>

    <div v-if="list.length !== 0">
        <NotificationItem v-for="item in list"
                          :uuid="item.uuid"
                          :title="item.title"
                          :description="item.context"
                          :time="item.time"
                          :type="item.type === NotificationType.projectInvitation ? 'invitation' : 'text'"
                          :project-uuid="item.paramUUID"
                          :handling-time="item.handlingTime"
        />
    </div>
    <div v-else>
        <el-empty :description="message.notificationNotFound"/>
    </div>
</template>

<script lang="ts" setup>
    import ApplicationUtils from "@/utils/ApplicationUtils";
    import RequestUtils from "@/utils/RequestUtils";
    import StatusCode from "@/utils/enums/StatusCode";
    import { ref } from "vue";
    import NotificationDTO from "@/utils/dto/NotificationDTO";
    import NotificationItem from "@/components/items/NotificationItem.vue";
    import NotificationType from "@/utils/enums/NotificationType";

    const lang = ApplicationUtils.locale.display.notifications;
    const message = ApplicationUtils.locale.message;

    const list = ref<Array<NotificationDTO>>([]);

    init();

    function init() {
        RequestUtils.getNotifications().then(resp => {
            if (resp.statusCode !== StatusCode.success) return;

            list.value = resp.responseData;
            console.log(list.value);
        });
    }
</script>
