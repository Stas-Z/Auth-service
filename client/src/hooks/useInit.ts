import { $api } from '@/shared/api/api';
import { useStore } from '@/store';
import { IUser } from '@/types/user';
import { ref } from 'vue';

export function useInit() {
    const store = useStore();
    const isLoading = ref(false);

    const initUser = async () => {
        try {
            const response = await $api.post<IUser>(
                'auth',
                {},
                {
                    withCredentials: true,
                },
            );

            store.commit('auth/setCurentUser', response.data);
        } catch (error: any) {
            console.error('Error:', error);
        } finally {
            isLoading.value = false;
        }
    };

    return {
        isLoading,
        initUser,
    };
}
