"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_morgan_1 = __importDefault(require("koa-morgan"));
const index_1 = __importDefault(require("./router/index"));
const settings_1 = __importDefault(require("./settings"));
async function createApp() {
    const app = new koa_1.default();
    app.use(koa_morgan_1.default(settings_1.default.isDev ? 'dev' : 'combined'));
    app.use(index_1.default.routes());
    return app;
}
exports.default = createApp;
async function start() {
    const app = await createApp();
    const { host, port } = settings_1.default;
    app.listen(port, host, () => {
        console.log(`server is listening on ${host}:${port}`);
    });
}
start().catch(console.error);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmVyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOENBQXNCO0FBQ3RCLDREQUFnQztBQUNoQywyREFBb0M7QUFDcEMsMERBQWtDO0FBR25CLEtBQUssVUFBVSxTQUFTO0lBQ25DLE1BQU0sR0FBRyxHQUFHLElBQUksYUFBRyxFQUFFLENBQUM7SUFFdEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxvQkFBTSxDQUFDLGtCQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFFckQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxlQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUV6QixPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFSRCw0QkFRQztBQUVELEtBQUssVUFBVSxLQUFLO0lBQ2hCLE1BQU0sR0FBRyxHQUFHLE1BQU0sU0FBUyxFQUFFLENBQUM7SUFDOUIsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxrQkFBUSxDQUFDO0lBRWhDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUU7UUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7SUFDMUQsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRUQsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyJ9