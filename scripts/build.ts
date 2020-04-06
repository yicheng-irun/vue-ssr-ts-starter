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

startBuild();
