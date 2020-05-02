<template>
   <el-select
      :value="value"
      :placeholder="config.placeholder == null ? '搜索和选择' : config.placeholder"
      :clearable="config.required ? false : true"
      filterable
      remote
      :remote-method="remoteMethod"
      :loading="loading"
      class="form-component-el-string-remote-select"
      @change="handleInput"
   >
      <el-option
         v-for="item in options"
         :key="item.value"
         :label="item.label"
         :value="item.value"
      />
   </el-select>
</template>

<script>
import { post } from '../../../../lib/ajax';

export default {
   model: {
      prop: 'value',
      event: 'input',
   },
   props: {
      fieldName: {
         type: String,
         default: '',
      },
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
         remoteOptions: [],
         loading: false,
         lastQuery: '',
      };
   },

   computed: {
      options () {
         const opts = [];
         for (let i = 0; i < this.remoteOptions.length; i += 1) {
            const e = this.remoteOptions[i];
            if (typeof e === 'object' && e.value !== undefined) {
               opts.push({
                  value: e.value,
                  label: e.label == null ? e.value : e.label,
               });
            } else {
               opts.push({
                  value: String(e),
                  label: String(e),
               });
            }
         }

         return opts;
      },
   },
   mounted () {
      this.remoteMethod('');
   },
   methods: {
      async remoteMethod (query) {
         this.loading = true;
         this.lastQuery = query;
         try {
            const rsp = await post('component-action/', {
               fieldName: this.fieldName,
               actionName: '',
               actionData: query,
            });
            const result = rsp.data;
            if (this.lastQuery === query) {
               if (result.success) {
                  this.remoteOptions = result.data;
               } else {
                  throw new Error(result.message || '搜索远程数据失败了');
               }
            }
         } catch (e) {
            if (this.lastQuery === query) {
               // 这里提示
               this.$message.error(e?.message || String(e) || '搜索失败了');
            }
         }
         this.loading = false;
      },
      handleInput (value) {
         const v = String(value);
         this.$emit('input', v);
      },
   },
};
</script>

<style lang="stylus">
.form-component-el-string-remote-select {
   // max-width 20em
}
</style>
