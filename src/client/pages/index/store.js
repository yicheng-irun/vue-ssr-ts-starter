import Vuex from 'vuex';

import { get } from '@/lib/ajax.js';
// import runtime from '@/lib/runtime.js';


export default function () {
    const store = new Vuex.Store({
        state: {
            indexData: ''
        },

        mutations: {
            setData (state, data) {
                state.indexData = data;
            },
        },

        actions: {
            async fetchData ({ commit }) {
                // 这里可以请求 后台cgi 数据
                const rsp = await get('/api/demo', { sayhi: 'hi server! -from index page' });
                const result = rsp.data;
                commit('setData', result.data);
            },
        },
    });


    return store;
}
