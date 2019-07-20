/**
 * 默认是dev环境
 */

const settings = {
    isDev: true, // 开发环境
    isTest: false, // 测试环境
    isProd: false, // 生产环境
};

if (process.env.NODE_ENV === 'production') {
    Object.assign(settings, {
        isDev: false,
        isTest: false,
        isProd: true,
    });
}

export default settings;
