<template>
   <el-date-picker
      v-model="time"
      :placeholder="config.placeholder == null ? '请选择' : config.placeholder"
      :format="config.format || 'yyyy-MM-dd HH:mm:ss'"
      type="datetime"
      class="component-el-date-time"
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
         default: '',
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
         time: this.value ? new Date(this.value) : '',
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
