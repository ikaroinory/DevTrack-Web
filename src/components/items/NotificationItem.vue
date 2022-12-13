<template>
    <div class="global-frame-fillet">
        <div class="notification-flex">
            <div>
                <div class="vertical-margin" style="font-weight: bold">{{ title }}</div>
                <div class="vertical-margin" style="color: var(--color-text-description)">{{ description }}</div>

                <div v-if="type === 'invitation'">
                    <el-button type="primary" @click="acceptHandler" :disabled="typeof handlingTime === 'string'">{{ button.accept }}</el-button>
                    <el-button @click="ignoreHandler" :disabled="typeof handlingTime === 'string'">{{ button.ignore }}</el-button>
                </div>
                <div v-else-if="type === 'link' && link">
                    <a :href="link">{{ linkText ?? link }}</a>
                </div>
            </div>
            <div class="time-and-function-zone">
                <div class="time">{{ time }}</div>
                <div class="function-button-group">
                    <el-tooltip placement="bottom" :hide-after="0" :content="button.delete">
                        <el-button type="danger" :icon="Delete" circle @click="deleteNotification"/>
                    </el-tooltip>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { Delete } from "@element-plus/icons-vue";
    import ApplicationUtils from "@/utils/ApplicationUtils";
    import RequestUtils from "@/utils/RequestUtils";
    import StatusCode from "@/utils/enums/StatusCode";
    import router from "@/plugins/VueRouter";
    import { inject } from "vue";

    const props = defineProps<{
        uuid: string,
        title: string,
        description: string,
        time: string,
        type?: "text" | "invitation" | "link",
        link?: string,
        linkText?: string,
        projectUuid?: string,
        handlingTime: string | null
    }>();

    const reload: Function = inject("reload")!;

    const message = ApplicationUtils.locale.message;
    const button = ApplicationUtils.locale.message.button;

    function acceptHandler() {
        RequestUtils.acceptInvitation(props.uuid, <string>props.projectUuid).then(resp => {
            if (resp !== StatusCode.success) return;

            ApplicationUtils.showMessage(message.joinSuccessfully, "success");
            router.push({ name: "projectOverview", params: { uuid: props.projectUuid } });
        });
    }

    function ignoreHandler() {
        RequestUtils.ignoreInvitation(props.uuid).then(resp => {
            if (resp !== StatusCode.success) return;

            ApplicationUtils.showMessage(message.ignoreSuccessfully, "success");

            reload();
        });
    }

    function deleteNotification() {
        RequestUtils.deleteNotification(props.uuid).then(resp => {
            if (resp !== StatusCode.success) return;

            ApplicationUtils.showMessage(message.deleteSuccessfully, "success");

            reload();
        });
    }
</script>

<style scoped>
    .notification-flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .vertical-margin {
        margin-bottom: 16px;
    }

    .vertical-margin:nth-last-child(1) {
        margin-bottom: 0;
    }

    .time-and-function-zone {
        margin-left: 20px;
    }

    .time {
        color: var(--color-text-description);
    }

    .time-and-function-zone:hover .function-button-group {
        display: block;
    }

    .time-and-function-zone:hover .time {
        display: none;
    }

    .function-button-group {
        display: none;
    }
</style>
