import Vuex from 'vuex';
import runtime from '../../../lib/runtime';

export default function () {
   const store = new Vuex.Store({
      state: {
         message: runtime.action.ssrParams?.message || '出错了',
         stack: runtime.action.ssrParams?.stack || '',
      },
   });
   return store;
}
