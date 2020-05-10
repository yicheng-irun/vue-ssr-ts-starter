import EditBaseType, { EditBaseTypeConfig } from './edit-base-type';

export default class EditStringRemoteSelectType extends EditBaseType {
   /**
    * 前端的组件名称
    */
   public componentName = 'string-remote-select'

   constructor (config: EditBaseTypeConfig & {
      /**
          * 通过value获取label，用户表单初始化时，传了value给组件但是其实应该显示一个对应的名称
          */
         getLabelByValue?: (value: string) => Promise<string>;
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

      if (config.getLabelByValue) {
         if (typeof config.getLabelByValue !== 'function') throw new Error('getLabelByValue 不是一个函数');
         this.getLabelByValue = config.getLabelByValue;
      }
   }

   public getLabelByValue?: (value: string) => Promise<string> = null;

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

   public async action (actionName: string, actionData: any): Promise<((string | {
      value: string;
      label: string;
   })[]) | string> {
      if (actionName === 'getOptions') {
         return this.getOptions(actionData);
      }
      if (actionName === 'getLabelByValue') {
         if (this.getLabelByValue) { return this.getLabelByValue(actionData); }
         return actionData;
      }
      throw new Error(`接收到非法actionName ${actionName}`);
   }
}
