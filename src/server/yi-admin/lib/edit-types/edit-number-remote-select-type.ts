import EditBaseType, { EditBaseTypeConfig, EditBaseComponentConfig } from './edit-base-type';

export default class EditNumberRemoteSelectType extends EditBaseType {
   /**
    * 前端的组件名称
    */
   public componentName = 'number-remote-select'

   constructor (config: EditBaseTypeConfig & {
         getOptions?: (search: string) => Promise<(number | {
            /**
             * 值
             */
            value: number;
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

   public getOptions: (search: string) => Promise<(number | {
      /**
       * 值
       */
      value: number;
      /**
       * 显示的标签
       */
      label: string;
   })[]> = null;

   public async action (actionName: string, actionData: any): Promise<(number | {
      value: number;
      label: string;
   })[]> {
      return this.getOptions(actionData);
   }
}
