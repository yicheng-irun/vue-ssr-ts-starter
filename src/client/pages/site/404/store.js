import Vuex from 'vuex';
import runtime from '../../../lib/runtime';

export default function () {
    const store = new Vuex.Store({
        state: {
            originUrl: runtime.action.ctx?.originalUrl || window.location.href,
        },
        actions: {},
    });

    return store;
}
