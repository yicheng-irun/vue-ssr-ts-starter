import Vuex from 'vuex';

import { get } from '../../../lib/ajax';

export default function () {
   const store = new Vuex.Store({
      state: {
         loading: false,
         listFields: [],
         listData: [],
         pageIndex: 1,
         pageSize: 20,
         total: 0,
      },

      mutations: {
         setLoading (state, value) {
            state.loading = !!value;
         },
         setListFields (state, { data }) {
            state.listFields = data;
         },
         setListData (state, { data }) {
            state.listData = data;
         },
      },

      actions: {
         async fetchListFields () {
            const rsp = await get('list/fields/', { });
            const result = rsp.data;
            this.commit('setListFields', result);
         },

         async fetchListData ({ state }) {
            const rsp = await get('list/data/', {
               pageIndex: state.pageIndex,
               pageSize: state.pageSize,
            });
            const result = rsp.data;
            this.commit('setListData', result);
         },
      },
   });

   return store;
}
