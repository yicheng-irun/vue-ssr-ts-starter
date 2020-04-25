import EditBaseType, { EditBaseTypeConfig } from './edit-base-type';

export default class EditStringRemoteSelectType extends EditBaseType {
   /**
    * 前端的组件名称
    */
   public componentName = 'string-remote-select'

   /**
    * 前端组件的参数
    */
   public componentConfig: {
      required: boolean;
   } = {
      ...this.componentConfig,
   }

   constructor (config: EditBaseTypeConfig & {
         getOptions?: (search: string) => Promise<(string | {
            /**
             * 值
             */
            value: string;
            /**
             * 显示的标签
             */
            label: string;
         })[]>;
      }) {
      super(config);

      if (!config.getOptions || typeof config.getOptions !== 'function') {
         throw new Error('getOptions 不是一个函数');
      }
      this.getOptions = config.getOptions;
   }

   public getOptions: (search: string) => Promise<(string | {
      /**
       * 值
       */
      value: string;
      /**
       * 显示的标签
       */
      label: string;
   })[]> = null;

   public async action (actionName: string, actionData: any): Promise<(string | {
      value: string;
      label: string;
   })[]> {
      return this.getOptions(actionData);
   }
}
