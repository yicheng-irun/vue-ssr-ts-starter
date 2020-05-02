<template>
   <div id="app">
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
         context.store.dispatch('fetchListData'),
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
   background: #f6f6f6
}
#app {
   padding 1em 0 2em
   >pre {
      font-size 12px
   }
}
</style>
