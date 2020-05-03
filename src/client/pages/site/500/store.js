import Vuex from 'vuex';

export default function ({
   runtime,
}) {
   const store = new Vuex.Store({
      state: {
         message: runtime.action.ssrParams?.message || '出错了',
         stack: runtime.action.ssrParams?.stack || '',
      },
   });
   return store;
}
