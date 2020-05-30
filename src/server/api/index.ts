import KoaRouter from '@koa/router';
import { Context } from 'koa';

const apiRouter = new KoaRouter<{}, Context>();

apiRouter.get('/demo', async (ctx: Context) => {
   ctx.body = {
      success: true,
      data: {
         sayHi: 'Hi client!',
      },
   };
});

export default apiRouter;
