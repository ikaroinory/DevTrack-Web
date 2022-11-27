<template>
    <router-link :to="route">
        <div class="frame-project-item">
            <div class="frame-project-item-flex">
                <div style="margin-right: 20px">
                    <div class="project-item-name">{{ name }}</div>
                    <div class="project-item-description">{{ description }}</div>
                    <div class="project-item-abstract-flex">
                        <div class="project-item-creator">{{ creator }}</div>
                        <div class="project-item-creation-time">{{ lang.createdAt }} {{ creationTime }}</div>
                    </div>
                </div>
                <div>
                    <div class="project-item-progress">{{ (progress * 100).toFixed(2) + "%" }}</div>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script lang="ts" setup>
    import { reactive } from "vue";
    import ApplicationUtils from "@/utils/ApplicationUtils";

    const props = defineProps({
        uuid: { type: String, required: true },
        name: { type: String, required: true },
        description: { type: String, required: true },
        progress: { type: Number, required: true },
        creator: { type: String, required: true },
        creationTime: { type: String, required: true }
    });
    const lang = ApplicationUtils.locale.item.project;

    const route = reactive({
        name: "project",
        params: { uuid: props.uuid }
    });
</script>

<style scoped>
    .frame-project-item {
        margin: 8px;
        padding: 24px;
        border: var(--border-default);
        border-radius: var(--border-radius-item);
        background: white;
        box-shadow: var(--shadow-default);
    }

    .frame-project-item-flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .project-item-abstract-flex {
        margin-top: 16px;
        display: flex;
        align-items: center;
    }

    .project-item-creator {
        margin-right: 8px;
        color: var(--color-text-remark);
        font-size: 14px;
    }

    .project-item-creation-time {
        color: var(--color-text-remark);
        font-size: 14px;
    }

    .project-item-name {
        margin-bottom: 8px;
        color: black;
        font-weight: bold;
    }

    .project-item-description {
        color: var(--color-text-description);
    }

    .project-item-progress {
        color: var(--color-text-remark);
    }
</style>
