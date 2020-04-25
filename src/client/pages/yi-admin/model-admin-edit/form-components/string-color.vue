<template>
   <el-color-picker
      :value="value"
      :show-alpha="config.showAlpha"
      :predefine="config.predefine"
      size="medium"
      class="component-el-string-color"
      @active-change="handleInput"
   />
</template>

<script>
export default {
   model: {
      prop: 'value',
      event: 'input',
   },
   props: {
      value: {
         type: String,
         default: '',
      },
      config: {
         type: Object,
         default () {
            return {};
         },
      },
   },
   methods: {
      handleInput (value) {
         const v = String(value);
         this.$emit('input', v);
      },
   },
};
</script>

<style lang="stylus">
.component-el-string-color {
   // max-width 20em
}
</style>
