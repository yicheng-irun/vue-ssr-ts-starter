import EditBaseType, { EditBaseTypeConfig, EditBaseComponentConfig } from './edit-base-type';

export default class EditStringTextareaType extends EditBaseType {
   /**
    * 前端的组件名称
    */
   public componentName = 'string-textarea'

   /**
    * 前端组件的参数
    */
   public componentConfig: EditBaseComponentConfig & {
      /**
       * 最小长度
       */
      minLength: number;
      /**
       * 最大长度
       */
      maxLength: number;

      placeholder: string;
   } = {
      ...this.componentConfig,
      minLength: 0,
      maxLength: null,
      placeholder: '',
   }

   constructor (
      config: EditBaseTypeConfig & {
         minLength?: number;
         maxLength?: number;
         placeholder?: string;
      },
   ) {
      super(config);
      this.componentConfig.minLength = config.minLength || null;
      this.componentConfig.maxLength = config.maxLength || null;
      this.componentConfig.placeholder = config.placeholder || '';
   }
}
