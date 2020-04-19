import { Context } from 'koa';
import EditBaseType from './edit-types/edit-base-type';

export interface ModelAdminBaseParams {
   /**
    * 用来判断用户是否有权限
    */
   permission?: (ctx: Context) => Promise<boolean>;

   /**
    * model的name
    */
   name: string;
}

export interface ModelDataItem {
   /**
    * id 是必须项
    */
   id: string;

   [key: string]: any;
}

export interface DataListRequestBody {
   /**
    * 分页大小
    */
   pageSize: number;
   /**
    * 分页
    */
   pageIndex: number;
}

export interface DataListResponseBody {
   /**
    * 分页大小
    */
   total: number;
   /**
    * 分页
    */
   dataList: ModelDataItem[];
}

export default class ModelAdminBase {
   /**
    * 判断用户是否有权限
    * 如果没有权限，直接在里侧抛出异常或者返回false
    */
   public permission: (ctx: Context) => Promise<boolean> = async () => true

   /**
    * model的name，用户路径中，不能重复，且不能更改
    */
   private $name: string;

   constructor ({ permission, name }: ModelAdminBaseParams) {
      if (permission) {
         this.permission = permission;
      }
      // 因为要在url的路径中，所以要做这个限制
      if (/^[0-9a-zA-Z_-]+$/.test(name)) {
         this.$name = name;
      } else {
         throw new Error('name的规则必须满足/^[0-9a-zA-Z_-]+$/');
      }
   }

   /**
    * model的name，用户路径中，不能重复，不能更改
    */
   public get name (): string {
      return this.$name;
   }

   /**
    * 获取列表页字段列表
    */
   // eslint-disable-next-line class-methods-use-this
   public getDataListFields (): {
      [key: string]: EditBaseType;
      } {
      throw new Error('请在子类中实现getDataListFields函数');
   }

   /**
    * 获取表单编辑页的字段列表
    */
   // eslint-disable-next-line class-methods-use-this
   public getEditFormFields (): {
      [key: string]: EditBaseType;
      } {
      throw new Error('请在子类中实现getEditFormFields函数');
   }

   /**
    * data-list中拉取数据的函数
    */
   // eslint-disable-next-line class-methods-use-this
   public getDataList (req: DataListRequestBody, ctx: Context): Promise<DataListResponseBody> {
      throw new Error('请在子类中实现getDataList函数');
   }

   /**
    * edit-form中拉取数据的函数
    */
   // eslint-disable-next-line class-methods-use-this
   public getEditData (id: string, ctx: Context): Promise<ModelDataItem> {
      throw new Error('请在子类中实现getEditData函数');
   }

   /**
    * 移除某一项
    */
   // eslint-disable-next-line class-methods-use-this
   public removeItem (id: string, ctx: Context): Promise<boolean> {
      throw new Error('请在子类中实现removeItem函数');
   }
}
