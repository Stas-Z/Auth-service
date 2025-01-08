<template>
    <div class="navbar">
        <my-logo @click="$router.push('/')" class="navbar__logo" />
        <div>Auth service</div>
        <div class="navbar__links" v-if="!isAuth">
            <div @click="$router.push('/auth')">Вход</div>
            <div @click="$router.push('/registration')">Регистрация</div>
        </div>
        <div class="navbar__links" v-else><div @click="logout">Выйти</div></div>
    </div>
</template>

<script lang="ts" setup>
import router from '@/router/router';
import { useStore } from '@/store';
import { computed } from 'vue';
import MyLogo from './MyLogo.vue';

const store = useStore();
const isAuth = computed(() => store.getters['auth/getIsAuth']);
const logout = () => {
    store.commit('auth/setLogout');
    router.push('/auth');
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
