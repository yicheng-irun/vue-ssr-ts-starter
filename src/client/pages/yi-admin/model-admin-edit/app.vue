<template>
   <div>
      <div>yiadmin</div>
      <div>
         {{ JSON.stringify(state) }}
      </div>
   </div>
</template>

<script>
import '../components/element-ui';
import createStore from './store';

export default {
   createStore,

   async fetchData (context) {
      await Promise.all([
         context.store.dispatch('fetchEditFormFields'),
         context.store.dispatch('fetchData'),
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

</style>
