import AuthPage from '@/pages/AuthPage.vue';
import MainPage from '@/pages/MainPage.vue';
import RegPage from '@/pages/RegPage.vue';
import { USER_LOCALSTORAGE_KEY } from '@/shared/consts/localstorage';
import store from '@/store';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: MainPage,
        name: 'MainPage',
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/auth',
        name: 'Login',
        component: AuthPage,
    },
    {
        path: '/registration',
        name: 'Registration',
        component: RegPage,
    },
];

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL),
});

router.beforeEach((to, from, next) => {
    const isAuthenticated =
        store.getters['auth/getIsAuth'] ||
        localStorage.getItem(USER_LOCALSTORAGE_KEY);

    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ name: 'Login' });
    } else {
        next();
    }
});

export default router;
