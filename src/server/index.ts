import createApp from './app';
import getPort from './service/get-port';

async function start (): Promise<void> {
    const app = await createApp();
    const port = getPort();

    app.listen(port, '0.0.0.0', () => {
        console.log(`server is lisning in ${port}`);
    });
}

start().then(() => {
    //
}).catch((e) => {
    console.error('！！！！！！！！！服务发生了错误，没启起来！！！！！！！！！！');
    console.error(e);
});
