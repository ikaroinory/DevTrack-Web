<template>
    <div v-if="router">
        <router-link :to="route">
            <div style="display: flex; align-items: center; color: black">
                <el-avatar style="margin-right: 8px" :size="36" :src="avatarSrc"/>
                <div v-text="displayLabel"/>
            </div>
        </router-link>
    </div>
    <div v-else>
        <div style="display: flex; align-items: center; color: black">
            <el-avatar style="margin-right: 8px" :size="36" :src="avatarSrc"/>
            <div v-text="displayLabel"/>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { computed, reactive } from "vue";

    const props = defineProps({
        username: String,
        avatar: String,
        nickname: String,
        router: { type: Boolean, default: false }
    });

    const usernameRef = computed(() => props.username || "null");
    const route = reactive({
        name: "profile",
        params: {
            username: computed(() => usernameRef.value || "undefined")
        }
    });
    const avatarSrc = computed(() => props.avatar === undefined ? "" : "data:image/jpeg;base64," + props.avatar);
    const displayLabel = computed(() => props.nickname + "(" + props.username + ")");
</script>
