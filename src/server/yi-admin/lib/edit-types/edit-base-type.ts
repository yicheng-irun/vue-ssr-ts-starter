
export interface EditBaseTypeConfig {
   required?: boolean;

   /**
    * 字段显示名称，对应表单中的label中的名称
    */
   fieldNameAlias?: string;
}

export default class EditBaseType {
   /**
    * 前端的组件名称
    */
   public componentName = 'base'

   /**
    * 字段名称，对应db中的字段名称
    */
   public fieldName = ''

   /**
    * 字段显示名称，对应表单中的label中的名称
    */
   public fieldNameAlias: string = null;

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
      config: EditBaseTypeConfig,
   ) {
      this.componentConfig.required = config.required || false;
      this.fieldNameAlias = config.fieldNameAlias;
   }
}
