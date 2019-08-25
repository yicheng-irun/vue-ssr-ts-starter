import fs from 'fs';
import path from 'path';
import * as vueServerRender from 'vue-server-renderer';
import getPort from "../service/get-port";
import { Request, Response, NextFunction, Handler } from '../types/express';

/**
 * 获取中间件
 * @param options 参数
 */
function getSSRHandler (options: {
    /**
     * bundlePath  vue ssr bundle 的路径
     */
    bundlePath: string;
    /**
     * 是否缓存renderer，在正式环境下开启，在开发测试环境下关闭
     */
    cacheRenderer: boolean;
}): Handler {
    const bundlePath = options.bundlePath;
    if (!bundlePath) {
        throw new Error('options.bundlePath "' + bundlePath + '" is not available');
    }

    const cachedRenderers: {
        [key: string]: vueServerRender.BundleRenderer;
    } = {};

    let cachedBundle: {} = null;

    /**
     * 获取bundle
     */
    function getBundle () {
        if (cachedBundle) {
            return cachedBundle;
        }

        const jsonPath = path.join(bundlePath, 'vue-ssr-server-bundle.json');
        if (!fs.existsSync(jsonPath)) {
            throw new Error(`file: '${jsonPath}' is not exists`);
        }
        const serverBundle = JSON.parse(fs.readFileSync(jsonPath).toString());
        if (options.cacheRenderer) {
            cachedBundle = serverBundle;
        }
        return serverBundle;
    }

    function getRenderer (pagePathArg: string) {
        const pagePath = pagePathArg.replace(/^\/+/, '');

        if (cachedRenderers[pagePath]) {
            return cachedRenderers[pagePath];
        }

        let templatePath = path.join(bundlePath, 'template.html');

        const custTemplatePath = path.join(bundlePath, 'templates', `${pagePath}.html`);
        if (fs.existsSync(custTemplatePath)) {
            templatePath = custTemplatePath;
        } else if (!fs.existsSync(templatePath)) {
            throw new Error(`file: '${templatePath}' is not exists`);
        }

        const serverBundle = getBundle();
        const template = fs.readFileSync(templatePath).toString();
        
        const renderer = vueServerRender.createBundleRenderer(serverBundle, {
            runInNewContext: true, // 推荐
            template, // （可选）页面模板
            // clientManifest // （可选）客户端构建 manifest
        });

        if (options.cacheRenderer) {
            cachedRenderers[pagePath] = renderer;
        }
        
        return renderer;
    }


    function middleWare (req: Request, res: Response, next: NextFunction) {
        /**
         * 绑定一个ssrRender的函数到response对象上
         */
        const serverOrigin = `http://127.0.0.1:${getPort()}`;

        res.ssrHandler = function (params = {}) {
            function render () {
                const renderer = getRenderer('');
                let ignoreByNext = false;
                const context = {
                    req,
                    res,
                    next (error: Error) {
                        ignoreByNext = true;
                        req.next(error);
                    },
                    params,
                    serverOrigin,
                };
                renderer.renderToString(context, (err: Error, html: string) => {
                    if (ignoreByNext) {
                        return;
                    }
                    if (err) {
                        return req.next(err);
                    }
                    res.end(html);
                });
            }
            render();
        }

        res.ssrRender = function (pagePath, params = {}) {
            function render () {
                const renderer = getRenderer(pagePath || '');
                let ignoreByNext = false;
                const context = {
                    req,
                    res,
                    next (error: Error) {
                        ignoreByNext = true;
                        req.next(error);
                    },
                    params,
                    serverOrigin,
                    page: pagePath
                };
                renderer.renderToString(context, (err: Error, html: string) => {
                    if (ignoreByNext) {
                        return;
                    }
                    if (err) {
                        return req.next(err);
                    }
                    res.end(html);
                });
            }
            render();
        };
        next();
    }

    return middleWare;
}

export default getSSRHandler;
