
/**
 * 从环境变量中获取一个值
 * @param name 环境变量名
 * @param defaultValue 默认值
 */
export function getEnv(name: string, defaultValue: string = ''): string {
    const { env = {} } = process;
    if (Object.prototype.hasOwnProperty.call(env, name)) {
        return env[name];
    }
    return defaultValue;
}

const settings = {

    /**
     * http服务监听的host
     */
    host: getEnv('HTTP_HOST', '0.0.0.0'),
    
    /**
     * http服务监听的端口
     */
    port: Number.parseInt(getEnv('HTTP_PORT', '80'), 10),

}

export default settings;
