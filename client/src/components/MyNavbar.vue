<template>
    <div class="navbar">
        <my-logo
            @click="$router.push({ name: AppRoutes.MAIN_PAGE })"
            class="navbar__logo"
        />
        <div>Auth service</div>
        <div v-if="!isAuth" class="navbar__links">
            <div @click="$router.push({ name: AppRoutes.AUTH_PAGE })">Вход</div>
            <div @click="$router.push({ name: AppRoutes.REG_PAGE })">
                Регистрация
            </div>
        </div>
        <div v-else class="navbar__links"><div @click="logout">Выйти</div></div>
    </div>
</template>

<script lang="ts" setup>
import router from '@/router/router';
import { AppRoutes } from '@/shared/consts/router';
import { useStore } from '@/store';
import { computed } from 'vue';
import MyLogo from './MyLogo.vue';

const store = useStore();
const isAuth = computed(() => store.getters['auth/getIsAuth']);

const logout = () => {
    store.commit('auth/setLogout');
    router.push({ name: AppRoutes.AUTH_PAGE });
};
</script>

<style scoped>
.navbar {
    height: 64px;
    background: #001529;
    box-shadow: 2px 2px 4px gray;
    display: flex;
    align-items: center;
    color: rgba(255, 255, 255, 0.65);
    font-weight: bold;
    padding: 0 20px;
    gap: 10px;
    font-size: 20px;
}
.navbar__logo {
    width: 35px;
    cursor: pointer;
}
.navbar__links {
    margin-left: auto;
    display: flex;
    gap: 15px;
    font-size: 16px;
    cursor: pointer;
}
</style>
