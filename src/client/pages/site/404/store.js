import Vuex from 'vuex';

export default function ({
   runtime,
}) {
   const store = new Vuex.Store({
      state: {
         originUrl: runtime.action.ctx?.originalUrl || window.location.href,
      },
      actions: {},
   });

   return store;
}
