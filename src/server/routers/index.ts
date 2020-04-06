import KoaRouter from '@koa/router';
import { resolve } from 'path';
import { Context } from 'koa';

import ssrHandler from '../middleware/vue-ssr-handler';
import settings from '../settings';
import ErrorMiddleware from '../middleware/error.middleware';
import apiRouter from '../api';

const router = new KoaRouter();
router.all(/.*/); // 使app中的use不再按需进入此路由

router.use(ssrHandler({
    bundlePath: resolve(__dirname, '../../../dist/client-bundle'),
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

export default router;
