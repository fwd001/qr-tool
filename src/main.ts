import { createApp } from 'vue';
import { router } from '@/router/index';
import { store } from '@/store';
import App from './App.vue';
import antd from '@/common/antdv';
import mitt from '@/common/event-bus';
import '@/assets/js/extension.d';
import '@/assets/js/polyfill';

import '@/assets/css/public.less';
import '@/assets/css/common.less';

const app = createApp(App);

app.use(router);
app.use(store);
app.use(antd);
app.use(mitt);

app.mount('#app');

declare global {
  interface Array<T> {
    at(params: number): T;
  }
  interface Navigator {
    getUserMedia: any;
    webkitGetUserMedia: any;
    mozGetUserMedia: any;
    msGetUserMedia: any;
  }
}
