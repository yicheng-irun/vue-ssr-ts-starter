<template>
   <div id="app">
      <edit-form
         :edit-id="state.editId"
         :edit-form-fields="state.editFormFields"
         :edit-form-data="state.editFormData"
      />
      <pre v-text="JSON.stringify(state, null, '  ')" />
   </div>
</template>

<script>
import '../components/element-ui';
import createStore from './store';
import EditForm from './edit-form';

export default {
   components: {
      EditForm,
   },

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
#app {
   >pre {
      font-size 12px;
   }
}
</style>
