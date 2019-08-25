/**
 * 客户端js的入口文件
 */
import createApp from './entry/create-app';

const { app } = createApp();
window.aapp = app;
app.$mount('body>div#app');
