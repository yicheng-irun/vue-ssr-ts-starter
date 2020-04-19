import EditBaseType from './edit-base-type';

export default class EditStringType extends EditBaseType {
   /**
    * 前端的组件名称
    */
   public componentName = 'string'

   /**
    * 前端组件的参数
    */
   public componentConfig: {
      /**
       * 最小长度
       */
      minLength: number;
      /**
       * 最大长度
       */
      maxLength: number;

      required: boolean;
   } = {
      ...this.componentConfig,
      minLength: 0,
      maxLength: null,
   }

   constructor (
      config: {
         minLength?: number;
         maxLength?: number;
         required?: boolean;
      },
   ) {
      super(config);
      this.componentConfig.minLength = config.minLength || null;
      this.componentConfig.maxLength = config.maxLength || null;
   }
}
