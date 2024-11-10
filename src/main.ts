import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './style/index.scss';

import PageLayout from '@/components/layouts/PageLayout.vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

const app = createApp(App);
app.component('PageLayout', PageLayout);
app.use(store);
app.use(router);
app.use(Antd);
app.use(Antd);
app.mount('#app');
