import KoaRouter from '@koa/router';
import { vueSSRKowMiddleware } from 'yi-vue-ssr-middleware';
import { resolve } from 'path';
import { Context } from 'koa';
import koaStatic from 'koa-static';

import settings from '../settings';
import ErrorMiddleware from '../middleware/error.middleware';
import apiRouter from '../api';
import myadmin from './admin';

const router = new KoaRouter();
router.all(/.*/); // 使app中的use不再按需进入此路由

router.use('/assets/', koaStatic(resolve(__dirname, '../../../dist/client'), {}));

router.use(vueSSRKowMiddleware({
   bundlePath: resolve(__dirname, '../../../dist/server-bundle'),
   serverOrigin: `http://127.0.0.1:${settings.port}`,
   isCacheRenderer: !settings.isDev,
}));

router.use(ErrorMiddleware);

router.use('/api', apiRouter.routes());

router.get('/', async (ctx: Context) => {
   await ctx.render('home', {
      title: 'home page',
   });
});

router.get('/demo', async (ctx: Context) => {
   await ctx.render('demo', {
      title: 'demo page',
   });
});

router.get('/error', () => {
   throw new Error('特地为您准备的一个错误');
});


router.use('/myadmin', myadmin.koaRouter.routes(), myadmin.koaRouter.allowedMethods());

export default router;
