<template>
   <div id="app">
      <div class="table-wrapper">
         <TableView />
      </div>
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
      ]);
   },
   computed: {
      state () {
         return this.$store.state;
      },

   },
};
</script>

<style lang="stylus">
body {
   background: #f5f6f7;
}
#app {
   >.table-wrapper {
      margin 0 1em;
   }
   >pre {
      font-size 12px;
   }
}
</style>
