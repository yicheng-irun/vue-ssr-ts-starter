"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const index_1 = __importDefault(require("./router/index"));
const vue_ssr_handler_1 = __importDefault(require("./middleware/vue-ssr-handler"));
function createApp() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = express_1.default();
        const logger = require('morgan');
        app.use(logger('dev'));
        app.use(express_1.default.static(path_1.default.resolve(__dirname, '../../public')));
        app.use(cookie_parser_1.default());
        // 解析 application/json
        app.use(body_parser_1.default.json());
        // 解析 application/x-www-form-urlencoded
        app.use(body_parser_1.default.urlencoded({ extended: false }));
        // 加上ssr的中间件
        app.use(vue_ssr_handler_1.default({
            bundlePath: path_1.default.resolve(__dirname, '../client-bundle'),
            cacheRenderer: process.env.NODE_ENV == 'development' ? false : true,
        }));
        app.use(index_1.default);
        // 处理 404 的逻辑
        app.use((req, res) => {
            res.status(404);
            res.format({
                'image/*'() {
                    res.sendStatus(404);
                },
                json() {
                    res.json({
                        errors: [{
                                message: '404 not found'
                            }],
                        data: null,
                    });
                },
                // html () {
                //     res.ssrRender('site/404', {
                //         title: 'Not Found',
                //     });
                // },
                default() {
                    res.sendStatus(404);
                },
            });
        });
        // 处理 error 的逻辑
        app.use((error, req, res, next) => {
            res.status(500);
            res.format({
                json() {
                    res.json({
                        errors: [{
                                message: error.message,
                                stack: error.stack,
                            }],
                        data: null,
                    });
                },
                html() {
                    res.send(`
<h1>
${error.message}
</h1>
<pre>
${error.stack}
</pre>
                `);
                    // res.ssrRender('site/500', {
                    //     title: '500 server error',
                    //     message: error.message,
                    //     stack: error.stack,
                    // });
                },
                default() {
                    res.sendStatus(500);
                },
            });
        });
        return app;
    });
}
exports.default = createApp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZlci9hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNBLGdEQUF3QjtBQUN4QixzREFBZ0U7QUFDaEUsa0VBQXlDO0FBQ3pDLDhEQUFxQztBQUNyQywyREFBb0M7QUFDcEMsbUZBQXlEO0FBR3pELFNBQThCLFNBQVM7O1FBQ25DLE1BQU0sR0FBRyxHQUFHLGlCQUFPLEVBQUUsQ0FBQztRQUN0QixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDakMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUV2QixHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsTUFBTSxDQUFDLGNBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVqRSxHQUFHLENBQUMsR0FBRyxDQUFDLHVCQUFZLEVBQUUsQ0FBQyxDQUFDO1FBRXhCLHNCQUFzQjtRQUN0QixHQUFHLENBQUMsR0FBRyxDQUFDLHFCQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUMzQix1Q0FBdUM7UUFDdkMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxxQkFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFcEQsWUFBWTtRQUNaLEdBQUcsQ0FBQyxHQUFHLENBQUMseUJBQWEsQ0FBQztZQUNsQixVQUFVLEVBQUUsY0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsa0JBQWtCLENBQUM7WUFDdkQsYUFBYSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJO1NBQ3RFLENBQUMsQ0FBQyxDQUFDO1FBRUosR0FBRyxDQUFDLEdBQUcsQ0FBQyxlQUFNLENBQUMsQ0FBQztRQUVoQixhQUFhO1FBQ2IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFhLEVBQUUsRUFBRTtZQUMzQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxNQUFNLENBQUM7Z0JBQ1AsU0FBUztvQkFDTCxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN4QixDQUFDO2dCQUNELElBQUk7b0JBQ0EsR0FBRyxDQUFDLElBQUksQ0FBQzt3QkFDTCxNQUFNLEVBQUUsQ0FBQztnQ0FDTCxPQUFPLEVBQUUsZUFBZTs2QkFDM0IsQ0FBQzt3QkFDRixJQUFJLEVBQUUsSUFBSTtxQkFDYixDQUFDLENBQUM7Z0JBQ1AsQ0FBQztnQkFDRCxZQUFZO2dCQUNaLGtDQUFrQztnQkFDbEMsOEJBQThCO2dCQUM5QixVQUFVO2dCQUNWLEtBQUs7Z0JBQ0wsT0FBTztvQkFDSCxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN4QixDQUFDO2FBQ0osQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFSCxlQUFlO1FBQ2YsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQVksRUFBRSxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQVEsRUFBRTtZQUM1RSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxNQUFNLENBQUM7Z0JBQ1AsSUFBSTtvQkFDQSxHQUFHLENBQUMsSUFBSSxDQUFDO3dCQUNMLE1BQU0sRUFBRSxDQUFDO2dDQUNMLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTztnQ0FDdEIsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLOzZCQUNyQixDQUFDO3dCQUNGLElBQUksRUFBRSxJQUFJO3FCQUNiLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQUNELElBQUk7b0JBQ0EsR0FBRyxDQUFDLElBQUksQ0FBQzs7RUFFdkIsS0FBSyxDQUFDLE9BQU87OztFQUdiLEtBQUssQ0FBQyxLQUFLOztpQkFFSSxDQUFDLENBQUE7b0JBQ0YsOEJBQThCO29CQUM5QixpQ0FBaUM7b0JBQ2pDLDhCQUE4QjtvQkFDOUIsMEJBQTBCO29CQUMxQixNQUFNO2dCQUNWLENBQUM7Z0JBQ0QsT0FBTztvQkFDSCxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN4QixDQUFDO2FBQ0osQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7Q0FBQTtBQW5GRCw0QkFtRkMifQ==