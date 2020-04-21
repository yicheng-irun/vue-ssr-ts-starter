import { Middleware, Context, Next } from 'koa';
import settings from '../settings';

const ErrorMiddleware: Middleware = async (ctx: Context, next: Next) => {
   try {
      await next();
      if (ctx.status === 404) {
         await ctx.render('site/404');
         ctx.status = 404;
      }
   } catch (e) {
      console.error(e);
      if (ctx.accepts('html')) {
         try {
            if (ctx.render && e) {
               await ctx.render('site/500', {
                  message: e.message,
                  stack: settings.isDev ? e.stack : '',
               });
               ctx.status = 500;
               return;
            }
         } catch (e2) {
            console.error(e2);
         }
      }
      if (ctx.accepts('json')) {
         ctx.body = {
            success: false,
            msg: 'Internal Server Error',
         };
         ctx.status = 500;
         return;
      }

      ctx.body = 'Internal Server Error';
      ctx.status = 500;
   }
};

export default ErrorMiddleware;
