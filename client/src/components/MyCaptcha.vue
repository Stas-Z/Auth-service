<template>
    <div>
        <div v-if="captcha" class="captcha">
            <div style="display: flex" v-html="captcha"></div>
            <a-button
                type="primary"
                shape="circle"
                size="large"
                @click="onClickRefresh"
                :loading="isLoading"
                :class="{ green: message && !errorMessage }"
                ><template #icon>
                    <RedoOutlined v-if="!message" />
                    <CheckOutlined v-if="message" /> </template
            ></a-button>
        </div>
        <my-notice :message="message" :error-message="errorMessage" />

        <a-input-search
            v-model:value="localCaptchaInput"
            placeholder="Введите текст с картинки"
        >
            <template #enterButton>
                <a-button
                    @click="verifyCaptcha"
                    type="primary"
                    :class="{ green: message && !errorMessage }"
                    ><ArrowUpOutlined v-if="!message" />
                    <CheckOutlined v-if="message" />
                </a-button>
            </template>
        </a-input-search>
    </div>
</template>

<script lang="ts" setup>
import { useCaptcha } from '@/hooks/useCaptcha';
import { ref, watch } from 'vue';
import MyNotice from './MyNotice.vue';

defineProps<{
    captchaInput?: string;
    isValid: boolean;
}>();

const emit = defineEmits(['update:captchaInput', 'update:isValid']);
const localCaptchaInput = ref('');
const {
    captcha,
    refreshCaptcha,
    verifyCaptcha,
    isLoading,
    errorMessage,
    message,
    isCaptchaValid,
} = useCaptcha(localCaptchaInput);

watch(isCaptchaValid, () => {
    emit('update:isValid', true);
    errorMessage.value = '';
});

watch(localCaptchaInput, (newValue) => {
    emit('update:captchaInput', newValue);
});

const onClickRefresh = () => {
    refreshCaptcha();
    emit('update:isValid', false);
    message.value = '';
    errorMessage.value = '';
};
</script>
<style scoped>
.captcha {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
}
.green {
    background-color: green;
}
</style>
