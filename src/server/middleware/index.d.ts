import session from 'koa-session';

declare module 'koa' {
    interface Context {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        session?: session.Session;
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        readonly sessionOptions?: session.opts;
    }
}
