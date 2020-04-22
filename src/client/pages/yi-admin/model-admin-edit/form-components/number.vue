<template>
   <el-input-number
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
         type: Number,
         default: 0,
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
         const v = Number(value);
         this.$emit('input', v);
      },
   },
};
</script>
