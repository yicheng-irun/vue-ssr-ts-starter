<template>
   <div
      id="app"
      :style="{ opacity, }"
   >
      <div class="breadcrumb">
         <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '../../' }">
               <a href="../../">首页</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item>{{ state.modelInfo.title || state.modelInfo.name }} 管理</el-breadcrumb-item>
         </el-breadcrumb>
      </div>
      <TableView />
      <pre v-text="JSON.stringify(state, null, '  ')" />
   </div>
</template>

<script>
import '../components/element-ui';
import createStore from './store';
import TableView from './table-view';

export default {
   components: {
      TableView,
   },
   createStore,
   async fetchData (context) {
      await Promise.all([
         context.store.dispatch('fetchListFields'),
         context.store.dispatch('fetchListActions'),
         context.store.dispatch('fetchListData'),
      ]);
   },
   data () {
      return {
         opacity: 0,
      };
   },
   computed: {
      state () {
         return this.$store.state;
      },
   },
   mounted () {
      this.opacity = 1;
   },
};
</script>

<style lang="stylus">
body {
   background: #f6f6f6
}
#app {
   padding 1em 0 2em
   transition opacity 0.3s
   >.breadcrumb {
      margin 0 1.2em 0.8em
      >.el-breadcrumb {
         font-size 12px
      }
   }
   >pre {
      font-size 12px
   }
}
</style>
