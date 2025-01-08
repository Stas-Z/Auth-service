<template>
    <h2 class="title">
        {{ isRegistration ? 'Регистрация' : 'Авторизация' }}
    </h2>
    <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
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
            <my-notice
                :message="message"
                :error-message="errorMessage"
                :is-registration="isRegistration"
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
import { useInit } from '@/hooks/useInit';
import { useSubmit } from '@/hooks/useSubmit';
import { IUser } from '@/types/user';
import { ref } from 'vue';
import MyNotice from './MyNotice.vue';

const formRef = ref();
const props = defineProps<{
    isRegistration?: boolean;
}>();

const formState = ref<IUser>({
    email: '',
    password: '',
});

const { initUser } = useInit();

const onFinish = () => {
    props.isRegistration
        ? (message.value = 'Регистрация...')
        : (message.value = 'Авторизация...');
};

const { handleSubmit, isLoading, handleRegistration, errorMessage, message } =
    useSubmit(formState, initUser);
const handleSubmitOrRegistration = () => {
    if (props.isRegistration) {
        handleRegistration();
    } else {
        handleSubmit();
    }
};
</script>

<style scoped>
.title {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}
</style>
