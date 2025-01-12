import router from '@/router/router';
import { $api } from '@/shared/api/api';
import { AppRoutes } from '@/shared/consts/router';
import { useStore } from '@/store';
import { IUser } from '@/types/user';
import { AxiosError } from 'axios';
import { Ref, ref } from 'vue';

export function useSubmit(formState: Ref<IUser>) {
    const store = useStore();
    const isLoading = ref(false);
    const message = ref('');
    const errorMessage = ref('');

    const handleSubmit = async () => {
        try {
            isLoading.value = true;
            const response = await $api.post<IUser>(
                'auth/login',
                formState.value,
            );
            message.value = 'Авторизация прошла успешно';
            store.commit('auth/setCurentUser', response.data);

            setTimeout(() => {
                router.push({ name: AppRoutes.MAIN_PAGE });
            }, 1000);
        } catch (error: any) {
            if (error instanceof AxiosError) {
                if (error.response) {
                    errorMessage.value = error.response.data.message;
                } else {
                    errorMessage.value = 'Ошибка: Сервер не отвечает';
                }
            }
            console.error('Error:', error);
        } finally {
            isLoading.value = false;
        }
    };

    const handleRegistration = async () => {
        try {
            isLoading.value = true;

            const response = await $api.post<IUser>('users', formState.value);

            message.value = 'Регистрация прошла успешно';

            store.commit('auth/setCurentUser', response.data);

            setTimeout(() => {
                router.push({ name: AppRoutes.MAIN_PAGE });
            }, 1500);
        } catch (error: any) {
            if (error instanceof AxiosError) {
                if (error.response) {
                    errorMessage.value = error.response.data.message;
                } else {
                    errorMessage.value = 'Ошибка: Сервер не отвечает';
                }
            }
        } finally {
            isLoading.value = false;
        }
    };

    return {
        handleSubmit,
        handleRegistration,
        isLoading,
        errorMessage,
        message,
    };
}
