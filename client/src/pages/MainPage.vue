<template>
    <a-result status="success" title="Вы успешно авторизовались!">
        <template #extra>
            <a-button danger @click="logout">Выйти</a-button>
        </template>
    </a-result>
</template>

<script lang="ts" setup>
import router from '@/router/router';
import { useStore } from '@/store';

const store = useStore();
const logout = () => {
    store.commit('auth/setLogout');
    router.push('/auth');
};
</script>

<style scoped></style>
