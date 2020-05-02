<template>
   <div class="table-view">
      <table class="table-view-table">
         <thead class="table-view-thead">
            <tr>
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
            <tr>
               <td>asdf</td>
            </tr>
         </tbody>
      </table>
   </div>
</template>

<script>
export default {
   computed: {
      state () {
         return this.$store.state;
      },
      listFields () {
         return this.state.listFields;
      },
   },
};
</script>

<style lang="stylus">
.table-view {
   overflow-x auto;
   >table {
      min-width 1000px;
      background #fff
   }
}
</style>
