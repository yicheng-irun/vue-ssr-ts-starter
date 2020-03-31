
import path from 'path';
import webpackMerge from 'webpack-merge';
import webpack from 'webpack';
import VueSSRClientPlugin from 'vue-server-renderer/client-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { getSSRConfig, getChildPluginInstances } from './webpack-base-config';
import { BuildConfig } from '../build-config';


export default function getConfig (buildConfig: BuildConfig): webpack.Configuration {
    const config = webpackMerge(getSSRConfig('Client', buildConfig), {
        entry: {
            main: `${buildConfig.srcPath}/entry-client.js`,
        },
        output: {
            path: buildConfig.distPath,
            filename: 'assets/[name].js',
            publicPath: '/',
        },
        plugins: [
            new VueSSRClientPlugin({
                filename: path.relative(
                    buildConfig.distPath,
                    path.resolve(buildConfig.distBundlePath, './vue-ssr-client-manifest.json'),
                ),
            }),
            new HtmlWebpackPlugin({
                filename: 'template.html',
                template: `${buildConfig.srcPath}/template.html`,
                chunks: ['main'],

                // inject: false,
                minify: { collapseWhitespace: true, minifyJS: true },

                isProd: buildConfig.isProduction,
                isDev: !buildConfig.isProduction,
                isServer: false,
                isClient: true,
            }),
            ...getChildPluginInstances({}, buildConfig),
        ],
        watch: !buildConfig.isProduction,
    });

    return config;
}
