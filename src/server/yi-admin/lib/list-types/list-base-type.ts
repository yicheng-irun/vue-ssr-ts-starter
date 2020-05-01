
export interface ListBaseTypeConfig {
   /**
    * 字段显示名称，对应表单中的label中的名称
    */
   fieldNameAlias?: string;
}

export default class ListBaseType {
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
   public componentConfig = {};

   constructor (
      config: ListBaseTypeConfig,
   ) {
      this.fieldNameAlias = config.fieldNameAlias;
   }

   // eslint-disable-next-line class-methods-use-this
   public async action (actionName: string, actionData: any): Promise<any> {
      //
   }
}