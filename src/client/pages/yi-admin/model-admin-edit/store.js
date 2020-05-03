import Vuex from 'vuex';


export default function ({
   runtime,
   ajax: { get, post },
}) {
   const store = new Vuex.Store({
      state: {
         editId: runtime.query.id || '',
         editFormFields: [],
         editFormData: {},
         loading: false,
      },

      mutations: {
         setEditFormFields (state, { data }) {
            state.editFormFields = data;
         },

         setEditFormData (state, { values }) {
            state.editFormData = values;
         },

         setLoading (state, value) {
            state.loading = !!value;
         },
      },

      actions: {
         async fetchEditFormFields () {
            const rsp = await get('fields/', { });
            const result = rsp.data;
            if (!result.success) {
               throw new Error(result.message || '获取表单结构失败了');
            }
            this.commit('setEditFormFields', result);
         },

         async fetchEditData ({ state }) {
            const rsp = await get('values/', {
               id: state.editId,
            });
            const result = rsp.data;
            if (!result.success) {
               throw new Error(result.message || '获取初始化数据失败了');
            }
            this.commit('setEditFormData', result.data);
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
