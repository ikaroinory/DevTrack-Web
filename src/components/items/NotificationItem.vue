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
            <div style="margin-left: 20px">
                <div style="color: var(--color-text-description)">{{ time }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
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
        flex-wrap: wrap;
    }

    .vertical-margin {
        margin-bottom: 16px;
    }

    .vertical-margin:nth-last-child(1) {
        margin-bottom: 0;
    }
</style>
