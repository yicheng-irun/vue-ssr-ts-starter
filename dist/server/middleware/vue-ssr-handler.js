"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const vueServerRender = __importStar(require("vue-server-renderer"));
const get_port_1 = __importDefault(require("../service/get-port"));
/**
 * 获取中间件
 * @param options 参数
 */
function getSSRHandler(options) {
    const bundlePath = options.bundlePath;
    if (!bundlePath) {
        throw new Error('options.bundlePath "' + bundlePath + '" is not available');
    }
    const cachedRenderers = {};
    let cachedBundle = null;
    /**
     * 获取bundle
     */
    function getBundle() {
        if (cachedBundle) {
            return cachedBundle;
        }
        const jsonPath = path_1.default.join(bundlePath, 'vue-ssr-server-bundle.json');
        if (!fs_1.default.existsSync(jsonPath)) {
            throw new Error(`file: '${jsonPath}' is not exists`);
        }
        const serverBundle = JSON.parse(fs_1.default.readFileSync(jsonPath).toString());
        if (options.cacheRenderer) {
            cachedBundle = serverBundle;
        }
        return serverBundle;
    }
    function getRenderer(pagePathArg) {
        const pagePath = pagePathArg.replace(/^\/+/, '');
        if (cachedRenderers[pagePath]) {
            return cachedRenderers[pagePath];
        }
        let templatePath = path_1.default.join(bundlePath, 'template.html');
        const custTemplatePath = path_1.default.join(bundlePath, 'templates', `${pagePath}.html`);
        if (fs_1.default.existsSync(custTemplatePath)) {
            templatePath = custTemplatePath;
        }
        else if (!fs_1.default.existsSync(templatePath)) {
            throw new Error(`file: '${templatePath}' is not exists`);
        }
        const serverBundle = getBundle();
        const template = fs_1.default.readFileSync(templatePath).toString();
        const renderer = vueServerRender.createBundleRenderer(serverBundle, {
            runInNewContext: false,
            template,
        });
        if (options.cacheRenderer) {
            cachedRenderers[pagePath] = renderer;
        }
        return renderer;
    }
    function middleWare(req, res, next) {
        /**
         * 绑定一个ssrRender的函数到response对象上
         */
        const serverOrigin = `http://127.0.0.1:${get_port_1.default()}`;
        res.ssrRender = function (pagePath, params = {}) {
            function render() {
                const renderer = getRenderer(pagePath || '');
                let ignoreByNext = false;
                const context = {
                    req,
                    res,
                    next(error) {
                        ignoreByNext = true;
                        req.next(error);
                    },
                    params,
                    serverOrigin,
                    page: pagePath
                };
                renderer.renderToString(context, (err, html) => {
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
exports.default = getSSRHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnVlLXNzci1oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZlci9taWRkbGV3YXJlL3Z1ZS1zc3ItaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBb0I7QUFDcEIsZ0RBQXdCO0FBQ3hCLHFFQUF1RDtBQUN2RCxtRUFBMEM7QUFHMUM7OztHQUdHO0FBQ0gsU0FBUyxhQUFhLENBQUUsT0FTdkI7SUFDRyxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0lBQ3RDLElBQUksQ0FBQyxVQUFVLEVBQUU7UUFDYixNQUFNLElBQUksS0FBSyxDQUFDLHNCQUFzQixHQUFHLFVBQVUsR0FBRyxvQkFBb0IsQ0FBQyxDQUFDO0tBQy9FO0lBRUQsTUFBTSxlQUFlLEdBRWpCLEVBQUUsQ0FBQztJQUVQLElBQUksWUFBWSxHQUFPLElBQUksQ0FBQztJQUU1Qjs7T0FFRztJQUNILFNBQVMsU0FBUztRQUNkLElBQUksWUFBWSxFQUFFO1lBQ2QsT0FBTyxZQUFZLENBQUM7U0FDdkI7UUFFRCxNQUFNLFFBQVEsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSw0QkFBNEIsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxZQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzFCLE1BQU0sSUFBSSxLQUFLLENBQUMsVUFBVSxRQUFRLGlCQUFpQixDQUFDLENBQUM7U0FDeEQ7UUFDRCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUN0RSxJQUFJLE9BQU8sQ0FBQyxhQUFhLEVBQUU7WUFDdkIsWUFBWSxHQUFHLFlBQVksQ0FBQztTQUMvQjtRQUNELE9BQU8sWUFBWSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxTQUFTLFdBQVcsQ0FB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