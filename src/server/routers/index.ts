import KoaRouter from '@koa/router';
import { resolve } from 'path';
import { Context } from 'koa';

import ssrHandler from '../middleware/vue-ssr-handler';
import settings from '../settings';

const router = new KoaRouter();

router.use(ssrHandler({
    bundlePath: settings.isDev
        ? resolve(__dirname, '../../../dist/client-bundle') : resolve(__dirname, '../../client-bundle'),
    isCacheRenderer: !settings.isDev,
}));


router.get('/', (ctx: Context) => {
    ctx.body = 'hello';
});

export default router;
