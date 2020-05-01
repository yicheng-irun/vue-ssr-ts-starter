<template>
   <div id="app">
      <pre v-text="JSON.stringify(state, null, '  ')" />
   </div>
</template>

<script>
import '../components/element-ui';
import createStore from './store';

export default {
   createStore,
   async fetchData (context) {
      await Promise.all([
         context.store.dispatch('fetchListFormFields'),
         // context.store.dispatch('fetchData'),
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
#app {
   >pre {
      font-size 12px;
   }
}
</style>
