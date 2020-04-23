<template>
   <el-input
      :value="value"
      :placeholder="config.placeholder || ''"
      :minlength="config.minLength"
      :maxlength="config.maxLength"
      class="component-el-input"
      @input="handleInput"
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
.component-el-input.el-input {
   max-width 20em
}
</style>
