<template>
   <el-date-picker
      v-model="time"
      type="datetime"
      :placeholder="config.placeholder || ''"
      class="component-el-date-time"
      :format="config.format || undefined"
      @change="handleChange"
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
         default: '2020-04-22',
      },
      config: {
         type: Object,
         default () {
            return {};
         },
      },
   },
   data () {
      return {
         time: this.value ? null : new Date(this.value),
      };
   },
   methods: {
      handleChange (value) {
         if (value) {
            this.$emit('input', String(value));
         } else {
            this.$emit('input', null);
         }
      },
   },
};
</script>

<style lang="stylus">
.component-el-date-time {
}
</style>
