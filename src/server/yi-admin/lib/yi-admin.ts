import Router from '@koa/router';
import { Context, Next } from 'koa';
import ModelAdminBase from './model-admin-base';
import EditBaseType from './edit-types/edit-base-type';

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

      modelRouter.get('/list/fields/', async (ctx: Context) => {
         const { modelName } = ctx.params;
         const fields = this.modelAdminsMap[modelName].getDataListFields();
         ctx.body = {
            success: true,
            data: fields,
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
