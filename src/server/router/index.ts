import KoaRouter from '@koa/router';
import { resolve } from 'path';
import ssrHandler from '../middleware/vue-ssr-handler';
import settings from '../settings';

const router = new KoaRouter();

const bundlePath = settings.isDev
    ? resolve(__dirname, '../../../dist/client-bundle') : resolve(__dirname, '../../client-bundle');

router.use(ssrHandler({
    bundlePath,
    isCacheRenderer: !settings.isDev,
}));

router.get('/', (ctx) => {
    ctx.body = 'hello';
});

export default router;
