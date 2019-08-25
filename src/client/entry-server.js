/**
 * 服务端js的入口文件
 */
import createApp from './entry/create-app';
import runtime from '@/lib/runtime';

export default async (context) => {
    runtime.setServerContext(context);

    const { app, router } = createApp();

    router.push(context.req.originalUrl);

    await new Promise((resolve, reject) => {
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();
            // 匹配不到的路由，执行 reject 函数，并返回 404
            if (!matchedComponents.length) {
                context.next();
                return reject(new Error('404'));
            }
            console.log(matchedComponents);
            resolve();
        }, reject);
    });
    return app;
    // await store.serverFetch();
    // context.state = store.instance.state; // 这一步将会把状态序列化到 `window.__INITIAL_STATE__`
};
