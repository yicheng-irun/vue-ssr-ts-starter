<template>
   <el-input
      :value="value"
      :placeholder="config.placeholder || ''"
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
   computed: {

   },
   methods: {
      handleInput (value) {
         const v = String(value);
         this.$emit('input', v);
      },
   },
};
</script>
