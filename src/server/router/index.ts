import KoaRouter from '@koa/router';

const router = new KoaRouter();

router.get('/', (ctx) => {
    ctx.body = 'hello';
})

export default router;
