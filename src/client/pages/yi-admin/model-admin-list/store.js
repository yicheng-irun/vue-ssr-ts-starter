import Vuex from 'vuex';

import { get } from '../../../lib/ajax';

export default function () {
   const store = new Vuex.Store({
      state: {
         listFormFields: [],
         editFormData: {},
         loading: false,
      },

      mutations: {
         setListFormFields (state, { data }) {
            state.editFormFields = data;
         },
         setLoading (state, value) {
            state.loading = !!value;
         },
      },

      actions: {
         async fetchListFormFields () {
            const rsp = await get('list/fields/', { });
            const result = rsp.data;
            await this.commit('setListFormFields', result);
         },

      },
   });

   return store;
}
