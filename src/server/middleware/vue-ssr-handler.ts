import fs from 'fs';
import path from 'path';
import * as vueServerRender from 'vue-server-renderer';
import { Middleware, Context, Next } from 'koa';
import settings from '../settings';

declare module 'koa' {
    interface Context {
        render?: (pagePath: string, ssrParams?: any) => Promise<void>;
    }
}

/**
 * 获取中间件
 * @param options 参数
 */
function ssrHandler ({
    bundlePath,
    isCacheRenderer,
}: {
    /**
     * bundlePath  vue ssr bundle 的路径
     */
    bundlePath: string;
    /**
     * 是否缓存renderer，在正式环境下开启，在开发测试环境下关闭
     */
    isCacheRenderer: boolean;
}): Middleware {
    if (!bundlePath) {
        throw new Error(`bundlePath "${bundlePath}" is not available`);
    }

    const cachedRenderers: {
        [key: string]: vueServerRender.BundleRenderer;
    } = {};

    let cachedBundle: {} = null;

    /**
     * 获取bundle
     */
    function getBundle (): Record<string, any> {
        if (cachedBundle) {
            return cachedBundle;
        }

        const jsonPath = path.join(bundlePath, 'vue-ssr-server-bundle.json');
        if (!fs.existsSync(jsonPath)) {
            throw new Error(`file: '${jsonPath}' is not exists`);
        }
        const serverBundle = JSON.parse(fs.readFileSync(jsonPath).toString());
        if (isCacheRenderer) {
            cachedBundle = serverBundle;
        }
        return serverBundle;
    }

    function getRenderer (pagePathArg: string): vueServerRender.BundleRenderer {
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

        if (isCacheRenderer) {
            cachedRenderers[pagePath] = renderer;
        }

        return renderer;
    }


    async function middleWare (ctx: Context, next: Next): Promise<void> {
        const serverOrigin = `http://127.0.0.1:${settings.port}`;
        ctx.render = async (pagePath: string, ssrParams: Record<string, any> = {}): Promise<void> => {
            const renderer = getRenderer(pagePath || '');
            const context = {
                ssrParams,
                serverOrigin,
                pagePath,
                query: ctx.query,
                ctx,
            };
            const html = await renderer.renderToString(context);
            ctx.body = html;
        };
        await next();
    }

    return middleWare;
}

export default ssrHandler;
