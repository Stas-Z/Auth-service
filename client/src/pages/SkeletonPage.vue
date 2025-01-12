<template>
    <div>
        <my-skeleton />
        <div class="spinner">
            <a-spin size="large" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import MySkeleton from '@/components/MySkeleton.vue';
</script>

<style scoped>
.spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 64px);
}
</style>
