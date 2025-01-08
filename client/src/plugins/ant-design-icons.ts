import * as Icons from '@ant-design/icons-vue';
import { App } from 'vue';

export default function registerIcons(app: App) {
    Object.keys(Icons).forEach((key) => {
        app.component(key, (Icons as any)[key]);
    });
}
