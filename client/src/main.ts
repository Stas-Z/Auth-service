import App from '@/App.vue';
import derectives from '@/directives';
import router from '@/router/router';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import { createApp } from 'vue';
import registerIcons from './plugins/ant-design-icons';
import store from './store';

const app = createApp(App);

derectives.forEach((derective) => {
    app.directive(derective.name, derective);
});

registerIcons(app);

app.use(store);
app.use(Antd);
app.use(router);
app.mount('#app');
