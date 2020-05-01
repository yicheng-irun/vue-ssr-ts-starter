import { Middleware, Context, Next } from 'koa';
import settings from '../settings';

const ErrorMiddleware: Middleware = async (ctx: Context, next: Next) => {
   try {
      console.log(ctx.accepts());
      await next();
      if (ctx.status === 404) {
         await ctx.render('site/404');
         ctx.status = 404;
      }
   } catch (e) {
      console.error(e);
      const accepts = ctx.accepts();
      if (Array.isArray(accepts)) {
         if (accepts.includes('text/html')) {
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
            if (e instanceof Error) {
               ctx.body = {
                  success: false,
                  message: e.message || 'Internal Server Error',
               };
            } else {
               ctx.body = {
                  success: false,
                  message: 'Internal Server Error',
               };
            }
            ctx.status = 500;
            return;
         }
      }
      ctx.body = 'Internal Server Error';
      ctx.status = 500;
   }
};

export default ErrorMiddleware;
