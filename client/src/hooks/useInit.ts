import router from '@/router/router';
import { $api } from '@/shared/api/api';
import { useStore } from '@/store';
import { IUser } from '@/types/user';

export function useInit() {
    const store = useStore();

    const initUser = async () => {
        try {
            store.commit('setLoading', true);
            const response = await $api.post<IUser>('auth/refresh');

            store.commit('auth/setCurentUser', response.data);
        } catch (error: any) {
            router.push({ name: 'Login' });
            console.error('Error:', error);
        } finally {
            store.commit('setLoading', false);
        }
    };

    return {
        initUser,
    };
}
