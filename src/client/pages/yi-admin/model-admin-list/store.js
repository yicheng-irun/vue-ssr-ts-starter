import Vuex from 'vuex';

import { get } from '../../../lib/ajax';

export default function () {
   const store = new Vuex.Store({
      state: {
         loading: false,
         pageIndex: 1,
         pageSize: 10,
         total: 0,
         listFields: [],
         listData: [],
         listCheckedStatusArray: [],
      },

      mutations: {
         setLoading (state, value) {
            state.loading = !!value;
         },
         setListFields (state, { data }) {
            state.listFields = data;
         },
         setListData (state, { dataList, total }) {
            state.total = total;
            state.listData = dataList;
            const statusArray = new Array(dataList.length);
            statusArray.fill(false);
            state.listCheckedStatusArray = statusArray;
         },
         setPageSize (state, pageSize) {
            state.pageSize = pageSize;
         },
         setPageIndex (state, pageIndex) {
            state.pageIndex = pageIndex;
         },
      },

      actions: {
         async fetchListFields () {
            const rsp = await get('list/fields/', { });
            const result = rsp.data;
            if (result.success) {
               this.commit('setListFields', result);
            } else {
               throw new Error(result?.message || '拉取字段信息出错了');
            }
         },

         // 服务端请求，所以不需要错误请求
         async fetchListData ({ state }, {
            pageIndex = state.pageIndex,
         } = {}) {
            console.log(pageIndex);
            if (state.loading) return;
            this.commit('setLoading', true);
            try {
               const rsp = await get('list/data/', {
                  pageIndex,
                  pageSize: state.pageSize,
               });
               const result = rsp.data;
               if (result.success) {
                  this.commit('setListData', result.data);
                  this.commit('setPageIndex', pageIndex);
               } else {
                  throw new Error(result?.message || '拉取列表数据出错了');
               }
            } finally {
               this.commit('setLoading', false);
            }
         },
      },
   });

   return store;
}
