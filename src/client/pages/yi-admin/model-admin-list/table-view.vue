<template>
   <div
      v-loading="state.loading"
      class="table-view"
   >
      <div class="table-wrapper">
         <table class="table-view-table">
            <thead class="table-view-thead">
               <tr>
                  <th class="checkbox-all">
                     <el-checkbox
                        :value="allChecked"
                        @change="handelCheckAll"
                     />
                  </th>
                  <th>#</th>
                  <th>id</th>
                  <th
                     v-for="(item, idx) in listFields"
                     :key="idx"
                  >
                     <span v-text="item.fieldNameAlias || item.fieldName" />
                  </th>
               </tr>
            </thead>
            <tbody class="table-view-tbody">
               <tr
                  v-for="(item, index) in listData"
                  :key="item.id || index"
               >
                  <td><el-checkbox v-model="listCheckedStatusArray[index]" /></td>
                  <td>{{ index + 1 }}</td>
                  <td>
                     <a :href="`edit/?id=${item.id}`">{{ item.id }}</a>
                  </td>
                  <td
                     v-for="(fieldItem, fieldIndex) in listFields"
                     :key="fieldIndex"
                  >
                     <div>
                        <component
                           :is="getComponent(fieldItem.componentName)"
                           :id="item.id"
                           :config="item.componentConfig"
                           :field-name="item.fieldName"
                           :values="item.values"
                           :value="item.values[fieldItem.fieldName]"
                        />
                     </div>
                  </td>
               </tr>
            </tbody>
         </table>
         <div
            v-if="listData.length === 0"
            class="no-data"
         >
            暂时没有数据呦~
         </div>
      </div>
      <div class="table-view-footer">
         <el-pagination
            :current-page="pageIndex"
            background
            :page-sizes="[10, 20, 50, 100, 200]"
            :page-size="state.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="state.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
         />
      </div>
   </div>
</template>

<script>
import ListComponents from './list-components';

export default {
   data () {
      return {
         pageIdx: 0,
      };
   },
   computed: {
      state () {
         return this.$store.state;
      },
      pageIndex () {
         return this.state.pageIndex;
      },
      listFields () {
         return this.state.listFields;
      },
      listData () {
         return this.state.listData;
      },
      listCheckedStatusArray () {
         return this.state.listCheckedStatusArray;
      },
      allChecked () {
         let isCheckedAll = true;
         for (let i = 0; i < this.listCheckedStatusArray.length; i += 1) {
            if (!this.listCheckedStatusArray[i]) {
               isCheckedAll = false;
               break;
            }
         }
         return isCheckedAll;
      },
   },
   methods: {
      getComponent (componentName) {
         if (Object.prototype.hasOwnProperty.call(ListComponents, componentName)) {
            return ListComponents[componentName];
         }
         return ListComponents.base;
      },
      handelCheckAll () {
         let v = true;
         if (this.allChecked) {
            v = false;
         }
         for (let i = 0; i < this.listCheckedStatusArray.length; i += 1) {
            this.$set(this.listCheckedStatusArray, i, v);
         }
      },
      async handleSizeChange (v) {
         this.$store.commit('setPageIndex', 1);
         this.$store.commit('setPageSize', v);
         try {
            await this.$store.dispatch('fetchListData');
         } catch (e) {
            this.$notify.error({
               title: '出错了',
               message: e?.message || '拉取数据出错了',
            });
         }
      },
      handleCurrentChange (v) {
         const oldPageIndex = this.state.pageIndex;
         this.$store.commit('setPageIndex', 0); // 这么做是禁止element的翻页组件提前跳页
         this.$nextTick(async () => {
            this.$store.commit('setPageIndex', oldPageIndex); // 这么做是触发
            try {
               await this.$store.dispatch('fetchListData', { pageIndex: v });
            } catch (e) {
               this.$notify.error({
                  title: '出错了',
                  message: e?.message || '拉取数据出错了',
               });
            }
         });
      },
   },
};
</script>

<style lang="stylus">
.table-view {
   font-size 12px
   box-shadow 0 0 3px #0001
   margin 0 1em
   >.table-wrapper {
      overflow-x auto;
      >table {
         min-width 100%
         background #fff
         border-collapse collapse
         font-size: 12px
         >thead {
            border-bottom 2px dotted #0004
            line-height 1.2
            color #000a
            >tr {
               >th {
                  padding 1.2em 0.4em 1em
               }
            }
         }
         >tbody {
            line-height 1.5
            >tr {
               >td {
                  padding 0.8em 0.8em;
                  font-size: 12px
                  color #000a
                  border-right 1px dotted #0002
                  &:last-child {
                     border-right none;
                  }
               }
               &:nth-child(2n - 1) {
                  background #0000000a
               }
            }
         }
      }
      >.no-data {
         text-align center
         line-height 4
         color #0008
         font-size 1.3em
      }
   }
   >.table-view-footer {
      border-top 1px dashed #0003
      line-height 3em
      background #fff
      padding 0.7em 1em 0.2em
      color #000a
   }
}
</style>
