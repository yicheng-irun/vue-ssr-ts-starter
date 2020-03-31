"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("@koa/router"));
const path_1 = require("path");
const vue_ssr_handler_1 = __importDefault(require("../middleware/vue-ssr-handler"));
const settings_1 = __importDefault(require("../settings"));
const router = new router_1.default();
const bundlePath = settings_1.default.isDev
    ? path_1.resolve(__dirname, '../../../dist/client-bundle') : path_1.resolve(__dirname, '../../client-bundle');
router.use(vue_ssr_handler_1.default({
    bundlePath,
    isCacheRenderer: !settings_1.default.isDev,
}));
router.get('/', (ctx) => {
    ctx.body = 'hello';
});
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmVyL3JvdXRlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHlEQUFvQztBQUNwQywrQkFBK0I7QUFDL0Isb0ZBQXVEO0FBQ3ZELDJEQUFtQztBQUVuQyxNQUFNLE1BQU0sR0FBRyxJQUFJLGdCQUFTLEVBQUUsQ0FBQztBQUUvQixNQUFNLFVBQVUsR0FBRyxrQkFBUSxDQUFDLEtBQUs7SUFDN0IsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxTQUFTLEVBQUUsNkJBQTZCLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBTyxDQUFDLFNBQVMsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO0FBRXBHLE1BQU0sQ0FBQyxHQUFHLENBQUMseUJBQVUsQ0FBQztJQUNsQixVQUFVO0lBQ1YsZUFBZSxFQUFFLENBQUMsa0JBQVEsQ0FBQyxLQUFLO0NBQ25DLENBQUMsQ0FBQyxDQUFDO0FBRUosTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUNwQixHQUFHLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztBQUN2QixDQUFDLENBQUMsQ0FBQztBQUVILGtCQUFlLE1BQU0sQ0FBQyJ9