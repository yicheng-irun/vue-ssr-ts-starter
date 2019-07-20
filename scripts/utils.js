const path = require('path');
const glob = require('glob');

let buildSettings = {};
try {
    buildSettings = require(path.join(process.cwd(), 'build-settings.js'));
} catch (e) {
    //
}

const projRoot = buildSettings.projRoot || process.cwd();

const configs = {
    projRoot,
    distRoot: buildSettings.distRoot || path.resolve(projRoot, './dist/client'),
    distBundleRoot: buildSettings.distBundleRoot || path.resolve(projRoot, './dist/client-bundle'),
    srcRoot: buildSettings.srcRoot || path.resolve(projRoot, './src/client'),

    devServerPort: buildSettings.devServerPort || 10000, // 在开发模式下，http 静态资源服务监听的端口
    devNodeServerPort: buildSettings.devNodeServerPort || 10001, // 在开发模式下，后台监听的端口
};

function getAllPageTemplates () {
    const pages = glob.sync(`${configs.srcRoot}/pages/**/template.html`).map(page => page.replace(/^.*src\/client\/pages\/(.*)\/template.html$/, '$1'));
    return pages;
}

module.exports = {
    configs,
    getAllPageTemplates,
    // getAllSSRPages,
};
