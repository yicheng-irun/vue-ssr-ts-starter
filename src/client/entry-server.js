/**
 * 服务端js的入口文件
 */
import createApp from './entry/create-app';
import runtime from '@/lib/runtime';

export default async (context) => {
    runtime.setServerContext(context);

    const { app, router } = createApp();

    router.push(context.req.originalUrl);

    const theMatchedComponents = await new Promise((resolve, reject) => {
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();
            if (!matchedComponents.length) {
                context.next();
                return reject(new Error('404'));
            }
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
        if (typeof comps.fetchData === 'function' && app.$route.query._static !== '1') {
            await comps.fetchData({
                router,
                app,
                req: context.req,
                res: context.res,
            });
        }
        return comps.$store;
    }));

    const states = [];
    stores.forEach((item) => {
        if (item) {
            states.push(item.state);
        } else {
            states.push(null);
        }
    });

    context.state = states; // 这一步将会把状态序列化到 `window.__INITIAL_STATE__`
    
    return app;
};
