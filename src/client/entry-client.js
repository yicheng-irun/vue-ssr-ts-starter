/**
 * 客户端js的入口文件
 */
import createApp from './entry/create-app';

const { app, router } = createApp();

let isFirst = true;
function registHooks () {
    // 注册钩子，client端跳转时 发起fetchData的请求
    router.afterEach(async (to) => {
        if (isFirst) { // 第一次的时候，不需要执行afterEach的回调
            isFirst = false;
            return;
        }
        const theMatchedComponents = router.getMatchedComponents(to);
        await Promise.all(theMatchedComponents.map(async (comps) => {
            if (comps.store) {
                if (typeof comps.store === 'function') {
                    comps.store = comps.store();
                }
                comps.$store = comps.store;
            }
            if (typeof comps.fetchData === 'function') {
                await comps.fetchData({
                    router,
                    app,
                    route: to,
                });
            }
            return comps.$store;
        }));
    });
}

async function start () {
    registHooks();
    const theMatchedComponents = await new Promise((resolve, reject) => {
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();
            resolve(matchedComponents);
        }, reject);
    });

    const stores = await Promise.all(theMatchedComponents.map(async (comps) => {
        if (comps.store) {
            if (typeof comps.store === 'function') {
                comps.store = comps.store();
            }
            comps.$store = comps.store;
        }
        return comps.$store;
    }));

    const states = window.__INITIAL_STATE__ || [];
    stores.forEach((store, index) => {
        const state = states[index];
        if (store && state) {
            store.replaceState(state);
        }
    });

    const { query: { _static } = {}} = app.$route;

    if (_static === '1') {
        theMatchedComponents.map(async (comps) => {
            if (typeof comps.fetchData === 'function') {
                await comps.fetchData({
                    router,
                    app,
                    route: app.$route,
                });
            }
        });
    }
}

start().then(() => {
    app.$mount('body>div#app');
}).catch(() => {
    app.$mount('body>div#app');
});