/**
 * 客户端js的入口文件
 */
import Vue from 'vue';
import runtime from './lib/runtime';
import createApp from './get-app';

async function start () {
   const App = await createApp();
   let store = null;
   if (typeof App.createStore === 'function') {
      store = App.createStore();
   }

   const app = new Vue({
      store,
      render: (h) => h(App),
   });

   // eslint-disable-next-line no-underscore-dangle
   const state = window.__INITIAL_STATE__ || null;
   if (store && state) {
      store.replaceState(state);
   }

   const { query: { _static } = {} } = runtime;
   if (_static === '1' && typeof App.fetchData === 'function') {
      await App.fetchData({
         app,
         store,
         runtime,
      });
   }
   // 挂在在body下的第一个div
   app.$mount('body>div');
   return app;
}

start().catch((e) => {
   console.error(e);
});
