import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import App from './app.vue';
import createRouter from './create-router';
import '../comps/layout.styl';


export default function createApp () {
    const router = createRouter();
    const app = new Vue({
        router,
        render: h => h(App),
    });
    return { app, router };
}
