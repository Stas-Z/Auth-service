<template>
    <h2 class="title">
        {{ isRegistration ? 'Регистрация' : 'Авторизация' }}
    </h2>
    <my-notice
        class="notice"
        :message="message"
        :error-message="errorMessage"
        :is-registration="isRegistration"
    />
    <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @submit.prevent="handleSubmitOrRegistration"
        ref="formRef"
    >
        <a-form-item
            label="Email"
            name="email"
            :rules="[
                {
                    required: true,
                    message: 'Пожалуйста введите email!',
                },
            ]"
        >
            <a-input v-focus v-model:value="formState.email" />
        </a-form-item>

        <a-form-item
            label="Пароль"
            name="password"
            :rules="[
                {
                    required: true,
                    message: 'Пожалуйста введите пароль',
                },
            ]"
        >
            <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <my-captcha
                v-model:is-valid="isCaptchaValid"
                v-model:captcha-input="formState.captchaInput"
            />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button :loading="isLoading" type="primary" html-type="submit">{{
                isRegistration ? 'Зарегистрировать' : 'Войти'
            }}</a-button>
        </a-form-item>
    </a-form>
</template>

<script lang="ts" setup>
import { useSubmit } from '@/hooks/useSubmit';
import { IUser } from '@/types/user';
import { ref, watch } from 'vue';
import MyCaptcha from './MyCaptcha.vue';
import MyNotice from './MyNotice.vue';

const formRef = ref();
const props = defineProps<{
    isRegistration?: boolean;
}>();
const isCaptchaValid = ref(false);

const formState = ref<IUser>({
    email: '',
    password: '',
    captchaInput: '',
});

const { handleSubmit, isLoading, handleRegistration, errorMessage, message } =
    useSubmit(formState);

const handleSubmitOrRegistration = () => {
    if (!isCaptchaValid.value) {
        errorMessage.value = 'Пожалуйста, пройдите капчу!';
        return;
    }
    if (props.isRegistration) {
        handleRegistration();
    } else {
        handleSubmit();
    }
};
watch(isCaptchaValid, () => {
    errorMessage.value = '';
});
</script>

<style scoped>
.title,
.notice {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}
</style>
