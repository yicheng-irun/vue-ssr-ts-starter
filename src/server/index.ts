import Koa from 'koa';
import Morgan from 'koa-morgan';
import router from './router/index';
import settings from './settings';


export default async function createApp (): Promise<Koa> {
    const app = new Koa();
    
    app.use(Morgan(settings.isDev ? 'dev' : 'combined'));

    app.use(router.routes())

    return app;
}

async function start (): Promise<void> {
    const app = await createApp();
    const { host, port } = settings;

    app.listen(port, host, () => {
        console.log(`server is listening on ${host}:${port}`);
    });
}

start().catch(console.error);
