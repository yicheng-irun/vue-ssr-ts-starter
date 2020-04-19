
export default class EditBaseType {
   /**
    * 前端的组件名称
    */
   public componentName = 'base'

   /**
    * 前端组件的参数
    */
   public componentConfig: {
      /**
       * 是否必填
       */
      required: boolean;
   } = {
      required: false,
   }

   constructor (
      config: {
         required?: boolean;
      },
   ) {
      this.componentConfig.required = config.required || false;
   }
}
