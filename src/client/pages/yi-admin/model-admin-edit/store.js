import Vuex from 'vuex';

import { get } from '../../../lib/ajax';

export default function () {
   const store = new Vuex.Store({
      state: {
         sayHi: '',
         editId: '',
         editFormFields: [],
         editFormData: {},
      },

      mutations: {
         setEditFormFields (state, { data }) {
            state.editFormFields = data;
         },
         setData (state, { sayHi }) {
            state.sayHi = sayHi;
         },
      },

      actions: {
         async fetchEditFormFields () {
            const rsp = await get('fields/', { });
            const result = rsp.data;
            await this.commit('setEditFormFields', result);
         },

         async fetchData ({ commit }) {
            // 这里可以请求 后台cgi 数据
            const rsp = await get('/api/demo', { sayHi: 'hi server! -from index page' });
            const result = rsp.data;
            commit('setData', result.data);
         },
      },
   });

   return store;
}
