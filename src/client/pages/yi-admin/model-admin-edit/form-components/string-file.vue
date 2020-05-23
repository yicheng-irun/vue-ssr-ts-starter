<template>
   <div class="form-component-string-file">
      <span v-text="value" />
      <el-button
         size="mini"
         type="primary"
         @click="selectFile"
      >
         选择文件
      </el-button>
   </div>
</template>

<script>
import formatFileSize from '../../components/utils/format-file-size';

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
            return {
               maxFileSize: 10 * 1000,
            };
         },
      },
   },
   data () {
      return {
      };
   },
   mounted () {
      const fileInput = document.createElement('input');
      this.fileInput = fileInput;
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.onchange = () => {
         const file = fileInput.files[0];
         this.doUploadAction(file);
      };
   },
   methods: {
      handleInput (value) {
         const v = String(value);
         this.$emit('input', v);
      },
      async selectFile () {
         this.fileInput.click();
      },
      /**
       * @param {File} file
       */
      async upload (file) {
         const formData = new FormData();
         formData.append('name', file.name);
         // 通过append向form对象添加数据
         formData.append('file', file);
         // FormData私有类对象，访问不到，可以通过get判断值是否传进去
         console.log(formData.get('file'));

         const rsp = await this.$ajax.post(
            'component-action/',
            formData, {
               fieldName: this.fieldName,
               actionName: 'upload',
            }, {
               headers: {
                  'Content-Type': 'multipart/form-data',
               },
            },
         );
         console.log(rsp);
      },
      /**
       * @param {File} file
       */
      async doUploadAction (file) {
         try {
            console.log(file, this.config);
            if (file.size > this.config.maxFileSize) {
               throw new Error(`您选择的文件大小超过了最大${formatFileSize(this.config.maxFileSize)}限制`);
            }
            const result = await this.upload(file);
            console.log(result);
         } catch (e) {
            this.$message.error(e?.message || String(e) || '选取文件失败了');
         }
      },
   },
};
</script>

<style lang="stylus">
.form-component-string-file {

}

</style>
