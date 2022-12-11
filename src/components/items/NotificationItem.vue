<template>
    <div class="global-frame-fillet">
        <div class="notification-flex">
            <div>
                <div class="vertical-margin" style="font-weight: bold">{{ title }}</div>
                <div class="vertical-margin" style="color: var(--color-text-description)">{{ description }}</div>

                <div v-if="type === 'invitation'">
                    <el-button type="primary">{{ button.accept }}</el-button>
                    <el-button>{{ button.ignore }}</el-button>
                </div>
                <div v-else-if="type === 'link' && link">
                    <a :href="link">{{ linkText ?? link }}</a>
                </div>
            </div>
            <div class="time-and-function-zone">
                <div class="time">{{ time }}</div>
                <div class="function-button-group">
                    <el-tooltip placement="bottom" :hide-after="0" :content="button.delete">
                        <el-button type="danger" :icon="Delete" circle @click="readHandler"/>
                    </el-tooltip>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { Delete } from "@element-plus/icons-vue";
    import ApplicationUtils from "@/utils/ApplicationUtils";

    const props = defineProps<{
        title: string,
        description: string,
        time: string,
        type?: "text" | "invitation" | "link",
        link?: string,
        linkText?: string,
        readHandler?: Function
    }>();

    const button = ApplicationUtils.locale.message.button;
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
