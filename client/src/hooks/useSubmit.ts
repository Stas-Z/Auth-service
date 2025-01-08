import router from '@/router/router';
import { $api } from '@/shared/api/api';
import { USER_LOCALSTORAGE_KEY } from '@/shared/consts/localstorage';
import { useStore } from '@/store';
import { IUser } from '@/types/user';
import { AxiosError } from 'axios';
import { onMounted, Ref, ref } from 'vue';

export function useSubmit(
    formState: Ref<IUser>,
    initUser: () => Promise<void>,
) {
    const store = useStore();
    const isLoading = ref(false);
    const message = ref('');
    const errorMessage = ref('');
    const isAuth = localStorage.getItem(USER_LOCALSTORAGE_KEY);

    const handleSubmit = async () => {
        try {
            isLoading.value = true;
            const response = await $api.post<IUser>(
                'auth/login',
                formState.value,
                {
                    withCredentials: true,
                },
            );
            message.value = 'Авторизация прошла успешно';
            store.commit('auth/setCurentUser', response.data);

            initUser();

            setTimeout(() => {
                router.push({ name: 'MainPage' });
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
            const response = await $api.post<IUser>('users', formState.value, {
                withCredentials: true,
            });
            message.value = 'Регистрация прошла успешно';
            store.commit('auth/setCurentUser', response.data);
            initUser();
            setTimeout(() => {
                router.push({ name: 'MainPage' });
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
    onMounted(() => {
        isAuth && initUser();
    });
    return {
        handleSubmit,
        handleRegistration,
        isLoading,
        errorMessage,
        message,
    };
}
