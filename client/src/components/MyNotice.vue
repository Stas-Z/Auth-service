<template>
    <div>
        <a-typography-text type="success" v-if="message && !isRegistration">{{
            message
        }}</a-typography-text>
        <a-typography-link v-else-if="message && isRegistration">
            {{ message }}
        </a-typography-link>
        <a-typography-text v-else-if="errorMessage && !message" type="danger">{{
            errorMessage
        }}</a-typography-text>
    </div>
</template>

<script lang="ts" setup>
withDefaults(
    defineProps<{
        isRegistration?: boolean;
        message?: string;
        errorMessage?: string;
    }>(),
    {
        isRegistration: false,
    },
);
</script>

<style scoped></style>
