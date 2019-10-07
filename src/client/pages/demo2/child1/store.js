import Vuex from 'vuex';

import { get } from '@/lib/ajax.js';
// import runtime from '@/lib/runtime.js';


export default function () {
    const store = new Vuex.Store({
        state: {
            data: {

                time: '',
            },
            msg: 'child1',
        },

        mutations: {
            setData (state, data) {
                state.data = data;
            },
        },

        actions: {
            async fetchItem ({ commit }) {
                // 这里可以请求 后台cgi 数据
                const rsp = await get('/api/demo', { sayhi: 'hi server!' });
                const result = rsp.data;
                commit('setData', result.data);
            },
        },
    });


    return store;
}
