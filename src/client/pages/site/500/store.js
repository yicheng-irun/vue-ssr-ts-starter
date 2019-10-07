import Vuex from 'vuex';

// import { get } from '@/lib/ajax.js';
// import runtime from '@/lib/runtime.js';
import runtime from './../../../lib/runtime';

export default function () {
    const store = new Vuex.Store({
        state: {
            message: runtime.action.params.message || '服务器发生了位置错误',
            stack: runtime.action.params.stack || '',
        },
    });

    return {
        async serverFetch () { // 服务端 拉取数据
        },
        async clientFetch () { // 客户端 拉取数据
            if (window.__INITIAL_STATE__) {
                store.replaceState(window.__INITIAL_STATE__);
                return;
            }
        },
        instance: store,
    };
}
