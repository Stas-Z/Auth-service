<template>
    <skeleton-page v-if="isLoading" />
    <div v-else>
        <my-navbar></my-navbar>
        <div class="app">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import MyNavbar from './components/MyNavbar.vue';
import { useInit } from './hooks/useInit';
import SkeletonPage from './pages/SkeletonPage.vue';
import { USER_LOCALSTORAGE_KEY } from './shared/consts/localstorage';
import { useStore } from './store';

const store = useStore();
const isAuth = localStorage.getItem(USER_LOCALSTORAGE_KEY);
const { initUser } = useInit();
onMounted(() => {
    isAuth && initUser();
});

const isLoading = computed(() => store.getters.isLoading);
</script>

<style></style>
