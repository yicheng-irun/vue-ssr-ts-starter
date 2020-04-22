<template>
   <div class="edit-form">
      <el-form
         ref="form"
         :model="editFormData"
         status-icon
         size="small"
         :rules="formRules"
         label-width="120px"
      >
         <el-form-item
            v-for="(item, index) in editFormFields"
            :key="index"
            :label="`${item.fieldNameAlias || item.fieldName}:`"
            :prop="item.fieldName"
         >
            <component
               :is="getComponent(item.componentName)"
               v-model="editFormData[item.fieldName]"
               :name="item.fieldName"
               :config="item.componentConfig"
            />
         </el-form-item>
         <el-form-item>
            <el-button
               type="primary"
               @click="submit"
            >
               提交
            </el-button>
            <el-button @click="reset">
               重置
            </el-button>
         </el-form-item>
      </el-form>
   </div>
</template>

<script>
import FormComponents from './form-components';

export default {
   props: {
      editId: {
         type: String,
         default: '',
      },
      editFormData: {
         type: Object,
         default () {
            return {};
         },
      },
      editFormFields: {
         type: Array,
         default () {
            return [];
         },
      },
   },

   computed: {
      formRules () {
         return {};
      },
   },

   methods: {
      getComponent (componentName) {
         if (Object.prototype.hasOwnProperty.call(FormComponents, componentName)) {
            return FormComponents[componentName];
         }
         return FormComponents.string;
      },
      submit () {},
      reset () {},
   },
};
</script>

<style lang="stylus">
.edit-form {
   padding 2em 0em
   margin 0 1em

   .el-button--small {
      padding 0.6em 1.5em
   }
}
</style>
