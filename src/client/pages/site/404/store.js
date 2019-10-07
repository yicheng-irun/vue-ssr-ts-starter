import Vuex from 'vuex';
import runtime from './../../../lib/runtime';

export default function () {
    const store = new Vuex.Store({
        state: {
            originUrl: runtime.action.req.originalUrl,
        },
        actions: {},
    });

    return {
        async serverFetch () { // 服务端 拉取数据
            // runtime.action.next();
            // return store.dispatch('fetchItem');
        },
        async clientFetch () { // 客户端 拉取数据
            if (window.__INITIAL_STATE__) {
                store.replaceState(window.__INITIAL_STATE__);
            }
        },
        instance: store,
    };
}
