import Vuex from 'vuex';

import { get, post } from '../../../lib/ajax';

export default function () {
   const store = new Vuex.Store({
      state: {
         editId: '',
         editFormFields: [],
         editFormData: {},
         loading: false,
      },

      mutations: {
         setEditFormFields (state, { data }) {
            state.editFormFields = data;
         },

         setLoading (state, value) {
            state.loading = !!value;
         },
      },

      actions: {
         async fetchEditFormFields () {
            const rsp = await get('fields/', { });
            const result = rsp.data;
            await this.commit('setEditFormFields', result);
         },

         async formSubmit ({ state }) {
            const rsp = await post('submit/', {
               editId: state.editId,
               formData: state.editFormData,
            });
            return rsp.data;
         },
      },
   });

   return store;
}
