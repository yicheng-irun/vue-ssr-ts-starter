import Router from '@koa/router';
import { Context } from 'koa';
import ModelAdminBase from './model-admin-base';

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
         const permissionResult = await this.permission(ctx);
         if (permissionResult === true) {
            await next();
         } else {
            throw new Error('no permission');
         }
      });
   }

   private appendSiteHomeRouter (): void {
      this.koaRouter.get('/', async (ctx: Context, next) => {
         await ctx.render('yi-admin/site', {});
      });
   }


   public modelAdminsMap: {
      [name: string]: ModelAdminBase;
   } = {};

   private appendModelAdminRouter (): void {
      this.koaRouter.get('/model-admin/:modelName/', async (ctx: Context, next) => {
         const { modelName } = ctx.params;
         if (!Object.prototype.hasOwnProperty.call(this.modelAdminsMap, modelName)) {
            await next();
            return;
         }
         await ctx.render('yi-admin/model-admin-list', {});
      });

      this.koaRouter.get('/model-admin/:modelName/edit', async (ctx: Context, next) => {
         const { modelName } = ctx.params;
         if (!Object.prototype.hasOwnProperty.call(this.modelAdminsMap, modelName)) {
            await next();
            return;
         }
         await ctx.render('yi-admin/model-admin-edit', {});
      });
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
