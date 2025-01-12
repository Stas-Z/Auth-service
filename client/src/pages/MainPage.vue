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
import { AppRoutes } from '../shared/consts/router';

const store = useStore();
const logout = () => {
    store.commit('auth/setLogout');
    router.push({ name: AppRoutes.AUTH_PAGE });
};
</script>

<style scoped></style>
