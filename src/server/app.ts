import fs from 'fs';
import path from 'path';
import express, { Express, ErrorRequestHandler } from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import router from './router/index';
import getSSRHandler from './middleware/vue-ssr-handler';
import { Response, NextFunction, Request } from './types/express';

export default async function createApp (): Promise<Express> {
    const app = express();
    const logger = require('morgan');
    app.use(logger('dev'));

    app.use(express.static(path.resolve(__dirname, '../../public')));

    app.use(cookieParser());

    // 解析 application/json
    app.use(bodyParser.json());
    // 解析 application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));

    // 加上ssr的中间件
    app.use(getSSRHandler({
        bundlePath: path.resolve(__dirname, '../client-bundle'),
        cacheRenderer: process.env.NODE_ENV == 'development' ? false : true,
    }));

    app.use(router);

    // 处理 404 的逻辑
    app.use((req, res: Response) => {
        res.status(404);
        res.format({
            'image/*' () {
                res.sendStatus(404);
            },
            json () {
                res.json({
                    errors: [{
                        message: '404 not found'
                    }],
                    data: null,
                });
            },
            html () {
                res.ssrRender('site/404', {
                    title: 'Not Found',
                });
            },
            default () {
                res.sendStatus(404);
            },
        });
    });

    // 处理 error 的逻辑
    app.use((error: Error, req: Request, res: Response, next: NextFunction): void => {
        res.status(500);
        res.format({
            json () {
                res.json({
                    errors: [{
                        message: error.message,
                        stack: error.stack,
                    }],
                    data: null,
                });
            },
            html () {
                res.ssrRender('site/500', {
                    title: '500 server error',
                    message: error.message,
                    stack: error.stack,
                });
            },
            default () {
                res.sendStatus(500);
            },
        });
    });

    return app;
}
