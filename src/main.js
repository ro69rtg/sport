import './assets/app.scss';
import Unauthorized from '@/layouts/Unauthorized.vue';
import { createApp } from 'vue';
import VueCookies from 'vue-cookies';
import { createPinia } from 'pinia';
import VueTheMask from 'vue-the-mask';

import App from './App.vue';
import router from './router';

import clickOutside from '@/plugins/clickOutside.js';

const app = createApp(App);

app.component('Unauthorized', Unauthorized);
app.use(VueTheMask);
app.use(createPinia());
app.use(VueCookies);
app.use(router);
app.directive('click-outside', clickOutside);

app.mount('#app');
