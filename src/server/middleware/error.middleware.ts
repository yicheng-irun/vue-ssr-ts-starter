import { Middleware, Context, Next } from 'koa';
import settings from '../settings';

console.log(settings.isDev);

const ErrorMiddleware: Middleware = async (ctx: Context, next: Next) => {
    try {
        await next();
        if (ctx.status === 404) {
            await ctx.render('site/404');
        }
    } catch (e) {
        try {
            if (ctx.render && e) {
                await ctx.render('site/500', {
                    message: e.message,
                    stack: settings.isDev ? e.stack : '',
                });
                return;
            }
        } catch (e2) {
            console.error(e2);
        }
        ctx.body = 'Internal Server Error';
        ctx.status = 500;
        console.error(e);
    }
};

export default ErrorMiddleware;
