import Router from '@koa/router';
import { Context, Next } from 'koa';
import ModelAdminBase from './model-admin-base';
import EditBaseType from './edit-types/edit-base-type';
import ModelAdminListAction from './model-admin-list-action';

/**
 * admin站点
 */
export default class YiAdmin {
   /**
    * 判断用户是否有权限
    * 如果没有权限，直接在里侧抛出异常或者返回false
    */
   private permission: (ctx: Context) => Promise<boolean> = async () => true


   /**
    * 对应的koa的路由
    */
   koaRouter: Router;

   constructor ({ permission }: {
      permission?: (ctx: Context) => Promise<boolean>;
   }) {
      this.koaRouter = new Router();
      this.koaRouter.all(/.*/); // 使app中的use不再按需进入此路由

      if (permission) {
         this.permission = permission;
      }

      this.appendPermissionCheckRouter();
      this.appendSiteHomeRouter();
      this.appendModelAdminRouter();
   }

   private appendPermissionCheckRouter (): void {
      // check permissionResult
      this.koaRouter.use(async (ctx, next) => {
         if (!/\/$/.test(ctx.path)) { // 使强制加/
            ctx.redirect(ctx.originalUrl.replace(ctx.path, () => `${ctx.path}/`));
            return;
         }

         const permissionResult = await this.permission(ctx);
         if (permissionResult === true) {
            await next();
         } else {
            throw new Error('no permission');
         }
      });
   }

   private appendSiteHomeRouter (): void {
      this.koaRouter.get('/', async (ctx: Context) => {
         await ctx.render('yi-admin/site', {});
      });
   }


   public modelAdminsMap: {
      [name: string]: ModelAdminBase;
   } = {};

   private appendModelAdminRouter (): void {
      const modelRouter = new Router();

      modelRouter.get('/', async (ctx: Context) => {
         await ctx.render('yi-admin/model-admin-list', {});
      });

      modelRouter.get('/edit/', async (ctx: Context) => {
         await ctx.render('yi-admin/model-admin-edit', {});
      });

      modelRouter.get('/edit/fields/', async (ctx: Context) => {
         const { modelName } = ctx.params;
         const fields = this.modelAdminsMap[modelName].getEditFormFields();
         ctx.body = {
            success: true,
            data: fields,
         };
      });

      modelRouter.get('/edit/values/', async (ctx: Context) => {
         const { modelName } = ctx.params;
         const { id } = ctx.query;
         const values = await this.modelAdminsMap[modelName].getEditData(id, ctx);
         ctx.body = {
            success: true,
            data: values,
         };
      });

      // 表单组件的请求
      modelRouter.post('/edit/component-action/', async (ctx: Context) => {
         const { modelName } = ctx.params;
         const fields = this.modelAdminsMap[modelName].getEditFormFields();

         const { fieldName, actionName, actionData } = ctx.request.body;
         let editField: EditBaseType = null;

         fields.forEach((fitem) => {
            if (fitem.fieldName === fieldName) {
               editField = fitem;
            }
         });

         if (editField) {
            const result = await editField.action(actionName, actionData);
            ctx.body = {
               success: true,
               data: result,
            };
            return;
         }

         ctx.body = {
            success: false,
            message: '未找到该字段对应的组件',
         };
      });

      modelRouter.post('/edit/submit/', async (ctx: Context) => {
         const { modelName } = ctx.params;
         const { editId = '', formData = {} } = ctx.request.body;
         const value = await this.modelAdminsMap[modelName].formSubmit(editId, formData, ctx);
         ctx.body = {
            success: true,
            data: value,
         };
      });

      /**
       * 拉取列表页的字段信息
       */
      modelRouter.get('/list/fields/', async (ctx: Context) => {
         const { modelName } = ctx.params;
         const fields = this.modelAdminsMap[modelName].getDataListFields();
         ctx.body = {
            success: true,
            data: fields,
         };
      });

      /**
       * 拉取列表页的字段信息
       */
      modelRouter.get('/list/actions/', async (ctx: Context) => {
         const { modelName } = ctx.params;
         const actions = this.modelAdminsMap[modelName].listActions;
         ctx.body = {
            success: true,
            data: actions,
         };
      });

      /**
       * 拉取列表页的数据
       */
      modelRouter.get('/list/data/', async (ctx: Context) => {
         const { modelName } = ctx.params;
         const { pageIndex = '1', pageSize = '10' } = ctx.query;
         const pageIndexNumber = Number.parseInt(pageIndex, 10);
         const pageSizeNumber = Number.parseInt(pageSize, 10);
         if (typeof pageIndexNumber !== 'number' || pageIndexNumber < 1) throw new Error('pageIndex必须是>=1的整数');
         if (typeof pageSizeNumber !== 'number' || pageSizeNumber < 1) throw new Error('pageSize必须是>=1的整数');

         const datas = await this.modelAdminsMap[modelName].getDataList({
            pageIndex: pageIndexNumber,
            pageSize: pageSizeNumber,
         }, ctx);
         ctx.body = {
            success: true,
            data: datas,
         };
      });

      /**
       * 执行列表操作
       */
      modelRouter.post('/list/action/', async (ctx: Context) => {
         const { modelName } = ctx.params;
         const actions = this.modelAdminsMap[modelName].listActions;
         const {
            actionName = '',
            idList = [],
         } = ctx.request.body;

         let action: ModelAdminListAction = null;
         for (let i = 0; i < actions.length; i += 1) {
            if (actions[i].actionName === actionName) {
               action = actions[i];
               break;
            }
         }

         if (!action) throw new Error('未找到对应的操作动作');

         const result = await action.actionFunc(idList);

         ctx.body = {
            success: true,
            data: result || {
               successfulNum: 0,
               failedNum: 0,
            },
         };
      });

      /**
       * 挂载统一路由
       */
      this.koaRouter.use('/model-admin/:modelName', async (ctx: Context, next: Next) => {
         const { modelName } = ctx.params;
         if (Object.prototype.hasOwnProperty.call(this.modelAdminsMap, modelName)) {
            await next();
         }
      }, modelRouter.middleware());
   }

   /**
    * 添加一个modelAdmin到yi-admin实例中
    * @param modelAdmin
    */
   addModelAdmin (modelAdmin: ModelAdminBase): void {
      if (this.modelAdminsMap[modelAdmin.name]) {
         throw new Error(`已经存在一个name为${modelAdmin.name}的model-admin实体在本站点中`);
      }
      this.modelAdminsMap[modelAdmin.name] = modelAdmin;
   }
}
