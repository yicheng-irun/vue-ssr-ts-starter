import dotenv from 'dotenv';
import createBuildConfig from './build-config';
import build from './webpack/webpack-ssr-build';

dotenv.config();

function startBuild (): void {
    const isProduction = process.argv.indexOf('build') >= 0;
    console.log(`build for production: ${isProduction}`);

    const config = createBuildConfig({
        isProduction,
    });
    build(config);
}

// const isProd = process.argv.indexOf('build') >= 0;
// if (isProd) {
//     process.env.NODE_ENV = 'production';
// } else {
//     process.env.NODE_ENV = 'development';
// }
// require('./webpack/webpack-ssr-build.js');


startBuild();
