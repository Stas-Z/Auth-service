<template>
    <div class="content">
        <a-card style="max-width: 400px; width: 100%">
            <my-login-form />
        </a-card>
    </div>
</template>
<script lang="ts" setup>
import MyLoginForm from '@/components/MyLoginForm.vue';
</script>
<style scoped>
.content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 64px);
    background: #e9e9e9;
}
</style>
