import App from '@/App.vue';
import derectives from '@/directives';
import router from '@/router/router';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import { createApp } from 'vue';
import store from './store';

const app = createApp(App);

derectives.forEach((derective) => {
    app.directive(derective.name, derective);
});
app.use(store);
app.use(Antd);
app.use(router);
app.mount('#app');
