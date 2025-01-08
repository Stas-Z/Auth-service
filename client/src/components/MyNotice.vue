<template>
    <div>
        <a-typography-text
            type="success"
            v-if="message && !isRegistration && !errorMessage"
            >{{ message }}</a-typography-text
        >
        <a-typography-link v-if="message && isRegistration && !errorMessage">
            {{ message }}
        </a-typography-link>
        <a-typography-text v-if="errorMessage" type="danger">{{
            errorMessage
        }}</a-typography-text>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    isRegistration?: boolean;
    message?: string;
    errorMessage?: string;
}>();
</script>

<style scoped></style>
