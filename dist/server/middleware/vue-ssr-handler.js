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
const settings_1 = __importDefault(require("../settings"));
/**
 * 获取中间件
 * @param options 参数
 */
function ssrHandler({ bundlePath, isCacheRenderer }) {
    if (!bundlePath) {
        throw new Error('bundlePath "' + bundlePath + '" is not available');
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
        if (isCacheRenderer) {
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
            runInNewContext: true,
            template,
        });
        if (isCacheRenderer) {
            cachedRenderers[pagePath] = renderer;
        }
        return renderer;
    }
    async function middleWare(ctx, next) {
        const serverOrigin = `http://127.0.0.1:${settings_1.default.port}`;
        ctx.render = async function (pagePath, ssrParams = {}) {
            async function render() {
                const renderer = getRenderer(pagePath || '');
                const context = {
                    ssrParams: ssrParams,
                    serverOrigin,
                    pagePath,
                    req: ctx.req,
                    request: ctx.request,
                    res: ctx.res,
                    response: ctx.response,
                };
                await new Promise((resolve, reject) => {
                    renderer.renderToString(context, (err, html) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        ctx.body = html;
                        resolve();
                    });
                });
                return;
            }
            await render();
        };
        await next();
    }
    return middleWare;
}
exports.default = ssrHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnVlLXNzci1oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZlci9taWRkbGV3YXJlL3Z1ZS1zc3ItaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBb0I7QUFDcEIsZ0RBQXdCO0FBQ3hCLHFFQUF1RDtBQUV2RCwyREFBbUM7QUFFbkM7OztHQUdHO0FBQ0gsU0FBUyxVQUFVLENBQUUsRUFDakIsVUFBVSxFQUNWLGVBQWUsRUFVbEI7SUFDRyxJQUFJLENBQUMsVUFBVSxFQUFFO1FBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQyxjQUFjLEdBQUcsVUFBVSxHQUFHLG9CQUFvQixDQUFDLENBQUM7S0FDdkU7SUFFRCxNQUFNLGVBQWUsR0FFakIsRUFBRSxDQUFDO0lBRVAsSUFBSSxZQUFZLEdBQU8sSUFBSSxDQUFDO0lBRTVCOztPQUVHO0lBQ0gsU0FBUyxTQUFTO1FBQ2QsSUFBSSxZQUFZLEVBQUU7WUFDZCxPQUFPLFlBQVksQ0FBQztTQUN2QjtRQUVELE1BQU0sUUFBUSxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLDRCQUE0QixDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLFlBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDMUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxVQUFVLFFBQVEsaUJBQWlCLENBQUMsQ0FBQztTQUN4RDtRQUNELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3RFLElBQUksZUFBZSxFQUFFO1lBQ2pCLFlBQVksR0FBRyxZQUFZLENBQUM7U0FDL0I7UUFDRCxPQUFPLFlBQVksQ0FBQztJQUN4QixDQUFDO0lBRUQsU0FBUyxXQUFXLENBQUUsV0FBbUI7UUFDckMsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakQsSUFBSSxlQUFlLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDM0IsT0FBTyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDcEM7UUFFRCxJQUFJLFlBQVksR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUUxRCxNQUFNLGdCQUFnQixHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFdBQVcsRUFBRSxHQUFHLFFBQVEsT0FBTyxDQUFDLENBQUM7UUFDaEYsSUFBSSxZQUFFLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7WUFDakMsWUFBWSxHQUFHLGdCQUFnQixDQUFDO1NBQ25DO2FBQU0sSUFBSSxDQUFDLFlBQUUsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDckMsTUFBTSxJQUFJLEtBQUssQ0FBQyxVQUFVLFlBQVksaUJBQWlCLENBQUMsQ0FBQztTQUM1RDtRQUVELE1BQU0sWUFBWSxHQUFHLFNBQVMsRUFBRSxDQUFDO1FBQ2pDLE1BQU0sUUFBUSxHQUFHLFlBQUUsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFMUQsTUFBTSxRQUFRLEdBQUcsZUFBZSxDQUFDLG9CQUFvQixDQUFDLFlBQVksRUFBRTtZQUNoRSxlQUFlLEVBQUUsSUFBSTtZQUNyQixRQUFRO1NBRVgsQ0FBQyxDQUFDO1FBRUgsSUFBSSxlQUFlLEVBQUU7WUFDakIsZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFFBQVEsQ0FBQztTQUN4QztRQUVELE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7SUFHRCxLQUFLLFVBQVUsVUFBVSxDQUFFLEdBQVksRUFBRSxJQUFVO1FBQy9DLE1BQU0sWUFBWSxHQUFHLG9CQUFvQixrQkFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3pELEdBQUcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxXQUFXLFFBQWdCLEVBQUUsWUFBaUIsRUFBRTtZQUM5RCxLQUFLLFVBQVUsTUFBTTtnQkFDakIsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDN0MsTUFBTSxPQUFPLEdBQUc7b0JBQ1osU0FBUyxFQUFFLFNBQVM7b0JBQ3BCLFlBQVk7b0JBQ1osUUFBUTtvQkFDUixHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUc7b0JBQ1osT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPO29CQUNwQixHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUc7b0JBQ1osUUFBUSxFQUFFLEdBQUcsQ0FBQyxRQUFRO2lCQUN6QixDQUFDO2dCQUNGLE1BQU0sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7b0JBQ2xDLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBVSxFQUFFLElBQVksRUFBRSxFQUFFO3dCQUMxRCxJQUFJLEdBQUcsRUFBRTs0QkFDTCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQ1osT0FBTzt5QkFDVjt3QkFDRCxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzt3QkFDaEIsT0FBTyxFQUFFLENBQUM7b0JBQ2QsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQyxDQUFDLENBQUE7Z0JBQ0YsT0FBTztZQUNYLENBQUM7WUFDRCxNQUFNLE1BQU0sRUFBRSxDQUFDO1FBQ25CLENBQUMsQ0FBQztRQUNGLE1BQU0sSUFBSSxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVELE9BQU8sVUFBVSxDQUFDO0FBQ3RCLENBQUM7QUFFRCxrQkFBZSxVQUFVLENBQUMifQ==