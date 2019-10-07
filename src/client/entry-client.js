/**
 * 客户端js的入口文件
 */
import createApp from './entry/create-app';

const { app, router } = createApp();
window.aapp = app;
window.arouter = router;
router.onReady(() => {
    console.log(router.getMatchedComponents());
    window.ttt = router.getMatchedComponents();
    app.$mount('body>div#app');
});
