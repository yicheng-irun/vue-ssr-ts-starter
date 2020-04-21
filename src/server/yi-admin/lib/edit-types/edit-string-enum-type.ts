import EditBaseType, { EditBaseTypeConfig } from './edit-base-type';

export default class EditStringEnumType extends EditBaseType {
   /**
    * 前端的组件名称
    */
   public componentName = 'string-enum'

   /**
    * 前端组件的参数
    */
   public componentConfig: {
      /**
       * 枚举值列表, 当require设置为true时，用户必须选择一个enum，require设置为false时，用户可以不选择
       */
      enum: (string | {
         /**
          * 值
          */
         value: string;
         /**
          * 显示的标签
          */
         label: string;
      })[];
      required: boolean;
   } = {
      ...this.componentConfig,
      enum: [],
   }

   constructor (config: EditBaseTypeConfig & {
         enum: (string | {
            value: string;
            label: string;
         })[];
      }) {
      super(config);
      if (config.enum && Array.isArray(config.enum)) {
         this.componentConfig.enum = config.enum;
      }
   }
}
