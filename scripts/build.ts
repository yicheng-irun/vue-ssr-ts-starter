import dotenv from 'dotenv';
import createBuildConfig from './build-config';

dotenv.config();

function startBuild (): void {
    const isProduction = process.argv.indexOf('build') >= 0;

    const config = createBuildConfig({
        isProduction,
    });
}

// const isProd = process.argv.indexOf('build') >= 0;
// if (isProd) {
//     process.env.NODE_ENV = 'production';
// } else {
//     process.env.NODE_ENV = 'development';
// }
// require('./webpack/webpack-ssr-build.js');


startBuild();
