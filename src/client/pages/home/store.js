import Vuex from 'vuex';

import { get } from '../../lib/ajax';

export default function () {
    const store = new Vuex.Store({
        state: {
            sayHi: '',
        },

        mutations: {
            setData (state, { sayHi }) {
                state.sayHi = sayHi;
            },
        },

        actions: {
            async fetchData ({ commit }) {
                // 这里可以请求 后台cgi 数据
                const rsp = await get('/api/demo', { sayHi: 'hi server! -from index page' });
                const result = rsp.data;
                commit('setData', result.data);
            },
        },
    });

    return store;
}
