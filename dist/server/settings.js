"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 从环境变量中获取一个值
 * @param name 环境变量名
 * @param defaultValue 默认值
 */
function getEnv(name, defaultValue = '') {
    const { env = {} } = process;
    if (Object.prototype.hasOwnProperty.call(env, name)) {
        return env[name];
    }
    return defaultValue;
}
exports.getEnv = getEnv;
const isDev = getEnv('NODE_ENV', 'production') === 'development';
const host = getEnv('HTTP_HOST', '0.0.0.0');
const port = Number.parseInt(getEnv('HTTP_PORT', '0'), 10);
if (port === 0)
    throw new Error('请在.env环境变量中设置HTTP_PORT');
const settings = {
    /**
     * 是否是开发环境
     */
    isDev,
    /**
     * http服务监听的host
     */
    host,
    /**
     * http服务监听的端口
     */
    port,
};
exports.default = settings;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmVyL3NldHRpbmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0E7Ozs7R0FJRztBQUNILFNBQWdCLE1BQU0sQ0FBRSxJQUFZLEVBQUUsWUFBWSxHQUFHLEVBQUU7SUFDbkQsTUFBTSxFQUFFLEdBQUcsR0FBRyxFQUFFLEVBQUUsR0FBRyxPQUFPLENBQUM7SUFDN0IsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFFO1FBQ2pELE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3BCO0lBQ0QsT0FBTyxZQUFZLENBQUM7QUFDeEIsQ0FBQztBQU5ELHdCQU1DO0FBRUQsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsS0FBSyxhQUFhLENBQUM7QUFDakUsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUM1QyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFFM0QsSUFBSSxJQUFJLEtBQUssQ0FBQztJQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUUxRCxNQUFNLFFBQVEsR0FBRztJQUNiOztPQUVHO0lBQ0gsS0FBSztJQUVMOztPQUVHO0lBQ0gsSUFBSTtJQUVKOztPQUVHO0lBQ0gsSUFBSTtDQUVQLENBQUM7QUFFRixrQkFBZSxRQUFRLENBQUMifQ==