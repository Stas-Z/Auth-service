import { routes } from '@/router/routeConfig';
import { AppRoutes } from '@/shared/consts/router';
import store from '@/store';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL),
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters['auth/getIsAuth'];
    const isLoading = store.state.isLoading;

    if (isLoading) {
        return next();
    }

    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ name: AppRoutes.AUTH_PAGE });
    } else {
        next();
    }
});

export default router;
