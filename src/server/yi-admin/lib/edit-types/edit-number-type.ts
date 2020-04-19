import EditBaseType from './edit-base-type';

export default class EditNumberType extends EditBaseType {
   /**
    * 前端的组件名称
    */
   public componentName = 'number'

   /**
    * 前端组件的参数
    */
   public componentConfig: {
      min: number;
      max: number;
      step: number;
      required: boolean;
   } = {
      ...this.componentConfig,
      min: null,
      max: null,
      step: 1,
   }

   constructor (
      config: {
         min?: number;
         max?: number;
         step?: number;
         required?: boolean;
      },
   ) {
      super(config);
      if ('min' in config) {
         this.componentConfig.min = config.min;
      }
      if ('max' in config) {
         this.componentConfig.max = config.max;
      }
      if ('step' in config) {
         if (config.step <= 0) throw new Error('step 不能小于或等于0');
         this.componentConfig.step = config.step;
      }
   }
}
