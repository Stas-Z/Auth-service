import AuthPage from '@/pages/AuthPage.vue';
import MainPage from '@/pages/MainPage.vue';
import RegPage from '@/pages/RegPage.vue';
import {
    AppRoutes,
    getRouteAuth,
    getRouteMain,
    getRouteReg,
} from '@/shared/consts/router';
import { RouteRecordRaw } from 'vue-router';

export const routeConfig: Record<AppRoutes, RouteRecordRaw> = {
    [AppRoutes.MAIN_PAGE]: {
        path: getRouteMain(),
        name: AppRoutes.MAIN_PAGE,
        component: MainPage,
        meta: {
            requiresAuth: true,
        },
    },
    [AppRoutes.AUTH_PAGE]: {
        path: getRouteAuth(),
        name: AppRoutes.AUTH_PAGE,
        component: AuthPage,
    },
    [AppRoutes.REG_PAGE]: {
        path: getRouteReg(),
        name: AppRoutes.REG_PAGE,
        component: RegPage,
    },
};

export const routes = Object.values(routeConfig);
