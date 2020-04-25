import Koa from 'koa';
import Morgan from 'koa-morgan';
import session from 'koa-session';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import router from './routers/index';
import settings from './settings';


export default async function createApp (): Promise<Koa> {
   await mongoose.connect(settings.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

   const app = new Koa();

   app.use(Morgan(settings.isDev ? 'dev' : 'combined'));

   app.use(bodyParser({
      jsonLimit: '1000kb',
   }));

   const sessionConfig = {
      key: 'ss_id', /** (string) cookie key (default is koa:sess) */
      /** (number || 'session') maxAge in ms (default is 1 days) */
      /** 'session' will result in a cookie that expires when session/browser is closed */
      /** Warning: If a session cookie is stolen, this cookie will never expire */
      maxAge: 7 * 24 * 60 * 60 * 1000,
      overwrite: true, /** (boolean) can overwrite or not (default true) */
      httpOnly: true, /** (boolean) httpOnly or not (default true) */
      signed: true, /** (boolean) signed or not (default true) */
      rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge,
         resetting the expiration countdown. (default is false) */
      renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false) */
   };
   app.use(session(sessionConfig, app));

   app.use(router.routes()).use(router.allowedMethods());

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
