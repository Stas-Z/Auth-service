import router from '@/router/router';
import { onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';

export function useNavbar() {
    const store = useStore();
    const isAuth = ref(false);

    const updateAuthState = () => {
        isAuth.value = store.getters['auth/getIsAuth'];
    };
    watch(
        () => store.getters['auth/getIsAuth'],
        () => {
            updateAuthState();
        },
    );
    onMounted(() => {
        updateAuthState();
    });

    const logout = () => {
        store.commit('auth/setLogout');
        updateAuthState();
        router.push('/auth');
    };
    return {
        logout,
        isAuth,
    };
}
