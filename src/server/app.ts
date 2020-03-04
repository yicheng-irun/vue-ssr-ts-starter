import Koa from 'koa';
import Morgan from 'koa-morgan';
import router from './router/index';

export default async function createApp (): Promise<Koa> {
    const app = new Koa();
    app.use(Morgan('dev'));

    app.use(router.routes())

    return app;
}
