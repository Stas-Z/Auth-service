import { $api } from '@/shared/api/api';
import { AxiosError } from 'axios';
import { onMounted, Ref, ref } from 'vue';

export function useCaptcha(captchaInput: Ref<string>) {
    const captcha = ref<string | null>(null);
    const isLoading = ref(false);
    const message = ref('');
    const errorMessage = ref('');
    const isCaptchaValid = ref(false);

    const getCaptcha = async () => {
        try {
            const response = await $api.get('captcha');

            captcha.value = response.data;
        } catch (error: any) {
            if (error instanceof AxiosError) {
                if (error.response) {
                    errorMessage.value = error.response.data.message;
                } else {
                    errorMessage.value = 'Ошибка: Сервер не отвечает';
                }
            }
        }
    };

    const verifyCaptcha = async () => {
        isLoading.value = true;

        try {
            const response = await $api.post('captcha/verify', {
                captchaInput: captchaInput.value,
            });
            message.value = 'Вы прошли капчу успешно';
            isCaptchaValid.value = true;

            response.data;
        } catch (error: any) {
            isCaptchaValid.value = false;
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

    const refreshCaptcha = () => {
        getCaptcha(); //
    };

    onMounted(() => {
        getCaptcha();
    });
    return {
        captcha,
        getCaptcha,
        refreshCaptcha,
        verifyCaptcha,
        isLoading,
        message,
        errorMessage,
        isCaptchaValid,
    };
}
