import EditBaseType, { EditBaseTypeConfig } from './edit-base-type';

export default class EditNumberRemoteSelectType extends EditBaseType {
   /**
    * 前端的组件名称
    */
   public componentName = 'number-remote-select'

   constructor (config: EditBaseTypeConfig & {
         /**
          * 通过value获取label，用户表单初始化时，传了value给组件但是其实应该显示一个对应的名称
          */
         getLabelByValue?: (value: number) => Promise<string>;
         getOptions: (search: string) => Promise<(number | {
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

      if (config.getLabelByValue) {
         if (typeof config.getLabelByValue !== 'function') throw new Error('getLabelByValue 不是一个函数');
         this.getLabelByValue = config.getLabelByValue;
      }
   }

   public getLabelByValue?: (value: number) => Promise<string> = null;

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

   public async action (actionName: string, actionData: any): Promise<((number | {
      value: number;
      label: string;
   })[]) | string> {
      if (actionName === 'getOptions') {
         const options = await this.getOptions(actionData);
         return options.map((item) => {
            if (typeof item === 'number') {
               return {
                  value: item,
                  label: String(item),
               };
            }
            if (typeof item === 'string') {
               const t = Number(item);
               return {
                  value: t,
                  label: String(item),
               };
            }
            return item;
         });
      }
      if (actionName === 'getLabelByValue') {
         if (this.getLabelByValue) { return this.getLabelByValue(actionData); }
         return actionData;
      }
      throw new Error(`接收到非法actionName ${actionName}`);
   }
}
